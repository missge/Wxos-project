<template>
	<div class="DeliveryAddress">
		<ul class="shoppingCard_content"  >
	  		<li v-for="(item,index) in datalist">
	  			<ul class="DA_list">
		  			<li class="mar_top max_width" >
		  					<div>
		  						<img src="./img/RO_icon1.png" class="DA_addressimg" width="22px" height="19px">
		  					</div>	
							<div class="SeectAddress_rt">
		  						<div class="SelectAddress_title">
		  							<span class="SA_name organge_fonts">{{item.memName}}</span>
		  							<span class="SA_phone organge_fonts">{{item.phoneNo}}</span>
		  						</div>
		  						<div class="SelectAddress_bot">
		  							{{item.province}}	{{item.city}}	{{item.area}}	{{item.streetAddress}}
		  						</div>
		  					</div>
		  			</li>
		  			
		  		</ul>
		  		<div class="DeliveryAddress_footer flex max_width">
		  			<div class=" flex_lf">
		  					<label class="mint-checklist-label" >
								<span class="mint-radiobox" >
									<input type="radio"  :checked="item.sign==1 " class="mint-radio-input" value="" name="default_check" @click="public_check(0,item.id)"> 
									<span class="mint-radio-core" ></span>
								</span>
								 <span class="mint-checkbox-label organge_fonts"  v-if="item.sign==1">设置默认地址</span>
							</label>
		  			</div>
		  			<div class=" flex_rt flex">
		  				<p class="flex_rt organge_fonts" @click="updataAdd(item.id)">
		  					<img src="./img/change.png" width="21px" height="21px">
		  					修改
		  				</p>
		  				<p class="flex_center gray_font"  @click="public_check(1,item.id)" v-if="item.sign!=1">
		  					<img src="./img/change_d.png" width="21px" height="21px">
		  					删除
		  				</p>
		  			</div>
		  		</div>
	  		</li>
	  		
		</ul>
		<div class="addAdress_btn" @click="addAdressFn">
			+添加收货地址
		</div>
	</div>
</template>
<script>
	import {setCookie,getCookie} from '../cookie/cookie.js'
	import qs from 'qs'
	import  vue from 'vue'
	import router from '@/router'
	import {Indicator,Badge,Loadmore,MessageBox} from 'mint-ui';
	export default{
		name:'DeliveryAddress',
		data(){
			return {
				AddressInfo:{
					mobile:getCookie('mobile'),
		 			openId:getCookie('openId'),
		 			sign:'',
		 			receivId:'',
		 			status:''
				},
				datalist:[],
				change:0,
				pathType:this.$route.query.pathType
			}
		},
		methods:{
			getRecAdd(){
				Indicator.open('Loading...');
				var formData =qs.stringify(this.AddressInfo)
				var url = this.$store.state.localHostUrl+'/getRecAddress.json'
				var that=this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(res.data.ret==0){
							that.datalist=res.data.data

							console.log(res.data.data)
						}else{
							that.$toast(res.data.descript)
						}
						Indicator.close('Loading...');

					}
				)
			},
			public_check(num,recId){
				var url = this.$store.state.localHostUrl+'/updateRecAddress.json'
	 			 if(num==1){
	 				this.AddressInfo.receivId=recId
	 				this.AddressInfo.status=9
	 				MessageBox.confirm('', {
		                message: '确定删除吗？',
		                title: '提示',
		                confirmButtonText: '确认',
		                cancelButtonText: '取消'
		            }).then(action => {
	 					var formData =qs.stringify(this.AddressInfo)
						var that=this
						console.log(formData)
						that.$http.post(url,formData,{emulateJSON:true}).then(
							function(res){
								if(res.data.ret==0){
									if(num==0){
										that.$toast("设置默认地址成功")	
				 						that.AddressInfo.sign=''
									}else if(num==1){
										that.$toast("删除成功")	
										that.AddressInfo.status=''
									}
										that.AddressInfo.receivId=''
										that.getRecAdd()
								}else{
									that.$toast(res.data.descript)
								}
								
							}
						)

			        }).catch(err => {
		                if (err == '取消') {
		                    return false;
		                }
		            });
				}else{
					this.AddressInfo.receivId=recId
	 				this.AddressInfo.sign=1
	 				var formData =qs.stringify(this.AddressInfo)
					var that=this
					console.log(formData)
					that.$http.post(url,formData,{emulateJSON:true}).then(
						function(res){
							if(res.data.ret==0){
								if(num==0){
									that.$toast("设置默认地址成功")	
			 						that.AddressInfo.sign=''
								}else if(num==1){
								    that.$toast("删除成功")	
									that.AddressInfo.status=''
								}
									that.AddressInfo.receivId=''
									that.getRecAdd()
							}else{
								that.$toast(res.data.descript)
							}
							
						}
					)
				}
	 		
			},
			updataAdd(receivId){
				this.$router.push({path:'/addAdress',query:{receivId:receivId,typeFlag:1,pathType:this.pathType}})
			},
			addAdressFn(){
				this.$router.push({path:'/addAdress',query:{typeFlag:2,pathType:this.pathType}})
			},

		},
		mounted(){
			this.getRecAdd()
		}
	}
</script>
<style>
	.DA_addressimg{padding-top:15px;padding-right: 3px;}
	.DA_list>.mar_top{border-bottom: 1px solid #D8D8D8;background: none;}
	.shoppingCard_content{margin-bottom:40px;}
	.DeliveryAddress .shoppingCard_content>li{background:#fff; }
	.DeliveryAddress .mint-checkbox-label{margin-left: 0px;}
	.DeliveryAddress_footer{padding-bottom: 14px;}
	.DeliveryAddress_footer p.flex_rt img,.DeliveryAddress_footer p.flex_center img{    vertical-align: text-bottom;}

</style>