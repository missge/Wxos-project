<template>
	<div >
		<div class="MallList" :class="{'shows':isShows}">
			<div class="ML_header">
				<div class="ML_header_con">
					<div class="ML_header_contop">
						<div class="ML_home">
							<img  width="25px"  class="ML_icon1" height="20px" src="./img/ML_icon1.png" @click="dump('Ehome')">
							<!-- <img v-else-if="cssFlag==1" width="25px"  class="ML_icon1" height="20px" src="./img/ML_icon1red.png" @click="dump('Ehome')"> -->
							<img v-show="orderSysFlag==1 " width="22px" class="ML_icon2" height="22px"  @click="dump('Home')" src="./img/ML_icon2.png">
							<!-- <img v-show="orderSysFlag==1 &&cssFlag==1" width="22px" class="ML_icon2" height="22px"  @click="dump('Home')" src="./img/ML_icon2.png"> -->
						</div>
						<div class="ML_input">
							<input type="" v-model="search" @focus="isShowFn()"  placeholder="" name="">
							<i class="ML_search"></i>
						</div>
						<div class="ML_icon3">
							<img   src="./img/ML_icon3.png" width="23px" height="23px"  @click="dump('PersonalCenter')">
							<!-- <img  v-else-if="cssFlag==1"  src="./img/ML_icon3red.png" width="23px" height="23px"  @click="dump('PersonalCenter')"> -->
						</div>
					</div>
				<!-- 	<ul class="ML_header_conbot">
						<li >
							新上架
						</li>
						<li class="icon_bor">
							价格最低
							<span class="glyphicon glyphicon-triangle-bottom "> </span>

						</li>
						<li>
							价格最高
							<span class="glyphicon glyphicon-triangle-top "> </span>
						</li>
					</ul> -->
				</div>
				<div class="ML_header_bg">
					<!-- <img src="./img/ML_bg.png" width="100%" height="100%"> -->
				</div>
			</div>
			<div class="ML_content">
				<div class="ML_content_box">
					<div class="container">
						<div class="row" >
							<div class="col-xs-6" v-for="(item,index) in datalist">
								<div class="ML_con_box" @click="GoDetaileFn(item.goodsId,index)" ref="DetaileScroll">
									<div class="ML_con_box_img">
										<!-- <img src="./img/goods.png"  width="100%" height="100%"> -->
										<img :src="item.photoUrl"  width="100%" height="100%">
									</div>
									<div class="ML_description_hight">
										<p class="ML_description">{{item.goodsName}}</p>
									</div>
									<p class="ML_money"><img  class="ML_money_icon" src="./img/ml.png" width="7px" height="8px">{{item.minPrice}}</p>
								</div>
							</div>	
						</div>
					</div>
				</div>
				<div class="ML_load" v-if="datalist.length!=0 && allLoaded==false " @click="dataLoad(true)">点击加载更多>></div>
				<div v-if="allLoaded==true&&datalist.length>0" class="no-data">木有数据啦。。。</div>
			
			</div>
		</div>
		<search  :class="{'shows':!isShows}" @getIsShow="SetisShow" ></search>
		<Nothing  v-if="datalist.length==0"></Nothing>
	</div>
</template>
<script>
import Search from './Search'
import Nothing from './../components/noCard/Nothing'
import {Indicator,Loadmore} from 'mint-ui';
import {setCookie,getCookie} from '../cookie/cookie.js'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
export default{
	name:'MallList',
	components:{
		Search,
		Nothing
	},
	data(){  
		return {
			datalist:[],
      		OrderInfo :{
	 			mallId:getCookie('mallId'),
	 			familyId:'',
	 			goodsName:'',
	 			merId:'',
	 			pageIndex: 1,
      			pageSize:20,
      			groupId:''
      		},
      		searchFlag:'',
      		isShows:false,
      		orderSysFlag:getCookie('orderSysFlag'),
      		orderSysUrl:getCookie('orderSysUrl'),
      		search:'',
      		setFlag:1,
      		Info:{
             	mallId:getCookie('mallId'),
             	delStatus:''
          	},
          	allLoaded:false,
          	getUrl:getCookie('getUrl'),
          	isFirstEnter:false // 是否第一次进入，默认false
		}
	},
	beforeRouteEnter(to, from, next) {
	    console.log("我是beforeRouteEnter方法");
	    console.log(from);
	    if(from.name=='DetailsPage'){
	        to.meta.isBack=true;
	    }
	    next();
  	},
  	activated() {
	    console.log("我是activated 方法");
	    console.log(this.$route.meta.isBack);
	     document.body.scrollTop = getCookie('ScrollTop')
	    if(!this.$route.meta.isBack || this.isFirstEnter || this.$route.query.searchFlag==2){
	        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
	        // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
	        //this.$route.query.searchFlag这个是为了标志，点击查看更多商品进来的，需要重新加载数据
	        this.datalist=[]// 把数据清空，可以稍微避免让用户看到之前缓存的数
	        this.getData();
	        document.body.scrollTop=0
	    }
	    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
	    this.$route.meta.isBack = false
	    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
	    this.isFirstEnter=false;

  	},
    methods:{
    	getData(){
    		console.log("我是getData 方法");
			this.dataLoad(false);
			this.$store.state.refererUrl = decodeURIComponent(this.getUrlKey('refererUrl'))
			if(this.$store.state.refererUrl!="NULL"){
				window.addEventListener("popstate", function(e) { 
			       window.location.href=this.$store.state.refererUrl
			    }, false); 
			}
    	},
    	//获取子组件传过来的值,ishows标志着搜索框是否显示
    	SetisShow(data){
    		this.isShows = data;
    	},
		isShowFn(){
        	this.isShows=!this.isShows;
        },
    	dataLoad(ifFlag){
    		Indicator.open('Loading...');
    		this.searchFlag=this.$route.query.searchFlag
    		// console.log("searchFlag"+this.$route.query.searchFlag)
    		setCookie('familyRetFlag',0,1000*60)
    		if(this.searchFlag==1){
    			var url = this.$store.state.localHostUrl +'/searchMallGoodsName.json'
				this.OrderInfo.goodsName=this.$route.query.search
    		}else if(this.searchFlag==0){
    			//从外部点进去
    			setCookie('familyRetFlag',1,1000*60)
    			var url = this.$store.state.localHostUrl +'/searchMallGoodsInfo.json'
    			this.OrderInfo.familyId=this.$route.query.familyId
    			this.OrderInfo.goodsName=''
    			this.OrderInfo.merId=''
    		}else if(this.searchFlag==2){//点击店铺进来
    			var url = this.$store.state.localHostUrl +'/searchMallGoodsInfo.json'
    			this.OrderInfo.familyId=''
    			this.OrderInfo.merId=this.$route.query.merId
    		}else if(this.searchFlag==3){//点击搜索记录
    			var url = this.$store.state.localHostUrl +'/searchMallGoodsName.json'
    			this.search=this.$route.query.goodsName
    			this.OrderInfo.goodsName=this.$route.query.goodsName
    			// console.log(this.search)
    			// this.OrderInfo.mallId=this.$route.query.mallId
    		}else if(this.searchFlag==4){//点击分组搜索
    			var url = this.$store.state.localHostUrl +'/searchMallGoodsInfo.json'
    			this.OrderInfo.groupId=this.getUrlKey('groupId')
    			this.OrderInfo.goodsName=''
    			
    		}
			if(ifFlag){
    			this.OrderInfo.pageIndex +=1;
    		}else{
    			this.OrderInfo.pageIndex =1;
    		}

    		// console.log(this.OrderInfo)
			var data= qs.stringify(this.OrderInfo)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
	      		function (res){
      				if(!res.data.ret){
						Indicator.close();
      					console.log(res.data.endType);
      					// console.log(res.data.familyName)
      					if(ifFlag){
      						that.datalist=that.datalist.concat(res.data.data);
    					}else{
    						that.datalist=res.data.data;
    					}

      					if(that.searchFlag==2){
      						that.search=res.data.merName
      						
      					}else if(that.searchFlag==0){
      						that.search=res.data.familyName
      					}
      					if(res.data.data==''|| res.data.endType==1){
      						that.allLoaded = true;
      					}else{
      						that.allLoaded = false;
      					}
      					// else{
      					// 	that.search = that.$route.query.search
      					// }
      				}
					else{
						that.$toast(res.data.descript)
						Indicator.close();
					}
					
	      		}
	      	)
	    },
	    GoDetaileFn(g,i){
	    	let Top=this.$refs.DetaileScroll[i].getBoundingClientRect().top
	    	    // document.body.scrollTop = Top
			setCookie('ScrollTop',Top,1000*60)
	    	this.$router.push({path:'/DetailsPage',query:{goodsId:g}})
	    	
	    },
	    dump(url){
	    	this.$router.push(url)
	    },
	    getUrlKey (name) {
	      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
	    },
	    
    },
    watch:{
        'isShows':function () {
            this.dataLoad();
        }
    },
    mounted(){  
    	console.log("我是mounted 方法");
      

    },
    created() {
	    console.log("我是created 方法");
	    this.isFirstEnter=true;
		// if(this.$route.query.searchFlag==2){
		// 	console.log("调用了")
  //     	}

	    // 只有第一次进入或者刷新页面后才会执行此钩子函数
	    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
	},

   
}
</script>
<style>
.ML_header{position: relative;}
.ML_header_con{position: relative;z-index: 1;} 

.ML_icon2{margin-left: 5px; vertical-align: bottom;}
.ML_header_contop{    padding:15px 11px 15px 11px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 30px;} 
.ML_home{margin-top: 3px;
    width: 20%;
    margin-left: 10px;}
.ML_icon3{position: absolute;right: 10px;vertical-align: middle;  width: 30px;  margin-top: 3px;}
.ML_header_conbot{display: flex;}
.ML_header_conbot>li{flex:1;text-align: center;font-size:0.75rem;color:#FFFFFF;height: 25px;}
.icon_bor{	border-bottom:3px solid #f9dd99;color:#90B9E0;}
.ML_header_conbot .glyphicon{font-size:10px;color:#EBEBEB;}
.icon_bor>.ML_header_conbot{color:#BFDBF7}
.ML_content{position: absolute;	top:60px;	bottom:0;	background: #F4F4F6;	width: 100%;}
/*.ML_content .container{width:95%;margin:0 auto;}*/
.ML_content_box{padding: 7px 0;}
/*.ML_con_box{padding:10px;}*/
.ML_content .container{    box-sizing: border-box; overflow: hidden; margin-right: auto; margin-left: auto; padding-left:0rem;padding-right: 0rem; }
.ML_content .row {   box-sizing: border-box;
    width: 98%;
    margin: 0 auto;}
.ML_content .col-xs-6{
	    padding-left: 3px;
    padding-right: 3px;
    margin-bottom: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
/*.ML_content .col-xs-6:first-child{ padding-right: 0px;}*/
.ML_description{
   font-size: 0.8rem;
    color: #000000;
    padding: 0 4px 0 6px;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /* line-height: 16px; */
    margin-bottom: 10px;
    /*height: 36px;*/
        line-height: 20px;
    }
.ML_money{padding-bottom:8px;font-size:0.7rem ;color:#ff3000;padding-left: 6px;font-weight: bold;}
.ML_money_icon{vertical-align: middle;margin-right: 2px;}
.ML_con_box_img{
	width: 150px;
	margin:0 auto;
    height: 150px;
    padding: 2.5px;
    box-sizing: border-box;}
.ML_con_box{background: #fff;   
 /*height: 228px;*/
}

</style>