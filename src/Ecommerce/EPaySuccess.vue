<template>
	<div class="OrderedFoodSuccess">
		<div class="ODS_herder">
			<img src="../assets/img/pay_icon.png" width="80px;" height="80px">
			<p class="ODS_title">支付成功</p>
		</div>
		<div class="ODS_content">
			<h1><img src="../assets/img/black_ml.png" width="18px" height="23px">{{money}}</h1>
		</div>
		<div class=" EpaySuccess_footer flex">
			<div class="wide_btn_blue flex_center"  @click="goOrderList">
				查看我的订单
			</div>
			<div class="wide_btn_gray flex_center" @click="goHome">
				返回首页
			</div>
		</div>
	
	</div>
</template>
<script>
import Vue from 'vue'
import qs from 'qs'
import router from '@/router'
export default{
	name:'EOrderedFoodList',
	data(){
		return{
			money:this.$route.query.money
		}
	},
	methods:{
		goOrderList(){
			router.push({path:'/OrderList'})
		},
		goHome(){
			router.push({path:'/Ehome'})

		},
	}

	
}

</script>
<style>
.EpaySuccess_footer{width: 80%;margin: 0 auto;}
.EpaySuccess_footer .wide_btn_blue{margin-right: 10px;}
.EpaySuccess_footer .wide_btn_gray{margin-left: 10px;}

</style>