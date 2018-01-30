<template>
	<div>
		<ul class="clickPage">
			<li @click="goPage('Ehome')">Ehome---商城主页</li>
			<li @click="goPage('AddAdress')">AddAdress---添加收货人信息</li>
			<li @click="goPage('ApplyforRefund')">ApplyforRefund---退货填写信息</li>
			<li @click="goPage('CategoryPage')">CategoryPage---搜索</li>
			<li @click="goPage('DeliveryAddress')">DeliveryAddress---收货地址</li>
			<li @click="goPage('DetailsPage')">DetailsPage---点商品页面</li>
			<li @click="goPage('EPaySuccess')">EPaySuccess---支付成功</li>
			<li @click="goPage('GoodsReturn')">GoodsReturn---退款审核页面</li>
			<!-- <li @click="goPage('image_file')">image_file---支付成功</li> -->
			<li @click="goPage('MallList')">MallList---列表页</li>
			<li @click="goPage('Physicalorder')">Physicalorder---列表点商品页面</li>
			<li @click="goPage('RefundOrder')">RefundOrder---实物订单详情</li>
			<li @click="goPage('RefundType')">RefundType---支付成功</li>
			<li @click="goPage('SelectAddress')">SelectAddress---选择收货地址（下单时）</li>
			<li @click="goPage('ShoppingCard')">ShoppingCard---购物车</li>
			<li @click="goPage('uploader')">uploader---支付成功</li>
			<li @click="goPage('EOrderedFoodList')">EOrderedFoodList---下订单列表</li>

		</ul>
	</div>
</template>
<script>
	import Vue from 'vue'
	import router from '@/router'
	export default{
		name:'clickPage',
		methods:{
			goPage(page){
				this.$router.push({path:'/'+page})
			}
		}
	}
</script>
<style>
	.clickPage li{
		background: #fff;height: 40px;line-height: 40px;border-bottom:1px solid #ddd;
		margin-bottom:3px;
	}
</style>