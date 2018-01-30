<template>
	<div class="OrderedFoodSuccess">
		<div class="ODS_herder">
			<img src="../../assets/img/pay_icon.png" width="80px;" height="80px">
			<p class="ODS_title">支付成功</p>
		</div>
		<div class="ODS_content">
			<p>{{merchantName}}</p>
			<h1>￥{{money}}</h1>
		</div>
	<!-- 	<div class="wide_btn_blue" @click="closeFn">
			关闭
		</div> -->
	</div>
</template>
<script>
import router from '@/router'
import {setCookie,getCookie} from '../../cookie/cookie.js'
export default{
	name:'OrderedFoodSuccess',
	data(){
		return{
			merchantName:getCookie('merchantName'),
			money:this.$route.query.payAmt
		}
	},
	methods:{
		// closeFn(){
		// 	this.$router.push("/home")
		// }
	}
}
</script>
<style>
	
</style>