<template>
	<div class="noCard">
		<div class="NC_img">
			<img src="../../assets/img/timg.png" width="80px" height="80px">
		</div>
		<div class="Nc_bot">
			<span v-if="flag==0">
				抱歉,您暂无权限访问该页面!
			</span>
			<span v-if="flag==1">
				哎呀，出错了，请稍后重试！
			</span>
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
	.noCard{
		width: 80%;
		margin:2rem auto;
		text-align: center;
	}
	.NC_img{
		margin-bottom: 2rem
	}

	.min_font{
		font-size: 15px;
		color:#666666;

	}
</style>