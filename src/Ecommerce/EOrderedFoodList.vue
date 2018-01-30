<template>
	<div class="OrderedFoodList">
		<div class="">
			<div class="OFl_header" @click="SelectAddressFn" v-for="(item,index) in datalist"  v-show="datalist.length!=0">
				<p>
					<b>{{item.memName}}</b>
					<span>{{item.phoneNo}}</span>
				</p>
				<div class="OFl_address">
					<span>	{{item.province}}	{{item.city}}	{{item.area}}	{{item.streetAddress}}
					</span>	
					<span class="jt_bg">
						<img src="./img/jt_icon.png" width="10px" height="15px">
					</span>
				</div>
			</div>
			<div class="OFl_header1" @click="Address"  v-show="datalist.length==0">
				<div class="OFl_address">
					<span>	暂未设置收货地址，点击进行设置</span>	
					<span class="jt_bg">
						<img src="./img/jt_icon.png"  width="10px" height="15px">
					</span>

				</div>
				<img src="./img/Address.png" width="100%" height="7px">
			</div>

		</div>
		<div class="OL_tabone">
	  		<ul>
	  			<li class="mar_top" v-for="(items,index) in CartList">
	  				<div class="OL_title title_bor">
	  					<p class="lf"><i></i>{{items.merName}}</p>
	  				</div>
	  				<ul class="OFL_list">
	  					<li class="OL_fooditem title_bor" v-for="(item,index) in items.cartInfo"> 
	  						<div class="OL_fooditem_lf">
	  							<!-- <img  src="./img/food_icon.png" width="80px" height="50px"> -->
	  							<img  :src="item.photoUrl" >
	  					
	  						</div>
	  						<div class="OL_foodltem_rt">
	  							<span >{{item.goodsName}} <span class="gray_minfont">  {{item.goodsAttrStr}} </span></span>
	  							<span><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{item.price}}<br>{{item.amount}}件</span>
	  						</div>
	  					</li>
	  				</ul>
	  				<ul class="OFL_changepay mar_top">
		  				<li>
				  			<mt-cell title="运费">
								<span class="bold"><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>0.00</span>
							</mt-cell>
				  		</li>
				  		<li class="OFL_message">
				  			<!-- {{payOrderInfo.orderMsg}} -->

				  			<p>订单留言：<input class="orderMsg_input" @blur="inputFn(index,items.merId)" type="text" ref="orderMsg" value="" name="">
				  			</p>
				  		</li>	
				  	</ul>
	  			</li>
	  		</ul>
	  		<ul class="OFL_changepay mar_top">
		  				
		  		<li>
		  			<mt-cell title="支付方式" value="微信支付">
		  				<p class="OFL_wxcontent">
		  					<!-- <img src="./img/wx.png" width="20px"  height="18px"> -->
		  					微信支付
		  				</p>
					</mt-cell>
		  		</li>
		  		<li >
		  			<mt-cell title="我的卡包"  >
		  				<span class="mint-checkbox-label">饭卡可用<span class="red" v-model="restAmt"><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{CardInfoList.restAmt}}</span></span>
						<label class="mint-checklist-label">
							<span class="mint-checkbox is-right" v-show="CardInfoList.restAmt != 0">
								<input type="checkbox"  v-model="userCard"   class="mint-checkbox-input" value=""> 
								<span class="mint-checkbox-core"  @click="useCard"></span>

							</span>
							 
							
						</label>
						
					</mt-cell>
		  		</li>
		  	</ul>
			<ul class="OFL_listtwo mar_top">
				<li>
					<mt-cell title="商品总额" >
						<span class="blue"><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{payOrderInfo.orderAmt}}</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="运费" >
						<span class="blue"><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>0</span>
					</mt-cell>
				</li>

				<li>
					<mt-cell title="优惠抵扣">
						<span class="blue"><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>0</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="饭卡抵扣" >
						<span class="blue">-{{CardOffset}}</span>
					</mt-cell>
				</li>
			</ul>
		
			<div class="ActualMoney_box">
				<mt-cell title="实付金额" >
					<span class="ActualMoney"><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{payOrderInfo.payAmt}}</span>
				</mt-cell>
			</div>
		</div>
		<div class="shopCart">
			<div class="Online_content">
				<div class="Online_content-left">
					<p class="OFL_money">实付:<img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{payOrderInfo.payAmt}}</p>
				</div>
				<button class="Online_content-right"  :disabled="isShow" @click="chooseOk()">
					<span v-if="isShow==false">提交订单</span>	
					<span  v-if="isShow==true">提交中...</span>					
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import qs from 'qs'
import {setCookie,getCookie} from '../cookie/cookie.js'
import router from '@/router'
import { Indicator,Loadmore } from 'mint-ui';
export default{
	name:'EOrderedFoodList',
	data(){
		return{
			AddressInfo:{
	 			sign:1,
	 			receivId:''
			},
			datalist:[],
			 
			defalut:1,
			searchInfo:{
	 			mallId:getCookie('mallId'),
	 			submitFlag:1
			},
			CartList:[],
			CardInfoList:[],
			restAmt:'',
			userCard:true,
			orderId:'',
			merchantName:getCookie('merchantName'),
			CardOffset:'',
			changeOK:true,
			payOrderInfo:{
				mallId:getCookie('mallId'),
				useCard:1,
				orderAmt:0,
				payAmt:0,
				receivingId:'',
				receiveMap:new Map()
			},
			retFlag:'',
			isShow:false
		}
	},
	methods:{
		SelectAddressFn(){
			this.$router.push({path:'/SelectAddress',query:{pathType:'2'}})
		},
		getRecAdd(){
			if(this.$route.query.receivId==undefined){
				this.AddressInfo.receivId=''
			}else{
				this.AddressInfo.receivId=this.$route.query.receivId
			}
			var formData =qs.stringify(this.AddressInfo)
			var url = this.$store.state.localHostUrl+'/getRecAddress.json'
			var that=this
			that.$http.post(url,formData,{emulateJSON:true}).then(
				function(res){
					that.retFlag=res.data.ret
					if(res.data.ret==0){
						that.datalist=res.data.data
						that.payOrderInfo.receivingId=res.data.data[0].id
					}else{
						that.$toast(res.data.descript)
					}
				}
			)
		},
		getCartGood(){
			Indicator.open('Loading...');
			var url= this.$store.state.localHostUrl+'/searchMallCartGoodsInfo.json' 
			var formData=qs.stringify(this.searchInfo)
			var that=this
			that.$http.post(url,formData,{emulateJSON:true}).then(
				function(res){
					if(res.data.ret==0){
						console.log(res.data.data)
						that.CartList=res.data.data
						var map=res.data.data
						var orderAmt=0
						for(let i=0;i<map.length;i++){ 
							for(let j =0;j<map[i].cartInfo.length;j++){
								orderAmt+=map[i].cartInfo[j].amount*map[i].cartInfo[j].price;
							}
						}
						that.payOrderInfo.payAmt=that.toFixed(orderAmt,2)
						that.payOrderInfo.orderAmt=that.toFixed(orderAmt,2);
						that.payOrderInfo.useCard = 0
						that.getCardInfo()
					}
					else{
						alert(res.data.descript)
					}
					Indicator.close('Loading...');
				}
			)
		},
		getCardInfo(){
			var url= this.$store.state.localHostUrl+'/getCardInfo.json' 
			var formData=qs.stringify({openId:this.AddressInfo.openId,mobile:this.AddressInfo.mobile})
			var that=this
			that.$http.post(url,formData,{emulateJSON:true}).then(
				function(res){
					if(!res.data.ret){
						that.CardInfoList=res.data.data;
						that.useCard();
					}
					else{
						alert(res.data.descript)
					}
				}
			)
		},
		toFixed(num, s) {
			var times = Math.pow(10, s)
			var	des = num * times + 0.5
			des = parseInt(des, 10) / times
			return des + ''
		},		
		useCard(){
			this.payOrderInfo.useCard=!this.payOrderInfo.useCard
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
					this.payOrderInfo.payAmt =this.payOrderInfo.orderAmt
					this.CardOffset=0
				}
			}
		},
		chooseOk(){
	      	this.isShow=true

			if(this.retFlag==0){
				console.log(this.payOrderInfo)
				var url= this.$store.state.localHostUrl+'/submitMallOrderInfo.json' 
				let formDate=JSON.stringify(this.payOrderInfo)
				console.log(formDate)
				var that=this
				that.changeOK=false
				 Indicator.open('Loading...');
				that.$http.post(url,formDate,{emulateJSON:true}).then(
					function(res){
						if(!res.data.ret){
							if(that.payOrderInfo.payAmt!=0){//微信支付
								that.weixinPay(res.data)
							}else{
								console.log(that.CardInfoList.restAmt)
								router.push({path:'/EPaySuccess',query:{money:that.payOrderInfo.orderAmt}})
							}
							that.changeOK=true
	      					Indicator.close();
						}else if(res.data.ret=-999){
							that.$toast(res.data.descript)
						}
						else{
							that.$toast(res.data.descript)
							router.push({path:'/OrderList'})

						}
	      				that.isShow=false

					}
				)
			}else if(this.retFlag==-2){
				that.$toast('您还未填写收货地址')
			}
			
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
	              router.push({path:'/EPaySuccess',query:{money:vm.payOrderInfo.payAmt}})
	            }else{
	              	// alert("支付失败,请跳转页面"+res.err_msg);
	              	router.push({path:'/OrderList'})
	                alert("支付失败");
	                // vm.is_loadding=false
	            }
	          }
	        );
	    },
	    Address(){
	    	this.$router.push({path:'addAdress',query:{typeFlag:'2',pathType:'2'}})
	    },
	    inputFn(i,merId){
	    	//console.log(this.$refs.orderMsg[i].value),
	    	let orderMsg=this.$refs.orderMsg[i].value
	    	this.payOrderInfo.receiveMap.set(merId,orderMsg)
	    	console.log(this.payOrderInfo.receiveMap);

	    }
	},
	mounted(){
		this.getRecAdd(),
		this.getCartGood()
		// this.getCardInfo()//获取卡包
	}
}
</script>
<style>
.OFl_header {
    padding: 10px 0 0px 11px;
    background: #fff;
}
	.OFl_header1{
		    height: 50px;
    /* line-height: 25px; */
    background: #fff;
    margin-bottom: 15px;
	}
	.OFl_header1>img{background: #fff;}
	.OFl_header1>.OFl_address{
		display: block;
	    text-align: center;
	    margin-bottom: 4px;
	    padding-top: 10px;
	}
.OFl_header1 .jt_bg {
    top: 11px;
}
	.OrderedFoodList .OFl_address>span:first-child{
		    width: 91%;
    height: 30px;
    /* line-height: 30px; */
    /* margin-top: -28px; */
	}
</style>