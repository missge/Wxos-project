<template>
	<div class="Orderdetail_pay">
		<div class="ODP_header">
			<img  v-show="status==1" src="./img/pay_icon.png" width="80px" height="80px">
			<p  v-show="status==1" class="ODP_title">已支付</p>
			<img v-show="status==6" src="./img/pay_ok.png" width="80px" height="80px">
			<p v-show="status==6" class="ODP_title">已取餐</p>
			
		</div>
		<div class="ODP_content" >
		  	<div class="OL_tabone">
	  			<div class="mar_top">
	  				<div class="OL_title title_bor">
	  					<p class="lf"><i></i>{{merchantName1}}</p>
	  				</div>
	  				<ul v-for="(items,index) in datalist">
	  					<li class="OL_fooditem title_bor" v-for="(item,index) in items.orderGoodsRelList"> 
	  						<div class="OL_fooditem_lf">
	  							<img  :src="item.goodphoto" width="80px" height="50px">
	  						</div>
	  						<div class="OL_foodltem_rt">
	  							<span >{{item.goodsName}}</span>
	  							<!-- <span><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{item.price}}<span class="blue_font">{{item.qty}}件</span></span> -->
	  							<span><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{item.price}}<br>{{item.qty}}件</span>

	  						</div>
	  					</li>
	  				</ul>
	  				<div class="ODP_Message_new">
	  					<div class="width_auto flex">
	  						<div class="Message_newlf" >
	  							<i></i>
	  						</div>
	  						<div class="flex_center">
	  							订单留言:{{message}}
	  						</div>

	  					</div>
	  				</div>
	  			</div>
	  			<div v-show="status==1"  class="wide_btn_blue" @click="confirm">
						确认取餐
				</div>
		  	</div>
		</div>

	</div>
</template>
<script>
	import {setCookie,getCookie} from '../../cookie/cookie.js'
	import router from '@/router'
	import {Loadmore} from 'mint-ui'
	import qs from 'qs'
		export default{
			name:'Orderdetail_pay',
			data(){
				return {
					// flag:1,
					GetFoods:{
						orderId:getCookie('orderId'),
						openId:getCookie('openId'),
						mobile:getCookie('mobile')
					},
					datalist:'',
					merchantName:getCookie('merchantName'),
					message:'',
					status:'',
					merchantName1:''
				}
			},
			methods:{
				confirm(){
					var url = this.$store.state.localHostUrl+'/confirmGetFoods.json'  

					var that= this
					that.$http.post(url,qs.stringify(that.GetFoods),{emulateJSON:true}).then(
						function(res){
							if(!res.data.ret){
								that.$toast(res.data.descript)
								that.request()

							}else{
								that.$toast(res.data.descript)
							}
						}
					)
				},
				request(){
					console.log(this.$store.state.flag)
					var url = this.$store.state.localHostUrl+'/searchOrderInfo.json'  
					var that=this
					that.$http.post(url,qs.stringify(that.GetFoods),{emulateJSON:true}).then(
						function(res){
							if(!res.data.ret){
								that.datalist = res.data.data
								that.message=res.data.data[0].orderMsg
								that.merchantName1=res.data.data[0].merchantName
								that.status=res.data.data[0].status
							}else{
								that.$toast(res.data.descript)
							}
						}
					)
				}
			},
			mounted (){
				this.request()
			}

	}
</script>
<style scoped>
	.OL_tabone .wide_btn_blue{
		margin-top: 20px;
		    height: 50px;
    line-height: 50px;
    font-size: 0.9rem;
    margin-bottom: 10px;
	}
	.ODP_Message_new{height: auto;line-height: 18px;padding:5px 0;}
	 .ODP_Message_new .Message_newlf  i{
	    display: inline-block;
	    width: 25px;
	    height: 20px;
	    background:url('../../assets/img/messge.png') no-repeat center center;
	    background-size:100%;
	    vertical-align: middle;
	    margin:0px 10px;
  }
  .ODP_Message_new .flex_center{
  	text-align: left;
  }
</style>