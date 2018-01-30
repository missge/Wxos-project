<template>
	<div class="SelectAddress">
		<div class=" shoppingCard_content"  >
	  		<ul>
	  			<li class="mar_top"  v-for="(item,index) in datalist" >
	  					<div class="SeectAddress_lf">
	  							<label class="mint-radiolist-label">
									<span class="mint-radiobox" >
										<input type="radio"  :checked="item.sign==1 "  @click="setAddFn(item.id)" class="mint-radio-input"  name="default_check"> 
										<span class="mint-radio-core" ></span>
									</span>
									 <!-- <span class="mint-checkbox-label organge_fonts">中海通专卖店</span> -->
								</label>
	  					</div>	
						<div class="SeectAddress_rt">
	  						<div class="SelectAddress_title">
	  							<span class="SA_name organge_fonts" >{{item.memName}}</span>
	  							<span class="SA_phone organge_fonts">{{item.phoneNo}}</span>
	  						</div>
	  						<div class="SelectAddress_bot" >
	  							<span class="organge_fonts" v-if="item.sign==1" >[默认地址]</span>
	  							{{item.province}}	{{item.city}}	{{item.area}}	{{item.streetAddress}}
	  						</div>
	  					</div>
	  			</li>
	  			
	  		</ul>
		</div>
		<div class="addAdress_btn" @click="addAdressFn">
			+管理收货地址
		</div>
	</div>
</template>
<script>
	import {setCookie,getCookie} from '../cookie/cookie.js'
	import qs from 'qs'
	import  vue from 'vue'
	import router from '@/router'
	import {Loadmore} from 'mint-ui'
	export default{
		name:'SelectAddress',
		data(){
			return {
				AddressInfo:{
					mobile:getCookie('mobile'),
		 			openId:getCookie('openId'),
		 			receivId:'',
		 			sign:''
				},
				datalist:[],
				change:0,
				pathType:this.$route.query.pathType
			}
		},
		methods:{
			getRecAdd(ID){
				var url = this.$store.state.localHostUrl+'/getRecAddress.json'
				var formData =qs.stringify(this.AddressInfo)
				this.receivId=ID
				var that=this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(res.data.ret==0){
							that.datalist=res.data.data

						}else{
							that.$toast(res.data.descript)
						}
					}
				)
			},
			setAddFn(receivId){
				var url = this.$store.state.localHostUrl+'/getRecAddress.json'
				this.AddressInfo.receivId = receivId
				var formData =qs.stringify(this.AddressInfo)
				var that=this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(res.data.ret==0){
							that.$router.push({path:'/EOrderedFoodList',query:{receivId:that.AddressInfo.receivId}})

						}else{
							that.$toast(res.data.descript)
						}
					}
				)


				

			},
			
			addAdressFn(){
				this.$router.push({path:'/DeliveryAddress',query:{pathType:'2'}})

			},
		},
		mounted(){
			this.getRecAdd()
		}
	}
</script>
<style>

</style>
