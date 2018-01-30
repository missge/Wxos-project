<template>
	<div class="OrderList">
		<div class="OL_tab">
			<div class="navbar">
				<li  @click="navbarFn('',1)" :class="{'navbar_on' : tabClick === ''}">全部</li>
				<li  @click="navbarFn(0,1)" :class="{'navbar_on' : tabClick === 0}">待支付</li>
				<li  @click="navbarFn(1,1)" :class="{'navbar_on' : tabClick === 1}">待收货</li>
				<li  @click="navbarFn(8,1)" :class="{'navbar_on' : tabClick === 8}">待退款</li>
			</div>
		</div>
		<div class="OL_content" >
		  	<div class="OL_tabone"  v-for="(items,index) in datalist" >
		  		<ul>
		  			<li class="mar_top" >
		  				<div class="OL_title title_bor">
		  					<p class="lf"><i></i>{{items.merchantName}}</p>
		  					<h6 class="rt" v-show="items.status==0">待支付</h6>
		  					<h6 class="rt" v-show="items.status==1">待收货</h6>
		  					<h6 class="rt" v-show="items.status==8">待退款</h6>
		  					<h6 class="rt" v-show="items.status==6">已取餐</h6>
		  					<h6 class="rt" v-show="items.status==5">已取消</h6>
		  					<h6 class="rt" v-show="items.status==9">退货成功</h6>
		  				</div>
		  				<ul>
		  					<li  class="OL_fooditem title_bor" v-for="(item,index) in items.orderGoodsRelList" > 		
		  						<div class="OL_fooditem_lf">
		  							<img  :src="item.goodphoto"  >
		  						</div>
		  						<div class="OL_foodltem_rt">
		  							<span >{{item.goodsName}}</span>
		  							<span><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{item.unitPrice}}<br/>{{item.qty}}件</span>
		  						</div>
		  					</li>
		  				</ul>

		  				<div class="mar_top_bot title_bor">
		  					<div class="mar_top_botlf">
		  						<span>总额:<img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{items.orderAmt}}</span>
		  						<span>实付:<img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{items.payAmt}}</span>
		  					</div>
		  					<div class="mar_top_botrt" v-if="items.orderFlag==0">
		  							<span class="btn_blue" v-show="items.status==1" @click="showCodeFn(index,items.orderId)">取餐码</span>
		  							<span class="btn_blue" v-show="items.status==0" @click="payFn(index,items.orderId)">支付</span>
			  						<span class="btn_blue" v-show="items.status==8" @click="cancelApplication(index,items.orderId)">取消退款</span>
			  						<span class="btn_gray" @click="go_OrderdetailFn(items.orderId)">详情</span>
		  					</div>
		  				</div>
		  			</li>
		  		</ul>

		  	</div>
		</div>
		<div class="model" v-show="clicked" @click="hideCodeFn">
			<div class="show_code_box">
				<div class="show_code">
					<canvas class="opcs-qrcode-content" id="qrcode"></canvas>
				</div>
				<p>由餐厅扫码进行取餐</p>
				<div class="show_code_bot" @click="hideCodeFn">
					我知道了
				</div>
			</div>
		</div>
<!-- 		<div class="nowloading" v-show="is_loadding">
			<img src="../../assets/img/nowloading.gif">
		</div> -->
		<div class="NothindMore" v-if="datalist.length==0">
			<img src="../../assets/img/timg.png" width="80px" height="80px">
			<p class="Nc_bot">抱歉，什么都没有</p>
		</div>
	</div>
</template>
<script>
import {setCookie,getCookie} from '../../cookie/cookie.js'
var JsBarcode = require('jsbarcode')
import qs from 'qs'
import Vue from 'vue'
import QRCode from 'qrcode'
Vue.use(QRCode)
import router from '@/router'
import { Indicator } from 'mint-ui';
export default{
	name:'OrderList',
	data(){
		return {
			clicked:false,
			datalist:[],
			tabClick:'',
      		OrderInfo :{
	 			mobile:getCookie('mobile'),
	 			openId:getCookie('openId'),
      			orderId:'',
      			status:'' ,
      			mallId:getCookie('mallId')
      		},
      		merId:getCookie('merId'),
      		orderId:''
      		// is_loadding:true
		}
	},
	 computed: {
	
    },
	methods:{
		showCodeFn(I,str){
			this.clicked = true;
			console.log(I)
				console.log(str)
				this.useqrcode(str)
		},
		hideCodeFn(){
			this.clicked =false
		},
		go_OrderdetailFn(str){
			router.push({path:'/Orderdetail_goods',query:{orderId:str}})
		},
		utf16to8(str) {
	        var out, i, len, c;
	        out = "";
	        len = str.length;
	        for(i = 0; i < len; i++) {
	          c = str.charCodeAt(i);
	          if ((c >= 0x0001) && (c <= 0x007F)) {
	              out += str.charAt(i);
	          } else if (c > 0x07FF) {
	              out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	              out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
	              out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	          } else {
	              out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
	              out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	          }
	        }
	        return out;
     	},
       	useqrcode(str){
	        var str = str
	 	 	var qrcode = document.getElementById('qrcode')
	        var data=this.$store.state.localHostUrl+'/checkQRCodeInfo.json?'+'mobile='+ this.OrderInfo.mobile +'&openId='+ this.OrderInfo.openId +'&merId='+ this.merId +'&orderId='+ str+'&mallId='+this.OrderInfo.mallId
	
	        var url = encodeURI(data)
	        console.log(url)
	        QRCode.toCanvas(
	          qrcode, url,
	          function (error) {
	            if (error) {
	              console.error(error)
	            }else{
	              console.log('success!');
	            }
	          }
	        )
      	},
      	// 查看订单信息
      	searchOrder(num,type){
      		Indicator.open('Loading...');
      		if(this.$route.query.mark==0){
      			this.tabClick=this.$route.query.status
      		}else{
      			this.tabClick=''
      		}
      		if(type==1){
      			this.OrderInfo.status=num
	      	}else{
				this.OrderInfo.status=this.$route.query.status
	      	}

      		this.OrderInfo.orderId=''
      		// var url = this.$store.state.localHostUrl +'/searchOrderInfo.json'
      		var url = this.$store.state.localHostUrl +'/orderInfo.json'

      		var data= qs.stringify(this.OrderInfo)
      		var that = this
			that.is_loadding=true
      		that.$http.post(url,data,{emulateJSON:true}).then(
      			function (res){
      				if(!res.data.ret){
      						Indicator.close();
      					that.datalist=res.data.data
      					// that.OrderInfo.orderId=res.data.data[0].orderId

      				}
					else{
						Indicator.close();
						alert(res.data.descript)

					}
      			}
      		)
      	},
      	navbarFn(num,type){
      		// this.is_loadding=true
      		this.searchOrder(num,type)
  		     this.OrderInfo.status = num
 			 this.tabClick = num
      	},
      	payFn(i,o){
			// this.is_loadding=true
			Indicator.open('Loading...');
      		this.OrderInfo.orderId=o
			var url=this.$store.state.localHostUrl+'/pay.json'
			var data=qs.stringify(this.OrderInfo)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
				function(res){
					that.orderId=res.data.orderId
					console.log(that.OrderInfo.orderId)
					if(!res.data.ret){
						if(res.data.flag==1){
							that.weixinPay(res.data)
						}
						that.searchOrder();

					}else{
						alert(res.data.descript)
					}
				}
			)
      	},
      	cancelApplication(i,o){
      		this.OrderInfo.orderId=o
			var url=this.$store.state.localHostUrl+'/cancelReturnFoods.json'
			var data=qs.stringify(this.OrderInfo)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
				function(res){
					console.log(res.data)
					if(!res.data.ret){
						alert(res.data.descript)
						that.searchOrder();
					}else{
						alert(res.data.descript)
					}
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
	            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠
	            if(res.err_msg == "get_brand_wcpay_request:ok" ){
	              router.push({path:'/Orderdetail_goods',query:{orderId:vm.orderId}})
	            }else{
	              // alert("支付失败,请跳转页面"+res.err_msg);
	               alert("支付失败");

	            }
	          }
	        );
	    },
	  	sortNumber(a,b) {
            return a - b
        },
       
	},
	mounted(){
      this.useqrcode();
      this.searchOrder();
    },
   

}
</script>
<style>
/*.OrderList{position: relative;}*/



.navbar{height: 38px;display: flex;color:#7e8c8d}
.navbar li{font-size:0.7rem;justify-content: center;align-items: center;flex:1;text-align: center;line-height: 38px;}
.navbar_on{color: #F08632;background: #fff;border-bottom:3px solid #F08632;}
/*全部代码*/
	.OL_tab>.mint-navbar{
		background: #EEEEEE;
	}
	.OL_tab .mint-navbar .mint-tab-item{
		padding:13px 0;
	}
	.OL_tab .is-selected{
		background: #fff;
	}
	
/*全部代码结束*/

.show_code_box{
    top: 50%;
    left: 50%;
    position: absolute;
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
    background: #fff;
    height: 273px;
    width: 254px;
}
.show_code{
	/*width: 135px;
	height: 135px;*/
	text-align: center;
	margin:0 auto;
	/*padding:20px 0 10px 0; */
}
.show_code_box>p{
	font-size: 13px;
	text-align: center;
	margin-bottom: 18px;
	color:#434343;
}
.show_code_bot{
	position: absolute;
	bottom: 0;
	height: 40px;
	line-height: 40px;
	text-align: center;
	background: #F08632;
	color:#fff;
	width: 100%;
}
  .opcs-qrcode-content{
   width: 80% !important;
    height: 76% !important;
  }
.OL_fooditem_lf{

}
</style>