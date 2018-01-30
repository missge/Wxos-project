<template>
	<div>
		<textarea  v-model="orderMeg" rows="10" cols="30"></textarea>
		<div @click="successFn">完成</div>
	</div>
</template>
<script>
import router from '@/router'
		export default{
			name:'orderMessage',
			data(){
				return {
					orderMeg:this.orderMeg
				}
			},
			methods:{
				successFn(){
					console.log(this.orderMeg)
					router.push({path:'/OrderedFoodList',query:{orderMeg:this.orderMeg}})
				}
			}
		}
</script>
<style>
	
</style>