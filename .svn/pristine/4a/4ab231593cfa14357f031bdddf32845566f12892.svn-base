<template>
	<div class="Orderdetail_goods"  >
			<div class="ODG_title" v-show="datalist.status == 0">待支付</div>
			<div class="ODG_title" v-show="datalist.status == 1">待收货</div>
			<div class="ODG_title" v-show="datalist.status == 6">已取餐</div>
			<div class="ODG_title" v-show="datalist.status == 8">退款中</div>
			<div class="ODG_title" v-show="datalist.status == 5">已取消</div>
			<div class="ODG_title" v-show="datalist.status == 9">退货成功</div>
		<div class="ODG_content" >
			<div class="ODP_header">
				<img v-show="datalist.status == 6"  src="./img/pay_ok.png" width="100px" height="100px">
				<p v-show="datalist.status == 6" class="ODP_title">已取餐</p>
				<div class="ODP_code_content" v-show="datalist.status == 1 " >
					<div class="ODP_code">
						<!-- <img src="./img/code.png" width="115px" height="115px"> -->
						<canvas class="opcs-qrcode-content" id="qrcode"></canvas>
					</div>
					<div class="ODP_code_title">
						支付成功
					</div>
					<div class="ODP_code_prompt">
						请于{{datalist.getOrderTime}}持二维码到餐厅扫码取餐
					</div>
				</div>
				<div class="pub_messge">
					<p class="width_auto"><i></i>订单留言:</p>
					<div class="pub_ly">{{datalist.orderMsg}}</div>
				</div>
			</div>
		  	<div class="OL_tabone">
		  		<ul>
		  			<li class="mar_top">
		  				<div class="OL_title title_bor">
		  					<p class="lf"><i></i>{{datalist.merchantName}}</p>
		  				</div>
		  				<ul>
		  					<li class="OL_fooditem title_bor" v-for="(items,index) in datalist.orderGoodsRelList"> 
		  						<div class="OL_fooditem_lf">
		  							<img  :src="items.goodphoto" >
		  						</div>
		  						<div class="OL_foodltem_rt">
		  							<span >{{items.goodsName}}</span>
		  							<span><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{items.unitPrice}} 
		  							<br>{{items.qty}}件</span>
		  						</div>
		  					</li>
		  				</ul>

		  				<div class="mar_top_bot title_bor">
		  					<div class="mar_top_botrt">
		  						<!-- <span class="btn_blue">发表评论</span> -->
		  						<span class="btn_gray" v-if="datalist.status==1&&datalist.retGoodsFlag==1" @click="returnFoods">申请退款</span>
		  						<span class="btn_gray" v-if="datalist.status==8" @click="cancelApplication">取消退款</span>
		  					</div>
		  				</div>
		  			</li>
		  		</ul>
		  	</div>
		  	<ul class="ODG_list">
				<li>
					<mt-cell title="商品总价" >
						<span><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{datalist.orderAmt}}</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="运费" >
						<span>+<img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>0.00</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="卡包抵扣" >
						<span>-<img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{datalist.cardPaidAmt}}</span>
					</mt-cell>
				</li>
				<li>
					<mt-cell title="参与的活动" ></mt-cell>
				</li>
				<li class="ODG_payment">
					<div >实付款: <span class="blue_font"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{datalist.payAmt}}</span> </div>
				</li>
			</ul>
			<div class="ODG_footer">
				<p>订单号：{{datalist.orderId}}</p>
				<p>下单时间：{{datalist.orderTime}}</p>
			</div>
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
import {Loadmore} from 'mint-ui'
export default{
	name:'Orderdeail_goods',
	data(){
		return {
      		datalist:[],
      		OrderInfo :{
	 			mobile:getCookie('mobile'),
	 			openId:getCookie('openId'),
      			orderId:this.$route.query.orderId,
      			inStatus:'',
      		},
      		code:{
      			mobile:getCookie('mobile'),
	 			openId:getCookie('openId'),
	 			merId:getCookie('merId'),
	 			mallId:getCookie('mallId'),
	 			orderId:this.$route.query.orderId,

      		}
		}
	},
	methods:{
		cancelApplication(){
			var url=this.$store.state.localHostUrl+'/cancelReturnFoods.json'
			var data=qs.stringify(this.code)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
				function(res){
					console.log(res.data)
					if(!res.data.ret){
						that.$toast(res.data.descript)
						that.searchOrder();
					}else{
						that.$toast(res.data.descript)
					}
				}
			)
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
       	useqrcode(){
	        var str = this.OrderInfo.orderId
	 	 	var qrcode = document.getElementById('qrcode')
	        // var url = encodeURI('http://wcy.dealreal.com.cn/goInitPage.json?mallId='+this.OrderInfo.orderId)

	        var data=this.$store.state.localHostUrl+'/checkQRCodeInfo.json?'+'mobile='+ this.code.mobile +'&openId='+ this.code.openId +'&merId='+ this.code.merId +'&orderId='+ this.code.orderId +'&mallId='+this.code.mallId
	
	        var url = encodeURI(data)

	        // var url = encodeURI('http://www.baidu.com')
	    
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
      	searchOrder(){
      		var url = this.$store.state.localHostUrl +'/searchOrderInfo.json'
      		var data= qs.stringify(this.OrderInfo)
      		var that = this
      		that.$http.post(url,data,{emulateJSON:true}).then(
      			function (res){
      				if(!res.data.ret){
      					console.log(res.data)		
      					that.datalist=res.data.data[0]	
      				}
					else{
						that.$toast(res.data.descript)

					}
      			}
      		)
      	},
      	returnFoods(){
  			var url = this.$store.state.localHostUrl+'/returnFoods.json'
      		var data= qs.stringify(this.OrderInfo)
      		var that = this
      		that.$http.post(url,data,{emulateJSON:true}).then(
      			function (res){
      				if(!res.data.ret){
      					console.log(res.data)		
      					that.searchOrder()
      					that.$toast("申请退货成功，请等待商家确认")
      				}
					else{
						that.$toast(res.data.descript)
					}
      			}
      		)

      	}
	},
	mounted(){
      this.useqrcode();
      this.searchOrder()
    }
}
</script>
<style >

</style>