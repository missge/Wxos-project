<template>
	<div class="AddAdress">
		<div class="ChangePhone">
			<mt-field label="收货人" placeholder="请输入收货人" type="test" v-model="userInfo.memName" ></mt-field>
			<mt-field label="联系电话" placeholder="请输入联系电话" :attr="{ maxlength: 11 }" type="tel" v-model="userInfo.memTel"></mt-field>
			<div class="mint-cell"  @click="check">
				<span class="mint-cell-mask"></span>
				 <div class="mint-cell-left"></div> 
				 	<div class="mint-cell-wrapper">
				 		<div class="mint-cell-title">
				 			 <span class="mint-cell-text">所在地区</span> 
				 		</div>
					 	<div class="mint-cell-value is-link">
					 		{{userInfo.province}}	{{userInfo.city}}	{{userInfo.area}}	
						</div>
				</div>
				 <div class="mint-cell-right"></div>
				  <i class="mint-cell-allow-right"></i>
			</div>
			<mt-field  class="AddAdress_textarea" placeholder="请填写详细地址，不少于5个字" type="textarea" rows="4" v-model="userInfo.streetAddress"></mt-field>
			<mt-field label="设为默认地址" class="AddAdress_switch" >
					<mt-switch v-model="userInfo.sign"  @change="switchFn"></mt-switch>
			</mt-field>
		</div>
		<div class="home_pay SP_btn" @click="saveFn">
			保存
		</div>
		<div class="model" v-show="model_check"  @click="check">
			<div class="mint-popup mint-datetime mint-popup-bottom">
				<div class="picker mint-datetime-picker">
				 	<div class="picker-toolbar">
					 	<span class="mint-datetime-action mint-datetime-cancel">取消</span>
					 	 <span class="mint-datetime-action mint-datetime-confirm">确定</span>
					 </div> 
					<div class="White_font">滑动选择收货地址：</div>

					<mt-picker cancelText="取消"   :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
				 <!-- <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p> -->
					<!-- <mt-picker cancelText="取消"   :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker> -->
				</div>
			</div>
		</div>
	
	</div>
</template>
<script>
	import {setCookie,getCookie} from '../cookie/cookie.js'
	import router from '@/router'
	import qs from 'qs'
	import myaddress from '../assets/address3.json'
	import {Loadmore} from 'mint-ui';
	export default{
		name:'AddAdress',
		data(){
			return {
				model_check:false,
				typeFlag:this.$route.query.typeFlag,
				AddressInfo:{
					mobile:getCookie('mobile'),
		 			openId:getCookie('openId'),
		 			receivId:this.$route.query.receivId
				},
				userInfo:{
					mobile:getCookie('mobile'),
					openId:getCookie('openId'),
					receivId:this.$route.query.receivId,
					province:'省',
					city:'市',
					area:'区/县',
					streetAddress:'',
					memName:'',
					memTel:'',
					sign:true
				},
				pickerVisible:{
					value:1,
				},
				value:true,
				introduction:'',
				myAddressSlots:
				 [  
					{
			            flex: 1,
			            defaultIndex: 1,    
			            values: Object.keys(myaddress),  
			            className: 'slot1',
			            textAlign: 'center'
			          }, {
			            divider: true,
			            content: '-',
			            className: 'slot2'
			          }, {
			            flex: 1,
			            values: [],
			            className: 'slot3',
			            textAlign: 'center'
			          },
			          {
			            divider: true,
			            content: '-',
			            className: 'slot4'
			          },
			          {
			            flex: 1,
			            values: [],
			            className: 'slot5',
			            textAlign: 'center'
					}
				],
		        myAddressProvince:'省',
		        myAddressCity:'市',
		        myAddresscounty:'区/县',
				pathType:this.$route.query.pathType
			}
		},
		methods:{
			// stop(){
		 //  	  	let mo=function(e){e.preventDefault()}
			// 	document.body.style.overflow='hidden';
	  // 			document.addEventListener("touchmove",mo,false);//禁止页面滑动
			// },
			// move(){
		 //  	   let mo=function(e){e.preventDefault()}
			//     document.body.style.overflow='';//出现滚动条
			//     document.removeEventListener("touchmove",mo,false);
			// },
			onMyAddressChange(picker, values) {
				// if(this.model_check==false){
				// 	this.move();
				// }else{
				// 	this.stop();
				// }
		       if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
		          picker.setSlotValues(1,Object.keys(myaddress[values[0]]))// Object.keys()会返回一个数组，当前省的数组
		          picker.setSlotValues(2,myaddress[values[0]][values[1]])// 区/县数据就是一个数组
		          // this.myAddressProvince = values[0]
		          // this.myAddressCity = values[1]
		          // this.myAddresscounty = values[2]
		          this.userInfo.province = values[0]
		          this.userInfo.city = values[1]
		          this.userInfo.area = values[2]
		          console.log( this.userInfo.province)
		        }
		     },
		     getRecAdd(){
		     	if(this.typeFlag==1){
		     		var formData =qs.stringify(this.AddressInfo)
					var url = this.$store.state.localHostUrl+'/getRecAddress.json'
					var that=this
					that.$http.post(url,formData,{emulateJSON:true}).then(
						function(res){
							if(res.data.ret==0){
								let datalist=res.data.data
								console.log(datalist)
								that.userInfo.province=datalist[0].province
								that.userInfo.city=datalist[0].city
								that.userInfo.area=datalist[0].area
								that.userInfo.streetAddress=datalist[0].streetAddress
								that.userInfo.memName=datalist[0].memName
								that.userInfo.memTel=datalist[0].phoneNo
								// that.userInfo.sign=
								console.log(datalist[0].sign)
								if(datalist[0].sign==1){
									that.userInfo.sign=true
								}else{
									that.userInfo.sign=false

								}

							}else{
								that.$toast(res.data.descript)
							}
						}
					)	
		     	}
			},
			check(){
				this.model_check=!this.model_check
				console.log(this.model_check)
			},
			saveFn(){

				var Phonereg =/^(1[3|5|7|8][0-9]\d{4,8})$/;
				if(this.userInfo.memName ==''){
					this.$toast("收货人信息不能为空")
					return false;
				}
				else if(this.userInfo.memTel ==''){
					this.$toast("联系电话不能为空")
					return false;
				}
				else if(this.userInfo.streetAddress==''){
					this.$toast("详细地址不能为空")
					return false;

				}else if(!Phonereg.test(this.userInfo.memTel) ){
					this.$toast("电话格式不对")
					return false;
				}
				else{
					if(this.typeFlag==1){
						//修改
						var formData =qs.stringify(this.userInfo)
						var url = this.$store.state.localHostUrl+'/updateRecAddress.json'
						var that=this
						that.$http.post(url,formData,{emulateJSON:true}).then(
							function(res){
								if(res.data.ret==0){
									that.datalist=res.data.data
									console.log(res.data)
									if(that.pathType==1){
										that.$router.push({path:'/personalcenter'})
									}else if(that.pathType==2){
										that.$router.push({path:'/DeliveryAddress'})
									}

								}else{
									that.$toast(res.data.descript)
								}
							}
						)
					}else{
						//添加
						var formData =qs.stringify(this.userInfo)
						var url = this.$store.state.localHostUrl+'/addRecAddress.json'
						var that=this
						that.$http.post(url,formData,{emulateJSON:true}).then(
							function(res){
								if(res.data.ret==0){
									that.datalist=res.data.data
									console.log(res.data)
									if(that.pathType==1){
										that.$router.push({path:'/personalcenter'})
									}else if(that.pathType==2){
										that.$router.push({path:'/EOrderedFoodList'})
									}
								}else{
									that.$toast(res.data.descript)
								}
							}
						)
					}

				}
				
			},
			switchFn(){
				console.log(this.userInfo.sign)
				// this.userInfo.sign= !this.value
			}
		    
		},
	 	 mounted(){
	      this.$nextTick(() => {//vue里面全部加载好了再执行的函数  （类似于setTimeout）
	        this.myAddressSlots[0].defaultIndex = 0    
	         // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
	      });
	      // this.getAddress();
		  this.getRecAdd()

	    }
	}
</script>
<style>
	.ChangePhone>a:last-child>.mint-cell-wrapper{     
    margin: 0 auto;   border-bottom: 1px solid #d7d7d7;}
    .AddAdress_switch input{visibility: hidden;}
    .AddAdress_textarea .mint-cell-wrapper{height: auto;}
     .AddAdress_textarea textarea{resize: none}
</style>