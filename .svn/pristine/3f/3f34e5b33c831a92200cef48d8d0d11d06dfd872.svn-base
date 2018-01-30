<template>
	<div class="OrderedFoodList">
		<div class="OrderedFoodList_top">
			<!-- <div class="OFl_header">
				<p>
					<b>小黑人儿</b>
					<span>131099918</span>
				</p>
				<div class="OFl_address">
					<span>
						上海上海市浦东区实际达到2号国际贸易中心A左1201（送货前打电话）
					</span>	
					<span class="jt_bg">
						<img src="./img/jt_icon.png" width="10px" height="20px">
					</span>
				</div>
			</div> -->
		 	<div class="OL_tabone">
		  		<ul>
		  			<li class="mar_top">
		  				<div class="OL_title title_bor">
		  					<p class="lf"><i></i>{{merchantName}}</p>
		  				</div>
		  				<ul class="OFL_list">
		  					<li class="OL_fooditem title_bor" v-for="(items,index) in datalist"> 
		  						<div class="OL_fooditem_lf">
		  							<!-- <img  src="./img/food_icon.png" width="80px" height="50px"> -->
		  							<img  :src="items.photoUrl" >
		  					
		  						</div>
		  						<div class="OL_foodltem_rt">
		  							<span >{{items.merName}}</span>
		  							<span><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{items.price}}*{{items.amount}}件</span>
		  						</div>
		  					</li>
		  				</ul>
		  			</li>
		  		</ul>
		  	</div>
		  	<ul class="OFL_changepay mar_top">
		  		<li>
		  			<mt-cell title="运费">
							<span class="bold"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>0.00</span>
					</mt-cell>
		  		</li>
		  		<li class="OFL_message">
		  			<!-- {{payOrderInfo.orderMsg}} -->

		  			<p>订单留言:<input class="orderMsg_input" v-model="payOrderInfo.orderMsg" type="" value="" name="">
		  			</p>
		  		</li>
		  		<li>
		  			<mt-cell title="支付方式" value="微信支付">
		  				<p class="OFL_wxcontent">
		  					<!-- <img src="./img/wx.png" width="20px"  height="18px"> -->
		  					微信支付
		  				</p>
					</mt-cell>
		  		</li>
		  	<!-- 	<li>
		  			<mt-cell title="优惠券" is-link >
		  				<span class="bold"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>-5.00</span>
					</mt-cell>
		  		</li> -->
		  		<li >
		  			<mt-cell title="我的卡包"  >
		  				<span class="mint-checkbox-label">饭卡可用<span class="red" v-model="restAmt"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{CardInfoList.restAmt}}</span></span>
						<label class="mint-checklist-label">
							<span class="mint-checkbox is-right" v-show="CardInfoList.restAmt != 0">
								<input type="checkbox"  v-model="userCard"   class="mint-checkbox-input" value=""> 
								<span class="mint-checkbox-core"  @click="useCard"></span>

							</span>
							 
							
						</label>
						
					</mt-cell>
		  		</li>
		  		<!-- <li>
		  			<mt-cell title="米粒儿"  >
						<label class="mint-checklist-label">
							<span class="mint-checkbox is-right">
								<input type="checkbox" class="mint-checkbox-input"  value=""> 
								<span class="mint-checkbox-core"></span>
							</span>
							 <span class="mint-checkbox-label">您有500米粒儿,可用100米粒儿抵扣 <span class="red">5元</span></span>
						</label>
					</mt-cell>
		  		</li> -->
		  	</ul>
			<ul class="OFL_listtwo mar_top">
				<li>
					<mt-cell title="商品总额" >
						<span class="blue"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{payOrderInfo.orderAmt}}</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="运费" >
						<span class="blue"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>0</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="优惠抵扣">
						<span class="blue"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>0</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="饭卡抵扣" >
						<span class="blue">-{{CardOffset}}</span>
					</mt-cell>
				</li>
			</ul>
			<div class="ActualMoney_box">
				<mt-cell title="实付金额"  >
					<span class="ActualMoney"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{payOrderInfo.payAmt}}</span>
				</mt-cell>
			</div>
		</div>
		<div class="shopCart">
			<div class="Online_content">
				<div class="Online_content-left">
					<p class="OFL_money">实付:<img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{payOrderInfo.payAmt}}</p>
				</div>
				<button class="Online_content-right"  :disabled="isShow" @click="chooseOk()">
					<span v-if="isShow==false">提交订单</span>	
					<span  v-if="isShow==true">提交中...</span>					
				</button>
			</div>
		</div>
		<!-- <div class="nowloading" v-show="is_loadding">
			<img src="../../assets/img/nowloading.gif">
		</div> -->
	</div>
</template>
<script>
import Vue from 'vue'
import qs from 'qs'
import {setCookie,getCookie} from '../../cookie/cookie.js'
import router from '@/router'
import {Loadmore} from 'mint-ui'
import { Indicator } from 'mint-ui';
export default{
	name:'OrderedFoodList',
	data(){
		return {
			orderInfo:{
				merId:getCookie('merId'),
	 			mobile:getCookie('mobile'),
	 			openId:getCookie('openId')
			},
			datalist:[],
			CardInfoList:[],
			payOrderInfo:{
				openId:getCookie('openId'),
				mobile:getCookie('mobile'),
				merId:getCookie('merId'),
				orderMsg:'',
				useCard:1,
				orderAmt:0,
				payAmt:0,
				supplyDate:getCookie('supplyDate')
			},
			restAmt:'',
			userCard:true,
			orderId:'',
			merchantName:getCookie('merchantName'),
			CardOffset:'',
			isShow:false

			// is_loadding:false
		}
	},
	methods:{
		getCartGood(){
			Indicator.open('Loading...');
			var url= this.$store.state.localHostUrl+'/searchCartGoodsInfo.json' 
			var formData=qs.stringify(this.orderInfo)
			var that=this
			that.$http.post(url,formData,{emulateJSON:true}).then(
				function(res){
					if(!res.data.ret){
						that.datalist=res.data.data
						var map = res.data.data
						var orderAmt=0
						for(let i=0; i<map.length;i++){ 
							orderAmt += map[i].price*map[i].amount
						}
						that.payOrderInfo.orderAmt=that.toFixed(orderAmt,2);
						that.payOrderInfo.payAmt=that.toFixed(orderAmt,2);
						that.payOrderInfo.useCard = 0
						that.getCardInfo()
					}
					else{
						that.$toast(res.data.descript)
					}
					Indicator.close('Loading...');
				}
			)
		},
		getCardInfo(){
			var url= this.$store.state.localHostUrl+'/getCardInfo.json' 
			var formData=qs.stringify({openId:this.orderInfo.openId,mobile:this.orderInfo.mobile})
			var that=this
			that.$http.post(url,formData,{emulateJSON:true}).then(
				function(res){
					if(!res.data.ret){
						that.CardInfoList=res.data.data;
						that.useCard();
					}
					else{
						that.$toast(res.data.descript)
					}
				}
			)
		},
		// orderMessage(){
		//   router.push({path: '/orderMessage'})
		// },
		toFixed(num, s) {
			var times = Math.pow(10, s)
			var	des = num * times + 0.5
			des = parseInt(des, 10) / times
			return des + ''
		},		
		useCard(){
			this.payOrderInfo.useCard=!this.payOrderInfo.useCard
			console.log(this.CardInfoList.restAmt)
			if(this.CardInfoList.restAmt==0){
				this.payOrderInfo.useCard =0
			}else{
				if(this.payOrderInfo.useCard == 1){
					if(this.payOrderInfo.orderAmt<=this.CardInfoList.restAmt){
						this.payOrderInfo.payAmt = 0
						// 饭卡抵扣
						this.CardOffset=this.payOrderInfo.orderAmt
					}else{
						this.payOrderInfo.payAmt = this.toFixed((this.payOrderInfo.orderAmt - this.CardInfoList.restAmt),2)
						this.payOrderInfo.payAmt =this.toFixed(this.payOrderInfo.payAmt,2)
						this.CardOffset=this.CardInfoList.restAmt
					}
				}else{
					// console.log(this.payOrderInfo.orderAmt)
					this.payOrderInfo.payAmt = this.payOrderInfo.orderAmt
					this.CardOffset=0
				}
			}
			
		},
		chooseOk(){
			  	this.isShow=true
			var url= this.$store.state.localHostUrl+'/submitOrderInfo.json' 
			let formDate=qs.stringify(this.payOrderInfo)
			console.log(formDate)
			var that=this
			 Indicator.open('Loading...');
			that.$http.post(url,formDate,{
				emulateJSON:true,
    			// headers: {
       //          "Origin":"*"
       //        },



			}).then(
				function(res){
					if(!res.data.ret){
						that.orderId=res.data.orderId
						// console.log("这是返回来的"+res.data)
						// alert("这是返回来的"+res.data)
						if(that.payOrderInfo.payAmt!=0){//微信支付
							that.weixinPay(res.data)
						}else{
							router.push({path:'/Orderdetail_goods',query:{orderId:that.orderId}})
						}
      					Indicator.close();

					}
					else{
						that.$toast(res.data.descript)
						router.push({path:'/OrderList'})

					}

					that.isShow=false
				}
			)

		},
		
		weixinPay:function(data){
			console.log(data)
	        var vm= this;
	        if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
	          if( document.addEventListener ){
	            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
	          }else if (document.attachEvent){
	            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
	            document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
	          }
	        }else{
	          vm.onBridgeReady(data);
	        }
	      },
	      /**
	       * @method 支付费用方法
	       * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
	       */
	    onBridgeReady:function(data){
	      Indicator.close();
	        var  vm = this;
	        //关闭浏览器窗口
	  //       WeixinJSBridge.invoke('closeWindow',{},function(res){
			// }
			//微信支付
	        WeixinJSBridge.invoke(
	          'getBrandWCPayRequest',{
	            "appId":data.appid,     //公众号名称，由商户传入
	            "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
	            "nonceStr":data.nonceStr, //随机串
	            "package":data.package,
	            "signType":"MD5", //微信签名方式：
	            "paySign":data.sign //微信签名
	          },
	          function(res){
	            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
	            if(res.err_msg == "get_brand_wcpay_request:ok" ){
	              // vm.$router.push({path:"/Orderdetail_goods",query:{orderId:orderId}});
	              // vm.is_loadding=false
	              router.push({path:'/Orderdetail_goods',query:{orderId:vm.orderId}})
	            }else{
	             	 // alert("支付失败,请跳转页面"+res.err_msg);
	              	router.push({path:'/OrderList'})
	                this.$toast("支付失败");
	                // vm.is_loadding=false
	            }
	          }
	        );
	    },
	   
	},
	created(){
		// this.payOrderInfo.payAmt = this.payOrderInfo.orderAmt
		// console.log(this.payOrderInfo.orderAmt)
		this.getCartGood();
		// this.getCardInfo();
		// this.useCard();
	}
}
</script>
	