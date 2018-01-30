<template>
	<div class="Refunding">
		<div class="OL_tab" style="visitable:hidden">
			<div class="navbar">
				<li >全部</li>
			</div>
		</div>
		<div class="OL_content"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore   :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore"   >
			  	<div>
			  		<ul>
			  			<li class="mar_top" v-for="(items,index) in datalist" >
			  				<div class="OL_title title_bor">
			  					<p class="lf"><i></i>{{items.merchantName}}</p>
			  					<h6 class="rt" v-show="items.status == 8">退款中</h6>
			  					<h6 class="rt" v-show="items.status == 9">退款完成</h6>
				  				<h6 class="rt" v-show="items.status==11">退款关闭</h6>
				  				<h6 class="rt" v-show="items.status==12">取消退款</h6>

			  					
			  				</div>
			  				<ul>
			  					<li  class="OL_fooditem title_bor"  v-for="(item,index) in items.orderGoodsRelList" > 		
			  						<div class="OL_fooditem_lf">
			  							<img  :src="item.goodphoto"  >
			  						</div>
			  						<div class="OL_foodltem_rt">
			  							<span >{{item.goodsName}} <span class="gray_minfont">{{item.attrvalStr}}</span></span>
			  							<span><img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{item.unitPrice}}<br/>{{item.qty}}件</span>
			  						</div>
			  					</li>
			  				</ul>

			  				<div class="mar_top_bot title_bor">
			  					<div class="mar_top_botlf">
			  						<span>总额:<img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{items.orderAmt}}</span>
			  					<!-- 	<span>实付:<img class="ml4" width="10px" height="10px" src="./../assets/img/ml4.png"/>{{items.payAmt}}</span> -->
			  					</div>

		  						<div class="mar_top_botrt" v-if="items.orderFlag==0">
					  					<span class="btn_blue" v-show="items.status==8" @click="cancelApplication(index,items.orderId,'',items.orderFlag)">取消退款</span>
			  							<span class="btn_blue" v-show="items.status==1" @click="showCodeFn(index,items.orderId)">取餐码</span>
			  							<span class="btn_blue" v-show="items.status==0" @click="payFn(index,items.orderId)">支付</span>
				  						<span class="btn_gray" @click="go_OrderdetailFn(items.orderId,items.refId)">详情</span>
			  					</div>
			  					<div class="mar_top_botrt" v-if="items.orderFlag==1">
					  						<span class="btn_blue" v-show="items.status==8" @click="cancelApplication(index,items.orderId,items.orderGoodsRelList[0].goodsId,items.orderFlag)">取消退款</span>
			  							<span class="btn_blue" v-show="items.status==0" @click="payFn(index,items.orderId)">支付</span>
				  						<span class="btn_gray" @click="go_OrderdetailFn(items.orderId,items.refId)">详情</span>
				  						<span class="btn_blue" v-show="items.status==3" @click="ConfirmFn(items.orderId)">确认收货</span>


			  					</div>
			  				</div>
			  			</li>
			  		</ul>
			  	</div>
			  	<div slot="bottom" class="mint-loadmore-bottom">
		          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
		          <span v-show="bottomStatus === 'loading'">
		            <mt-spinner type="snake"></mt-spinner>
		          </span>
		        </div>
		  	</mt-loadmore>
		  	<div v-show="allLoaded==true && datalist.length!=0" class="no-data">木有数据啦。。。</div>
		</div>
	</div>
</template>
<script>
import {setCookie,getCookie} from './../cookie/cookie.js'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
import {Indicator,Loadmore} from 'mint-ui';
export default{
	name:'Refunding',
		data(){
			return{
				OrderInfo:{
					mobile:getCookie('mobile'),
					openId:getCookie('openId'),
					pageIndex: 1,
      				pageSize:20
				},
				datalist:[],
				 allLoaded: false,
		        // 总页数
		        totalCount: '',
		        bottomStatus:'',
		        wrapperHeight: 0,
		        length:'',
		        //向上拉
		        topStatus:'',
		        refundInfo:{
		        	orderId:'',
		        	goodsId:''
		        }
			}
		},
		methods:{
			handleBottomChange(status) {
	        	this.bottomStatus = status;
	        	console.log(this.bottomStatus)
	        
	      	},

			// searchOrder(){
	  //     		var url = this.$store.state.localHostUrl +'/refundOrderInfo.json'
	  //     		var data= qs.stringify(this.OrderInfo)
	  //     		var that = this
	  //     		that.$http.post(url,data,{emulateJSON:true}).then(
	  //     			function (res){
	  //     				if(!res.data.ret){
	  //     					that.datalist=res.data.data
	  //     					console.log(that.datalist)
	  //     				}
			// 			else{
			// 				alert(res.data.descript)

			// 			}
	  //     			}
	  //     		)
	  //     	},
	      	go_OrderdetailFn(o,refId){
	      		console.log(refId)
				router.push({path:'/RefundingDetaile',query:{"orderId":o,"refId":refId}})
	      	},
	      	loadBottom() {
	      		Indicator.open('Loading...');
	      		this.is_loadding=true
	      	 	var url = this.$store.state.localHostUrl +'/refundOrderInfo.json'
	      		var data= qs.stringify(this.OrderInfo)
	      		var that = this
	      		that.$http.post(url,data,{emulateJSON:true}).then(
	      			function (res){
	      				if(!res.data.ret){
	      					console.log(res.data.data)
	      					that.length=res.data.data.length
	      					that.datalist=that.datalist.concat(res.data.data);//拼接数组
	      					if(res.data.data==''||res.data.endType==1){
								that.allLoaded = true;
	      					}else{
	      						that.OrderInfo.pageIndex +=1;
	      					}
	      				}
						else{
							that.$toast(res.data.descript)
						}
						Indicator.close();
	      			}
	      		)
	      		setTimeout(() => {
				  //   this.allLoaded = true;
				  //如果当前的个数<当前页的长度，停止上拉
					// if(this.length<this.OrderInfo.pageSize){
					//     this.allLoaded = true;
					// }
					this.$refs.loadmore.onBottomLoaded();
				}, 1500);
	      	},
	      	cancelApplication(i,o,g,flag){
	      		console.log(g)
	      		if(flag==1){
	      			this.refundInfo.goodsId=g
	      		}else{
	      			this.refundInfo.goodsId=''
	      		}
	      		this.refundInfo.orderId=o
				var url=this.$store.state.localHostUrl+'/cancelRefundInfo.json'
				var data=qs.stringify(this.refundInfo)
				var that = this
				that.$http.post(url,data,{emulateJSON:true}).then(
					function(res){
						console.log(res.data)
						if(!res.data.ret){
							that.searchOrder()
						}else{
							that.$toast(res.data.descript)
						}
					}
				)
    	  	},
    	  	searchOrder(){
    	  		
    	  		var url = this.$store.state.localHostUrl +'/refundOrderInfo.json'
    	  		 this.OrderInfo.pageIndex=1
	      		var data= qs.stringify(this.OrderInfo)
	      		var that = this
	      		that.$http.post(url,data,{emulateJSON:true}).then(
	      			function (res){
	      				if(!res.data.ret){
	      					that.datalist=res.data.data;//拼接数组
	      				}
						else{
							that.$toast(res.data.descript)
						}
	      			}

	      		)

    	  	}
		},
		mounted(){
			// this.searchOrder()
			  this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>
<style>
	.Refunding .OL_content{
		top:0;
	}
	.Refunding .mar_top{margin-bottom:8px;margin-top:0px;}
</style>
