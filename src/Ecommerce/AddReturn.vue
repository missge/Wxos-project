<template>
	<div class="RetundGoods">
		<ul class="IM_list">
			<li>
				<!-- <span class="IM_header1 blank_font">
					韵达快递
				</span> -->
				<div class="mint-cell"  @click="check">
					<span class="mint-cell-mask"></span>
					 <div class="mint-cell-left"></div> 
					 	<div class="mint-cell-wrapper">
					 		<div class="mint-cell-title">
					 			 <span class="mint-cell-text">选择物流</span> 
					 		</div>
						 	<div class="mint-cell-value is-link" v-model="WaybillInfo.logistName">
						 		{{WaybillInfo.logistName}}
							</div>
					</div>
					 <div class="mint-cell-right"></div>
					  <i class="mint-cell-allow-right"></i>
				</div>
			</li>

			<li>
				
				<mt-field label="运单号"
				 class="RG_placeholder" placeholder="" type="tel" v-model="WaybillInfo.waybail"> 
				</mt-field>
			
			</li>
			
		</ul>
		<button class="wide_btn_blue" :disabled="isShow"  @click="submitWayBill">
			确定提交
		</button>
		<div class="model" v-if="model_check"  @click="check">
			<div class="mint-popup mint-datetime mint-popup-bottom" >
				<div class="picker mint-datetime-picker">
				 	<div class="picker-toolbar">
					 	<span class="mint-datetime-action mint-datetime-cancel">取消</span>
					 	 <span class="mint-datetime-action mint-datetime-confirm">确定</span>
					 </div> 
					<mt-picker  :slots="pickerSlots" @change="valuesChange"></mt-picker>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {setCookie,getCookie} from './../cookie/cookie.js'
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import {Loadmore} from 'mint-ui'
	let pickerArray = {};
	export default{
			name:'AddReturn',
			data(){
				return{
					WaybillInfo:{
						logistName : '',
		      			waybail:'',
		      			refId:this.$route.query.refId,
		      		},
		    
		      		showPicker: true,
    			  	pickerSlots: [
    			  		{
    			  			flex: 1,
			                values: Object.keys(pickerArray),
					        className: 'slot1',
					        textAlign: 'center'
    			  		}
    			  	],
    			  	pickerInfo:'',
    			  	model_check:false,
    			  	isShow:false
		      	}

			},
			methods:{
				check(){
					this.model_check=!this.model_check
					console.log(this.model_check)
				},
				submitWayBill(){
					var waybillReg = /^[A-Za-z0-9]+$/;
					if(this.WaybillInfo.logistName==''){
						this.$toast("请选择物流公司")
						return false;
					}
					if(this.WaybillInfo.waybail ==''){
						this.$toast("运单号不能为空")
						return false;
					}
					else if(!waybillReg.test(this.WaybillInfo.waybail) ){
						this.$toast("运单号格式不对")
						return false;
					}
					
		      		var url = this.$store.state.localHostUrl +'/returnWaybill.json'
		      		var data= qs.stringify(this.WaybillInfo)
		      		var that = this
		      		that.$http.post(url,data,{emulateJSON:true}).then(
		      			function (res){
		      				that.isShow=true
		      				if(!res.data.ret){
		      					that.$router.push({path:'/GoodsReturn',query:{refId:that.$route.query.refId,orderId:that.$route.query.orderId}})
		      				}
							else{
								that.$toast(res.data.descript)

							}
		      			}
		      		)
		      	},
		      	
		    	serachLogistics(){
		    		var url = this.$store.state.localHostUrl +'/getLogistinfo.json'
		    		var that = this
		    		var data= qs.stringify({})
		    		that.$http.post(url,data,{}).then(
		      			function (res){
		      				if(!res.data.ret){
		      					pickerArray = res.data.data;
		      					that.pickerSlots[0].values = pickerArray;
		      				}
							else{
								that.$toast(res.data.descript)
							}
		      			}
		      		)
		    	},
		    	valuesChange: function (picker, values) {
			    	this.completeValue = values[0];
			    	this.WaybillInfo.logistName=this.completeValue 
			    }

			},
			mounted(){
				this.serachLogistics();
			}
			//Vue.component(picker.name, picker);
		}
</script>
<style>
.IM_list{
	background: #fff;
}
.IM_list span{
	font-size: 0.75rem;
    line-height: 40px;
}
.IM_list .mint-cell{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #d7d7d7;
}
.RD_I{
	 
	left: 2px;
}

.RG_returnMoney{position: absolute;right: -9px;top:0;font-size: 0.7rem;}

.RetundGoods>.wide_btn_blue{
	margin-top: 55px;
	display: block;
	border:none;
}
.mint-field-core{
	 font-size: 12px;
}
/*.RetundGoods .mint-popup-bottom{
	    top: 60%;
}*/
</style>