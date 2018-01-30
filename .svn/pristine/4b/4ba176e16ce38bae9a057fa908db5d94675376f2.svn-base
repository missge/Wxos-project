<template>
	<div class="noCard">
		<div class="NC_img">
			<img src="../../assets/img/timg.png" width="80px" height="80px">
		</div>
		<div class="Nc_bot">
			抱歉,
			<span v-if="flag==-1">参数错误!</span>
			<span v-if="flag== -2">该订单购买人信息有误！</span>
			<span v-if="flag== -3">您没有权限，无权操作！</span>
			<span v-if="flag== -4">订单不存在!</span>
			<span v-if="flag== -5">此订单正在退货中，不可取餐!</span>
			<span v-if="flag== 0">您当前未开通饭卡</span>
			<span v-if="flag== -6">注册失败，此卡已注册！</span>
			<span v-if="flag== -7">此订单不可取餐！请用户于个人中心确认是否是待收货状态</span>
			
			<!-- <a :href="'tel:'+telephone">{{telephone}}</a> -->
			<p class="min_font">如有疑问，请在公众号内与客服进行联系。</p>
		</div>
	</div>
</template>
<script>
	import router from '@/router'
	export default{
		name:"noCard",
		data(){
			return{
				telephone:'021-12345678',
				flag:this.$route.query.flag
			}
		}
	}
</script>
<style>
	
</style>