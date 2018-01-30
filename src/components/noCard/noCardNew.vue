<template>
	<div class="noCard">
		<div class="NC_img">
			<img src="../../assets/img/NoCard.png" width="80px" height="80px">
		</div>
		<div class="Nc_bot">
			抱歉,
			<span>
				您当前未开通任何卡！
			</span>
			<p class="min_font">如您已开通卡，请<i class="yellowColor" @click="syncUserInfo">更新资料></i></p>
		</div>
	</div>
</template>
<script>
import router from '@/router'
import Vue from 'vue'
import qs from 'qs'
import {setCookie,getCookie} from '../../cookie/cookie.js'
	export default{
		name:"noCard",
		data(){
			return{
				telephone:'021-12345678',
				flag:this.$route.query.flag,
				PayRecord :{
		 			mobile:getCookie('mobile'),
	      		}
			}
		},
		methods:{
			syncUserInfo(){
				var url= this.$store.state.localHostUrl+'/syncUserInfo.json' 
				var formData=qs.stringify(this.PayRecord)
				var that=this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(!res.data.ret){
							that.$toast("更新资料成功")
						}
						else{
							that.$toast(res.data.descript)
						}
					}
				)
			},
		}
	}
</script>
<style>
.yellowColor{
	color: #FF6600;
    font-size: 0.75rem;
    text-decoration: underline;
    /* font-weight: inherit; */
    font-style: initial;
}
</style>