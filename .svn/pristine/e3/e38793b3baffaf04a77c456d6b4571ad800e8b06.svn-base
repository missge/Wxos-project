<template>
	<div class="EC_categoryPage">
		<!-- <div class="show_toolbar" v-show="isShow!=true" > -->
		<div class="show_toolbar" :class="{'shows':isShows}" >
			<div class="toolbar" >
				<div class="EC_CP_header">
					<div class="EC_CP_input">
						<input type="" placeholder="" @focus="isShowFn()"   name=""> 
						<img  src="../assets/img/ML_search.png" width="18px" height="18px">
					</div>	
				</div>
			</div>
			<div class="EC_CP_goods ">
				<div class="Online_goods">
					<div class="menu-wrapper" ref="menuWrapper">
						<ul class="EC_CP_menu_lf"  >
							<li class="" v-for="(items,index) in datalist" @click="defaultCheck(index)" :class="on==index?'EC_CP_selected':''">
								{{items.familyName}}
							</li>
						</ul>
					</div>
					<div class="foods-wrapper EC_CP_wrapper"   id="wrapper"  ref="foodsWrapper">
						<ul >
							<li class="food-list-hook" >
								<div class="EC_CP_content" @click="GoMallList(firstItem.familyId)" v-for="(firstItem,index) in firstDatalist.mallFamilyGoodsDTO"> 
									<!-- <img src="./img/goods1.png"> -->
									<div class="EC_CP_imgbox">
										<img :src="firstItem.picPath"  >
										
									</div>
									<p>{{firstItem.familyName}}</p>
								</div>
								
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="footer_bot">
				<mt-tabbar>
					<mt-tab-item id="tab1" >
						<div  @click="goPage('Ehome')" :class="{'on': clicked === 'Ehome' }" >
							<span class="icon1" ></span>
							<p class="icon_font">首页</p>
						</div>
						
					</mt-tab-item>
					<mt-tab-item id="tab2" >
						<div  @click="goPage('CategoryPage')" :class="{'on': clicked === 'CategoryPage' }">
							<span class="icon2" ></span>
							<p class="icon_font" >分类</p>
						</div>
					</mt-tab-item>
					<mt-tab-item id="tab3" >
						<div  @click="goPage('ShoppingCard')"  :class="{'on': clicked === 'ShoppingCard' }">
							<span class="icon3" ></span>
							<p class="icon_font">购物车</p>
						</div>
					</mt-tab-item>
					<mt-tab-item id="tab4" >
						<div @click="goPage('PersonalCenter')" :class="{'on': clicked === 'PersonalCenter' }">
							<span class="icon4" ></span>
							<p  class="icon_font">我的</p>
						</div>
					</mt-tab-item>
				</mt-tabbar>
			</div>
		</div>
		<search  :class="{'shows':!isShows}" @getIsShow="SetisShow" ></search>
	</div>
</template>
<script>
import {setCookie,getCookie} from '../cookie/cookie.js'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
import Search from './Search'
import BScroll from 'better-scroll'
import {Indicator} from 'mint-ui';
export default{
	name:'CategoryPage',
	components:{
		Search,
	},
	data(){  
		return {
			datalist:[],
			// searchList:	this.$store.state.GoodsSearchOldInfo.result,
			firstDatalist:[],
      		OrderInfo :{
	 			mallId:getCookie('mallId'),
				familyId:''

      		},
      		// isShow:false,
      		searchInfo:{
				mallId:getCookie('mallId'),
      		},
      		isShows:false,
      		on:0,
      		clicked:'CategoryPage',
     		getUrl:getCookie('getUrl'),
      		returnFlag:false,
      		clickFamilyId:0
		}
	},
	created() {
		console.log();
	},
    methods:{
	 	getUrlKey (name) {
	      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
	    },
    	goPage(Gopage){
			this.clicked = Gopage
			this.$router.push({path:'/'+Gopage})
		},
    	SetisShow(data){
    		this.isShows = data;
    	},
    	_initScroll() {
			this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
			    click: true
			});
			  this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
			    click: true,
			    probeType: 3
			  });
	 		 this.foodsScroll.on('scrollStart', () => {
				    this.scrollFlag = true;
			 });
				  // 监控滚动事件
			this.foodsScroll.on('scroll', (pos) => {
			    this.foodsScrollY = Math.abs(Math.round(pos.y+60))
		 	})
		},
    	dataLoad(){
			this.OrderInfo.familyId=''
			//如果url的familyId为空--则为标志点击footer进入
			if(this.$route.query.familyId == null||this.$route.query.familyId ==''){
				//如果没有点击右边商品列表，则默认为第一个值显示
				if(getCookie('FamilyIdFlag')==null||getCookie('FamilyIdFlag')==''){
					this.OrderInfo.familyId=''
				}else{
					//点击商品列表，retFlag为1则证明点击了返回按钮
					if(getCookie('FamilyIdFlag')!=null&&getCookie('familyRetFlag')==1){
						//则以返回按钮的值为主
						this.OrderInfo.familyId=getCookie('FamilyIdFlag')
					}
					else{
						//没有点击，默认为空
						this.OrderInfo.familyId=''
					}
				}
			}
			//如果存在familyId,并且返回，以返回的标志为准
			if(this.$route.query.familyId != null && getCookie('familyRetFlag')==1){
				this.OrderInfo.familyId=getCookie('FamilyIdFlag')
				console.log('两者都存在，以后者为主'+getCookie('familyRetFlag'));
			}
			//如果url里Id不为空，并且没有点击返回，则以url的值为准
			if(this.$route.query.familyId != null && getCookie('familyRetFlag')==0){
				this.OrderInfo.familyId=this.$route.query.familyId
			}
			
				
    		
    		Indicator.open('Loading...');
			var url = this.$store.state.localHostUrl +'/searchMallGoodsFamily.json'
			var data= qs.stringify(this.OrderInfo)
			var that = this
			
			that.$http.post(url,data,{emulateJSON:true}).then(
	      		function (res){
	      			setCookie('familyRetFlag',0,1000*60)
	      			let defaultNum=res.data.defaultNum
      				if(!res.data.ret){
						Indicator.close('Loading...');

      					that.datalist=res.data.data
						that.defaultCheck(defaultNum)
      					// that.firstDatalist=that.datalist[0]
      					let orderSysFlag=res.data.orderSysFlag
      					let orderSysUrl=res.data.orderSysUrl
      					console.log(that.datalist);
      					setCookie('orderSysFlag',orderSysFlag,1000*60)
      					setCookie('orderSysUrl',orderSysUrl,1000*60)
						that.$nextTick(() => {
			 				 that._initScroll(); 
						})
      				}
					else{
						Indicator.close('Loading...');

					}
	      		}
	      	)
	    },
	    defaultCheck(i){
			this.$route.query.familyId=this.datalist[i]
	    	this.on=i
	    	this.firstDatalist=this.datalist[i]
	    	
	    },
		GoMallList(familyId){
			let vm=this
			this.datalist.forEach(function(list,index){
				list.mallFamilyGoodsDTO.forEach(function(item){
					if(familyId==item.familyId){
						setCookie('FamilyIdFlag',list.familyId,1000*60)
						// setCookie('FamilyIdIndex',index,1000*60)
					}
				})
			})


			this.$router.push({path:'MallList',query:{familyId:familyId,searchFlag:0}})
		},
	 	isShowFn(){
        	this.isShows=!this.isShows;
        },
    },

	// watch:{
		// search:function(){
		// 	this.searchInfo.goodsName=this.search
		// 	var url = this.$store.state.localHostUrl +'/searchMallGoodsName.json'
		// 	var data= qs.stringify(this.searchInfo)
		// 	var that = this
		// 	that.$http.post(url,data,{emulateJSON:true}).then(
	 //      		function (res){
  //     				if(res.data.ret==0){
  //     					that.$router.push({path:'MallList',query:{goodsName:''}})
      				
  //     				}
		// 			else{
		// 				// alert(res.data.descript)
		// 			}
	 //      		}
	 //      	)
		// }
	// },
    mounted(){  
		
		//this.clickFamilyId = this.$route.query.familyId
		//this.$route.query.familyId=0
		this.$store.state.refererUrl = decodeURIComponent(this.getUrlKey('refererUrl'))
		window.addEventListener("popstate", function(e) { 
		    window.location.href=this.$store.state.refererUrl
		}, false); 
		this.dataLoad();
    },

}
</script>
<style>


/*.hide_toolbar{display: none;}*/
</style>