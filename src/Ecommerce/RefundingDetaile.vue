<template>
	<div class="RefundOrder">
		<div class="Orderdetail_goods">
			<!-- <div class="ODG_title">待支付</div> -->
<!-- 				<div class="ODG_title" v-show="datalist.status == 0">代付款</div>
				<div class="ODG_title" v-show="datalist.status == 1">待确认</div>
				<div class="ODG_title" v-show="datalist.status == 2">已确认</div>
				<div class="ODG_title" v-show="datalist.status == 3">已收货</div>
				<div class="ODG_title" v-show="datalist.status == 4">已签收</div>
				<div class="ODG_title" v-show="datalist.status == 5">已取消</div> -->
				<div class="ODG_title" v-show="datalist.status == 8 ">退款中
					<div class="RO_returnMoney"  @click="GoGoodsReturn(datalist.status)">
						查看进度 >
					</div>
				</div>
<!-- 				<div class="ODG_title" v-show="datalist.status == 6">订单成功</div>
				<div class="ODG_title" v-show="datalist.status == 7">订单失败</div> -->
				<div class="ODG_title" v-show="datalist.status == 9">退货成功
					<div class="RO_returnMoney"  @click="GoGoodsReturn(datalist.status)">
						查看进度 >
					</div>
				</div>
				<div class="ODG_title" v-show="datalist.status == 11">退款关闭
					<div class="RO_returnMoney"  @click="GoGoodsReturn(datalist.status)">
						查看进度 >
					</div>
				</div>
				<div class="ODG_title" v-show="datalist.status == 12">取消退款
					<div class="RO_returnMoney"  @click="GoGoodsReturn(datalist.status)">
						查看进度 >
					</div>
				</div>


			<div class="RO_header">
				<ul >
					<li class="jt_box" v-if="datalist.status >1">
						<div class="RO_header_lf">
							<img src="./img/RO_icon.png" width="19px" height="17px">
						</div>
						<div class="RO_header_rt">
							<p class="organge_fonts">[{{datalist.waybillNo}}] {{datalist.logistName}}</p>
							<!-- <span class="gray_fonts">10-9 12:00</span> -->
						</div>
						<img class="jt" src="./img/jt.png" width="6px" height="5px">
					</li>
					<li class="jt_box">
						<div class="RO_header_lf">
							<img src="./img/RO_icon1.png" width="16px" height="17px">
						</div>
						<div class="RO_header_rt">
							<p class="width_auto ">{{datalist.memRealName}}</p>
							<span class="width_auto pub_messge">{{datalist.address}}</span>
						</div>
					</li>
					<li class="jt_box">
						<div class="RO_header_lf">
							<img src="./img/RO_icon2.png" width="17px" height="15px">
						</div>
						<div class="RO_header_rt pub_messge">
							<p class="width_auto ">订单留言:{{datalist.leaveWord}}</p>
						</div>
						
					</li>
				</ul>
			</div>

			<div class="ODG_content" >
			  	<div class="OL_tabone">
		  			<div class="OL_title title_bor">
	  					<p class="lf"><i></i>{{datalist.merchantName}}</p>
	  				</div>
			  		<ul >
			  			<li v-for="(items,index) in datalist.orderGoodsRelList">
			  			
			  				<ul>
			  					<li class="OL_fooditem title_bor" > 
			  						<div class="OL_fooditem_lf">
			  							<img class="ml4"  :src="items.goodphoto"/>
			  						</div>
			  						<div class="OL_foodltem_rt">
			  							<span >{{items.goodsName}} <span class="gray_minfont"> {{items.attrvalStr}}</span></span>
			  							<span><img class="ml4" width="10px" height="10px" src="../assets/img/ml4.png"/>
			  							{{items.unitPrice}}	
			  							*{{items.qty}}件</span>
			  						</div>
			  					</li>
			  				</ul>
			  				<div class="mar_top_bot title_bor">
			  					<div class="mar_top_botrt">
			  						<!-- <span class="btn_blue">发表评论</span> -->

			  						<span class="btn_blue"  v-if="items.status==0 " @click="EApplyApplication(index,items.orderId,items.goodsId)">申请退款</span>
			  						<span class="btn_blue" v-if="items.status==1"  @click="EcancelApplication(index,items.orderId,items.goodsId)">取消退款</span>


			  					</div>
			  				</div>
			  			</li>
			  			
			  		</ul>
		<!-- 	  		<div class="mar_top_botrt btn_Light">
			  			<span class="btn_Light_grey	">整单退货</span>
			  		</div> -->
			  	
			  	</div>
		
				<div class="ODG_footer">
					<p>订单号：{{datalist.orderId}}</p>
					<p>下单时间：{{datalist.orderTime}}</p>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
import {setCookie,getCookie} from './../cookie/cookie.js'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
import {Loadmore} from 'mint-ui'
export default{
	name:'RefundingDetaile',
		data(){
			return{
				datalist:[],
				OrderInfo :{
		 			mobile:getCookie('mobile'),
					openId:getCookie('openId'),
	      			orderId:this.$route.query.orderId,
	      			refId:this.$route.query.refId,
	      		},
	      		refId:this.$route.query.refId,
	      	}

		},
		methods:{
			searchOrder(){
	      		var url = this.$store.state.localHostUrl +'/refundOrderDetailsInfo.json'
	      		var data= qs.stringify(this.OrderInfo)
	      		var that = this
	      		that.$http.post(url,data,{emulateJSON:true}).then(
	      			function (res){
	      				if(res.data.ret==0){
	      					console.log(res.data)
	      					that.datalist=res.data.refundOrderDetailsDTOs[0]
	      				}
						else{
							that.$toast(res.data.descript)

						}
	      			}
	      		)
	      	},
	      	EcancelApplication(i,o,g){
	      		console.log(o)
	      		this.OrderInfo.orderId=o
	      		this.OrderInfo.goodsId=g
				var url=this.$store.state.localHostUrl+'/cancelRefundInfo.json'
				var data=qs.stringify(this.OrderInfo)
				var that = this
				that.$http.post(url,data,{emulateJSON:true}).then(
					function(res){
						console.log(res.data)
						if(!res.data.ret){
								// that.searchOrder()

							that.$router.push('/personalcenter')
						}else{
							that.$toast(res.data.descript)
						}
					}
				)
	      	},
	      	EApplyApplication(i,o,g){
	     	  router.push({path: '/ApplyforRefund',query:{"orderId":o,"goodsId":g}})

	      	},
	      	GoGoodsReturn(refuseStatus){
	      		router.push({path: '/GoodsReturn',query:{"refId":this.refId,"orderId":this.$route.query.orderId,refuseStatus:refuseStatus}})
	      	}
	    },

		mounted(){
			this.searchOrder()
		}
	}

</script>
<style>
.Orderdetail_goods>.ODG_title{position: relative;}
.RO_returnMoney{position: absolute;right: 17px;top:0;font-size: 0.7rem;}
	.OL_tabone{background: #fff;}
	.btn_Light{width: 96%;margin:0 auto;border-top:1px solid #D8D8D8;}
	.RO_header{background: #fff;margin-top:8px;}
	.RO_header ul{width: 96%;margin:0 auto;}
	.RO_header ul>li{border-bottom:1px solid #D8D8D8;display: flex;    padding: 15px 0;}
	.RO_header_lf{width: 40px;text-align: center;flex: 0 0 1;}
	.RO_header_lf>img{vertical-align: -webkit-baseline-middle;}
	.RO_header_rt{flex: 1;}
	.RO_header_rt>.organge_fonts{font-size:0.7rem;}
	.RO_header_rt>.gray_fonts{font-size: 0.55rem;}
	.jt_box{position: relative;}
	.jt{position: absolute;right: 15px; transform:translateY(-50%); top:50%;}
	.RO_header_rt .width_auto{border:none;}
	.RO_header .pub_messge{line-height: inherit;}
	.RO_header ul>li:last-child{border:none;}
</style>