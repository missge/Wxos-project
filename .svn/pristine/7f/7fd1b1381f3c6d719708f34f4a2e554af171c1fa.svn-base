<template>
	<div class="RefundOrder">
		<div class="Orderdetail_goods">
			<!-- <div class="ODG_title">待支付</div> -->
				<div class="ODG_title" v-show="datalist.status == 0">待付款</div>
				<div class="ODG_title" v-show="datalist.status == 1">待确认</div>
				<div class="ODG_title" v-show="datalist.status == 2">待发货</div>
				<div class="ODG_title" v-show="datalist.status == 3">待收货</div>
				<div class="ODG_title" v-show="datalist.status == 4">已签收</div>
				<div class="ODG_title" v-show="datalist.status == 5">已取消</div>
				<div class="ODG_title" v-show="datalist.status == 8">退款中
					<!-- <div class="RO_returnMoney" @click="GoGoodsReturn(refId)">
						查看进度 >
					</div> -->
				</div>
				<div class="ODG_title" v-show="datalist.status == 6">订单成功</div>
				<div class="ODG_title" v-show="datalist.status == 7">订单失败</div>
				<div class="ODG_title" v-show="datalist.status == 9">退货成功</div>
			<div class="RO_header">
				<ul >
					<li class="jt_box" v-if="datalist.status>=3&&datalist.status!=7">
						<div class="RO_header_lf">
							<img src="./img/RO_icon.png" width="19px" height="17px">
						</div>
						<div class="RO_header_rt" @click="querybillNo(datalist.waybillNo)">
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
							<p class="width_auto ">{{datalist.memRealName}}   {{datalist.contactTele}} </p>
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
			  		<ul>
			  				<div class="OL_title title_bor">
			  					<p class="lf"><i></i>{{datalist.merchantName}}</p>
			  				</div>
			  			<li v-for="(items,index) in datalist.orderGoodsRelList">
			  				<ul>
			  					<li class="OL_fooditem title_bor" > 
			  						<div class="OL_fooditem_lf">
			  							<img class="ml4"  :src="items.goodphoto"/>
			  						</div>
			  						<div class="OL_foodltem_rt">
			  							<span >{{items.goodsName}}	 <span class="gray_minfont">{{items.attrvalStr}}</span></span>
			  							<span><img class="ml4" width="10px" height="10px" src="../assets/img/ml4.png"/>{{items.unitPrice}} <br/>{{items.qty}}件</span>
			  						</div>
			  					</li>
			  				</ul>
			  				<div class="mar_top_bot title_bor">
			  					<div class="mar_top_botrt">

			  						<span v-if="items.status==1" class="blue_font">退款中</span>
			  						<span  v-if="items.status==9" class="blue_font">退款完成</span>


			  						<span class="btn_blue"  v-if="items.status==0 && (datalist.status==1 || datalist.status==2 ||datalist.status==3 ||datalist.status==4)" @click="EApplyApplication(index,items.orderId,items.goodsId,items.attrvalId)">申请退款</span>
			  						<span class="btn_blue" v-if="items.status==1"  @click="EcancelApplication(index,items.orderId,items.goodsId,items.attrvalId)">取消退款</span>

			  					</div>
			  				</div>
			  			</li>
			  			
			  		</ul>
		<!-- 	  		<div class="mar_top_botrt btn_Light">
			  			<span class="btn_Light_grey	">整单退货</span>
			  		</div> -->
			  	</div>
			  	<ul class="ODG_list">
					<li >
						<mt-cell title="商品总价" >
							<span><img class="ml4" width="10px" height="10px" src="../assets/img/ml4.png"/>{{datalist.orderAmt}}</span>
						</mt-cell>
					</li>
					<li>
						<mt-cell title="运费" >
							<span>+<img class="ml4" width="10px" height="10px" src="../assets/img/ml4.png"/>0.00</span>
						</mt-cell>
					</li>
			<!-- 		<li>
						<mt-cell title="卡包抵扣" >
							<span>-<img class="ml4" width="10px" height="10px" src="../assets/img/ml4.png"/>
							{{datalist.cardPaidAmt}}</span>
						</mt-cell>
					</li> -->
				<!-- 	<li>
						<mt-cell title="参与的活动" ></mt-cell>
					</li> -->
					<li class="ODG_payment">
						<div >实付款: <span class="blue_font"><img class="ml4" width="10px" height="10px" src="../assets/img/ml4.png"/>{{datalist.orderAmt}}</span> </div>
					</li>
				</ul>
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
	name:'RefundOrder',
		data(){
			return{
				datalist:[],
				OrderInfo :{
		 			mallId:getCookie('mallId'),
	      			orderId:this.$route.query.orderId
	      		},
	      		EorderInfo: {
	      			orderId:'',
	      			goodsId:'' ,
	      			attrvalId:''
	      		},
	      		refId:''
	      	}

		},
		methods:{
			searchOrder(){
	      		var url = this.$store.state.localHostUrl +'/orderDetailsInfo.json'
	      		var data= qs.stringify(this.OrderInfo)
	      		var that = this
	      		that.$http.post(url,data,{emulateJSON:true}).then(
	      			function (res){
	      				if(!res.data.ret){
	      					that.datalist=res.data.data[0]	
	      					console.log(res.data.data)

	      					that.refId=res.data.data[0].orderGoodsRelList[0].refId
	      		

	      				}
						else{
							that.$toast(res.data.descript)

						}
	      			}
	      		)
	      	},
	      	EcancelApplication(i,o,g,attrvalId){
	      		console.log(g)
	      		this.EorderInfo.orderId=o
	      		this.EorderInfo.goodsId=g
	      		this.EorderInfo.attrvalId=attrvalId
				var url=this.$store.state.localHostUrl+'/cancelRefundInfo.json'
				var data=qs.stringify(this.EorderInfo)
				var that = this
				that.$http.post(url,data,{emulateJSON:true}).then(
					function(res){
						console.log(res.data)
						if(!res.data.ret){
								that.searchOrder()
						}else{
							that.$toast(res.data.descript)
						}
					}
				)
	      	},
	      	EApplyApplication(i,o,g,attrvalId){
	     	  router.push({path: '/ApplyforRefund',query:{"orderId":o,"goodsId":g,"attrvalId":attrvalId}})

	      	},
	      	GoGoodsReturn(refId){
	      		router.push({path: '/GoodsReturn',query:{"refId":refId,"orderId":this.$route.query.orderId}})
	      	},
	      	querybillNo(No){
	      		window.location.href='https://m.kuaidi100.com/result.jsp?&nu='+No
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
	.RefundOrder .mar_top_botrt{border-bottom:1px solid #ddd;}
		.RefundOrder .mar_top_botrt .blue_font{padding-right: 5px;}
</style>