<template >
	<div id="home" v-cloak>
		<div class="home_header">
			<div class="home_header_img">
				<img width="100%" height="100%" src="./img/home_bg.png">
			</div>
			<div class="home_title_bg">
				<img width="20px" height="20px"  src="./img/home_title_bg.png">
			</div>
			<h5>{{merchantName}}</h5>
			<p>就餐日期:{{supplyDate}}</p>
		</div>
		<div class="home_content" >
			<div class="Hc_BOX">
				<div class="hc_box_row" >
					<div class="hc_box_col" v-for="(items,index) in datalist"  v-if="items.nodeLevel==1" >
						<div class="home_con_box">
							<div class="homt_con_box1">
								<div class="home_con_lf">
										<img width="30px"  height="28px" class="home_con_icon" :src="items.picPath">
								</div>
								<div class="home_con_minwidth" v-if="items.nodeLevel==1" @click="GoOrderdetailFn(items.familyId)">
									{{items.familyName}}<span></span>
									<!-- <span class="home_con_name"  ></span> -->

									<!-- <span v-if="items.nodeLevel==0" >{{items.familyId}}</span> -->
							
								</div>
							</div>

						</div>
					</div>
				</div>
			
			</div>
		</div>
		<div class="home_footer"> 
			<div class="gray_btn" @click="ScenePayFn">
				<span class="home_pay_icon_box"><i class="home_pay_icon1"></i>现场支付</span>
			</div>
			<div class="home_prompt" >
				<p>
					温馨提示：早餐、午餐、晚餐、特色菜（午餐）及每周一“歌”提前2天点餐，每周一“歌”菜品周一至周三18:00前接受预定，周五到食堂自行取餐。
				</p>
				<p>
					点餐订单如需退订,请于取餐前一天14:00前在订单详情页申请退款，预期无法处理;
				</p>
			</div>
		 </div>

		 <!-- <div @click="testCookie">删除cookie</div> -->
		  <!-- <div @click="request">测试</div> -->
		 <div class="model" v-show="showRet==100">
	 		<div class="home_kindly">
				<h5 class=".DP_list_Spec .blue">
					温馨提示
				</h5>
				<b>当前不是点餐时间，无法进行点餐。</b>
				<span>本系统点餐时间如下:</span>
				<ul class="kindly_ul ">
					<li class="flex">
						<p class="flex_min">
							类型
						</p>
						<p class="flex_max">
							点餐时间
						</p>
					</li>
					<li class="flex">
						<div class="flex_min">
							<p>营养早餐</p>
							<p>精美午餐</p>
							<p>美味晚餐</p>
							<p>特色菜(午餐)</p>
						</div>
						<div class="flex_max tranbox">
							<div class="tran">
								<p>
									周五18:00~
								</p>
								<p>
									下周三17:59
								</p>
							</div>
						</div>
					</li>
					<li class="flex ">
						<div class="flex_min last">
							<p>每周一歌</p>
						</div>
						<div class="flex_max last">
							<p>周一至周三17:59</p>
						</div>
					</li>
				</ul>
				<div class="home_pay SP_btn"  @click="close">
					关闭
				</div>
			</div>
		 </div>
	

	</div>
</template>
<script>
import router from '@/router'
import qs from 'qs'
import {setCookie,getCookie,delCookie} from '../../cookie/cookie.js'
import {Loadmore} from 'mint-ui'
export default{
		 name: 'home',
		 data(){
		 	return {
		 		Info:{
		 			openId:getCookie('openId'),
		 			merId:getCookie('merId'),
		 			mobile:getCookie('mobile')
		 			// familyId:''
		 		},
		 		merchantName:getCookie('merchantName'),
		 		showRet:''
		 		
		 	}
		 },
		computed:{
			datalist(){
			   return this.$store.state.FoodCategory.result
			},
			supplyDate(){
				 return this.$store.state.FoodCategory.supplyDate
			},
			ret(){
				 return this.$store.state.FoodCategory.ret

			}
		},
	  	methods: {
		    ScenePayFn:function(){
		       router.push({path: '/ScenePay'})
			},
			close(){
				 WeixinJSBridge.invoke('closeWindow',{},function(res){
				})
			},

		// testCookie(){
		// 	  delCookie('phone')

	 //      setTimeout(() => this.$router.push('/') ,1000)
		// },
		// request:function(){
			 // this.Info.openId = getCookie('openId')
			 // this.Info.merId = getCookie('merId')
			// var url = this.$store.state.localHostUrl+'/searckGoodsFamily.json' 
			// var formData= qs.stringify(this.Info)
			// var that= this
			// that.$http.post(url,formData,{emulateJSON: true}).then(
			// 	function(res){
			// 		if(!res.data.ret){
			// 			// var maps=res.data.data
			// 			// var result=[]
			// 			// for(var i=0;i<maps.length;i++){
			// 			// 	if(maps[i].nodeLevel==0){
			// 			// 		result.push(maps[i].nodeLevel)
			// 			// 	}
			// 			// }
			// 			that.datalist=res.data.data
			// 		}else{
			// 			alert(res.data.ret)
			// 		}

			// 	}
			// )
		// },
		GoOrderdetailFn:function(num){
			if(this.$store.state.FoodCategory.ret==100){
				this.showRet=this.$store.state.FoodCategory.ret
			}else{
				var url= this.$store.state.localHostUrl+'/searckGoodsInfo.json' 
				var formData=qs.stringify({"openId":this.Info.openId,"merId":this.Info.merId,"mobile":this.Info.mobile,"familyId":num})
				var that = this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(!res.data.ret){
							that.$store.state.GoodsInfo.result=res.data.data
							that.$router.push({path: '/OnlineOrder'})
							console.log(that.$store.state.GoodsInfo.result)
							var maps = res.data.data
							for(let i = 0;i < maps.length;i++){
								var map=maps[i].goodsInfo
								var number=[]
								var count=0,price=0
								for(let j =0;j<map.length;j++){
									number.push(map[j].number)
									count+=map[j].number//数量
									price+=map[j].number*map[j].goodsPrice
								}
								that.$store.state.GoodsInfo.number+=number
								that.$store.state.GoodsInfo.count+=count
								that.$store.state.GoodsInfo.price+=price
							}

						}
						else{
							that.$toast(res.data.ret)
						}
					}
				)
			}
		},
	   	getUrlKey (name) {
	      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
	    },
	
	},
	mounted(){
		// this.request()
		this.$store.dispatch('getFoodCategory')
		let url=this.getUrlKey('close')
		if(url){
			WeixinJSBridge.invoke('closeWindow',{},function(res){
			})
		}
	}
}
</script>
<style scoped>
.homt_con_box1{
	text-align: center;
	width: 80%;
	overflow: hidden;
	margin:0 auto;
}
[v-cloak] {
    display: none;
}
.home_header{
	position: relative;
}
.home_header_img{
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    /*background: #F7982C;*/
}
.home_title_bg{
	text-align: center;
}
.home_title_bg>img{
	margin: 0 auto;
	 padding: 10px 0 7px 0;
}
.home_header>h5{
	text-align: center;
	color: #fff;
	font-size: 0.9rem;

}
.home_header>p{
	text-align: center;
	color: #fff;
	font-size:0.55rem;
	padding: 10px 0;

}
.home_content{
	    width: 95%;
    margin: 0 auto;
    margin-top: 0.95rem;
    /* margin-bottom: 1.7rem; */
}		
.home_content .Hc_BOX{
	width:100%;
}
.home_con_box{
	    width: 80%;
    margin: 0 auto;
    background: #DFDFDF;
    -webkit-box-shadow: 0px 0px 10px 5px #F1F1F1;
    box-shadow: 0px 0px 10px 5px #F1F1F1;
    height: 2.1rem;
    line-height: 2.1rem;
    margin-bottom: 1rem;
    overflow: hidden;
}
.home_con_lf{
	    text-align: right;
    width: 50px;
    /* position: fixed; */
    /* flex: 0 0 50px; */
    float: left;
     width: 37%;
}
.home_con_lf>img{    vertical-align: sub;padding-right: 10px;}
.home_con_minwidth{
     margin: 0 auto;
    text-align: left;
    /* width: 200px; */
    /* overflow: hidden; */
    /* text-align: left; */
    /*text-align: justify;*/
    /* width: 50%; */
    flex: 0;
    float: left;
    width: 60%;
    font-size: 0.85rem;
    font-weight: bold;
}
.home_con_minwidth>span{
	display: inline-block /* Opera */;
    padding-left: 100%;
}
.home_con_name{
	font-size: 0.7rem;
	font-weight: bold;
}
.home_con_minwidth>img{
	display: inline-block;
	vertical-align: middle;
}
.last_tab{
	width: 90%;
	margin-bottom:0px;
}
.last_tab>.home_con_minwidth{
	text-align: center;
}
.home_footer{
	width: 90%;
	margin: 0 auto;
	border-top:1px solid #A0A0A0;
	text-align: center;

}

.home_prompt{
	    width: 90%;
    background: #EEEEEE;
    margin: 0 auto;
    text-align: left;
    padding: 10px;
    /*padding-top: 10px;*/
}

.home_prompt>p{
	font-size: 0.6rem;
	color:#8E8E8E;
	line-height: 18px;

}
.home_prompt p:first-child{
	padding-bottom:0px;
}
.hc_box_row{
overflow: hidden;
}
/*.hc_box_col{
	float: left;
	width: 50%;
}*/
.gray_btn1{
	width: 80%;
    background: #EEEEEE;
    color: #F08632;
    height: 2.2rem;
    line-height: 2.2rem;
    font-size: 0.75rem;
    margin: 7px auto 19px auto;
    text-align: center;
    border: 1px solid #FF5500;
}
.home_kindly{
	position: absolute;
	top:50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	background: #fff;
	width: 80%;
}
.home_kindly h5{
	font-size: 0.85rem;
	color: #f08632;
	margin:10px auto 15px auto;
	color: #f08632;
	text-align: center;
	width: 90%;
	/*margin:0 auto;*/
}
.home_kindly b{
    font-size: 0.75rem;
    text-align: left;
    width: 90%;
     margin: 0 auto 15px auto; 
    /*margin: 0 auto;*/
    display: block;
}
.home_kindly>span{
	font-size: 0.65rem;
	color: #666666;
	display: block;
	 width: 90%;     
	 margin: 0 auto 13px auto; 
}
.home_kindly>ul{

}
.home_kindly>ul>li{
	width: 90%;
	margin:0 auto;
	  border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.home_kindly>ul>li:first-child{
line-height: 26px;background:#f5f5f5;
	border:  1px solid #dadada;
	font-size: 0.65rem;
	text-align: center;
	color:#666;
}
.flex_min{
	flex: 0.8;
	border-right: 1px solid #ddd;
	padding: 5px 0;
}
.flex_max{
	flex: 1;
	padding: 5px 0;

}
.flex_min p,.flex_max p{
	font-size: 0.65rem;
	line-height: 15px;
	color: #666666;
	text-align: center;
}
.last p{
	height: 30px;line-height: 30px;
}
.tranbox{
	/*position: relative;*/
}
.tran{
/*	position: absolute;
	transform: translateX(-50%) translateY(-50%);
	top:-50%;
	left: -50%;*/
	margin-top: 14px;
}
</style>