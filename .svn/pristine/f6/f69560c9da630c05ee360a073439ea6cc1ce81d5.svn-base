<template>
	<div class="PersonalCenter">
		<!--  <div @click="testCookie">删除cookie</div>
 -->
		<div class="pc_header">
			<div class="pc_header_con">
				<div class="pc_header_log">
					<img :src="wxInfo.wxHeadImgUrl"  width="60px" height="60px">
				</div>
				<div class="pc_header_content">
					<h5>{{wxInfo.wxName}} </h5>
					<div class="pc_header_ident"><span>{{wxInfo.mobile}}</span></div>
				</div>
				<!-- <div class="pc_setUp"></div> -->
			</div>
			<div class="pc_header_bg">
				<img src="./img/bg.png" width="100%" height="100%">
			</div>
		</div>
		<div class="pc_content">
			<div class="pc_content_one">
				<p class="pc_content_order clear">
					<span class="lf">我的订单</span>
					<span @click="GoPerCenter('')" class="rt" >查看所有>></span>
				</p>
				<div class="pc_order_tab">
					<div @click="GoPerCenter(0)">
						<img width="46px" src="./img/pc_icon1.png">
						<p>待支付</p>
					</div>
					<div @click="GoPerCenter(2)">
						<img width="46px" src="./img/pc_icon4.png">
						<p>待发货</p>
					</div>
					<div @click="GoPerCenter(3)">
						<img width="46px"  src="./img/pc_icon3.png">
						<p>待收货</p>
					</div>
				<!-- 	<div @click="GoPerCenter(8)">
						<img width="46px"  src="./img/pc_icon2.png">
						<p>待退款</p>
					</div> -->
					<div @click="GoRefund">
						<img width="46px"  src="./img/pc_icon2.png">
						<p>退款退货</p>
					</div>
					
				</div>
			</div>
			<ul class="pc_content_two">
				<li>
					<div @click="GoMealCard">
						<img src="./img/pc_two_icon1.png" width="28px" height="24px" >
						<p>我的卡包</p>
					</div>
				</li>
				<li>
				 	<div>
					 	 <mt-button @click.native="handleClick">
							<img src="./img/pc_two_icon2.png" width="28px" height="24px" >
							<p>优惠券</p>
						</mt-button>
					</div>
				</li>
				<!-- <li>
					<div>
						<mt-button @click.native="handleClick">
							<img src="./img/pc_two_icon3.png" width="28px" height="24px" >
							<p>米粒儿:0</p>
						</mt-button>
						
					</div>
				</li> -->
			</ul>
			<ul class="pc_content_three">
				<li @click="Addressmanage">
					<mt-cell title="收货地址管理"  is-link></mt-cell>
				</li>
				<li @click="syncUserInfo">
					<mt-cell title="更新资料"  is-link >
						
					</mt-cell>
				</li>
				<!-- <li>
					<mt-cell title="我的评价"  is-link></mt-cell>
				</li>
				<li>
					<mt-cell title="参与的活动"  is-link></mt-cell>
				</li>
				<li>
					<mt-cell title="收货地址管理"  is-link></mt-cell>
				</li> -->
			</ul>
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
	
	<!-- 	<div class="nowloading" v-show="is_loadding">
			<img src="../../assets/img/nowloading.gif">
		</div> -->
	</div>
</template>
<script>
import router from '@/router'
import Vue from 'vue'
import qs from 'qs'
import Myfooter from './../../Ecommerce/footer'
import { Indicator,Loadmore } from 'mint-ui';
import {setCookie,getCookie,delCookie} from '../../cookie/cookie.js'
	export default{
		name:'PersonalCenter',
		components:{
			Myfooter
		},
		data(){
			return{
				PayRecord :{
		 			mobile:getCookie('mobile'),
	      		},
	      		length:'',
	      		OrderInfo :{
		 			mobile:getCookie('mobile'),
		 			openId:getCookie('openId'),
	      			orderId:'',
	      			status:'' 
	      		},
	      		wxInfo:{
	      			mobile:getCookie('mobile'),
	      			wxName:getCookie('wxName'),
	      			wxHeadImgUrl:getCookie('wxHeadImgUrl'),
	      		},
	      		// is_loadding:false
	      		clicked:'PersonalCenter',
     			getUrl:getCookie('getUrl')
			}
		},
		methods:{
		    getUrlKey (name) {
		      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
		    },
			goPage(Gopage){
				this.clicked = Gopage
				this.$router.push({path:'/'+Gopage})
			},
			Addressmanage(){
				//收货地址的入口标志
				this.$router.push({path:"/DeliveryAddress",query:{pathType:'1'}})
			},
			handleClick: function() {
	          this.$toast('暂无此功能!')
	        },
			click_fun: function (fun_name) {
				// Indicator.open('Loading...');
				this.$store.dispatch(fun_name)
				console.log(fun_name)
			},
			GoMealCard(){
				this.$router.push("/MealCard")
			},
			getPayRecord(){
				var url= this.$store.state.localHostUrl+'/searchPayRecord.json' 
				var formData=qs.stringify(this.PayRecord)
				var that=this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(!res.data.ret){
							that.length=res.data.data.length
						}
						else{
							that.$toast(res.data.descript)
						}
					}
				)
			},
			GoPerCenter(num){
				this.$router.push({path:"/orderList",query:{status:num,mark:0}})
				console.log(num)
			},
			syncUserInfo(){
				var url= this.$store.state.localHostUrl+'/syncUserInfo.json' 
				var formData=qs.stringify(this.PayRecord)
				var that=this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(!res.data.ret){
							that.$toast("更新资料成功")
						}
						else{
							that.$toast(res.data.descript)
						}
					}
				)
			},
			GoRefund(){
				this.$router.push({path:'/Refunding'})
			}

			// searchOrder(num){
   //    			 this.OrderInfo.status=num
	  //     		var url = this.$store.state.localHostUrl +'/searchOrderInfo.json'
	  //     		var data= qs.stringify(this.OrderInfo)
	  //     		console.log(data)
	  //     		var that = this
	  //     		that.$http.post(url,data,{emulateJSON:true}).then(
	  //     			function (res){
	  //     				if(!res.data.ret){
	  //     					that.datalist=res.data.data
	  //     					console.log(res.data.data)		
	  //     					that.$router.push({path:'/OrderList'})
	  //     				}
			// 			else{
			// 				alert(res.data.descript)
			// 			}
	  //     			}
	  //     		)
	  //     	},

		},
		mounted(){
			this.$store.state.refererUrl = decodeURIComponent(this.getUrlKey('refererUrl'))
			if(this.$store.state.refererUrl!="NULL"){
				window.addEventListener("popstate", function(e) { 
			       window.location.href=this.$store.state.refererUrl
			    }, false); 
			}else{
				let url=this.getUrlKey('close')
				if(url){
					WeixinJSBridge.invoke('closeWindow',{},function(res){
					})
				}
				
			}
		}

	}
</script>
<style type="text/css">
.pc_header{
	position: relative;
}
.pc_header_bg{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	/*background: #F08632;*/
}
.pc_header_log{
	width: 60px;
    height: 60px;
    position: relative;
    border-radius: 50%;
    background: #fff;
    /* z-index: 100; */
}
.pc_header_log img{
	position: absolute;
    z-index: 0;
    border-radius: 48%;
}
.pc_header_con{
	position: relative;
	display: flex;
	display: -ms-flexbox;
	padding: 30px 38px;
}
.pc_header_content{
	padding-left:10px;
}
.pc_header_content h5{
	color:#fff;
	margin-bottom: 10px;    
	margin-top: 11px;
}
/*.pc_header_content h5>span{
	    padding: 1px 5px;
    font-size: 12px;
    border: 1px solid #92B9D6;
    margin-left: 8px;
}*/
.pc_header_ident{
	/*background: url("./img/type_btn.png") no-repeat center center;*/
	width: 79px;
	height: 21px;
	color:#fff;
	font-size:10px;
	line-height: 21px;
	    /*position: relative;*/
}
.pc_header_ident>span{
	/* position: absolute;
    left: 22px;
    top: -1px;*/
}
.pc_setUp{
	position: absolute;
	right: 0;
	background: url("./img/setup.png") no-repeat center center;
	background-size: 100%;
	width: 25px;
	height: 25px;
	right: 40px;
	transform:translateY(-50%);
	top:50%;
}
.pc_content{
	position: absolute;
	background: #EFF4F8;
	top:120px;
	width: 100%;
	bottom:0;
}
.pc_content_one,.pc_content_three{
	margin-top:7px;
	background: #fff;
}
.pc_content_order{
	height: 34px;
	line-height: 34px;
	border-bottom:2px solid #EDEDED;
	width: 96%;
	margin:0 auto;
}
.pc_content_order>.lf{
	font-weight: bold;
	padding-left: 5px;
}
.pc_content_order>.rt{
	padding-right: 5px;
}
.pc_content_order>.lf,.pc_content_order>.rt{
	font-size: 0.75rem;
}
.pc_order_tab{
	display: flex;
}
.pc_order_tab>div{
	flex:1;
	text-align: center
}
.pc_order_tab>div>img{
	    padding: 25px 0 10px 0;
}
.pc_order_tab>div>p{
	padding-bottom: 20px;
	font-size: 0.7rem;
	color: #696969;
}
.pc_content_two{
	display: flex;
	margin-top:7px;
	background: #fff;
}
.pc_content_two li{
	flex:1;
	text-align: center;
}
.pc_content_two li>div{
	border-right:1px solid #EDEDED;
	margin-top:6px;
	margin-bottom:6px;
}
.pc_content_two li>div img{
	margin-bottom:8px;
	margin-top:8px;
}
.pc_content_two li>div p{
	font-size: 0.725rem;
	color:#434343;
	padding-bottom:8px;
}

.pc_content_three span{
	    font-size: 0.7rem;
    line-height: 32px;
}
.pc_content_three .mint-cell{
	height: 42px;
	line-height: 42px;
	border-bottom: 1px solid #d7d7d7;
}
</style>