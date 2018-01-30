<template>
	<div class="shoppingCard">
	  	<div class="shoppingCard_content"  >
	  		<ul>
	  			<li class="mar_top" v-for="(items, index1) in datalist">
	  				<div class="OL_title title_bor">
	  						<label class="mint-checklist-label">
								<span class="mint-checkbox" >
									<input type="checkbox" v-model="items.shopselected"   @click="checkShop(index1)"  class="mint-checkbox-input" value=""> 
									<span class="mint-checkbox-core" ></span>
								</span>
								 <span class="mint-checkbox-label organge_fonts">{{items.merName}}</span>
							</label>
	  					
	  				</div>
	  				<ul>
	  					<li  class="OL_fooditem title_bor" v-for="(item, index) in items.cartInfo"> 	
  							<div class="SC_changetable">
  								<label class="mint-checklist-label" >
									<span class="mint-checkbox" >
										<input type="checkbox"  v-model="item.selected"   @click="checkGoods(index1,index)"   class="mint-checkbox-input" value=""> 
										<span class="mint-checkbox-core" ></span>
									</span>
									 <!-- <span class="mint-checkbox-label organge_fonts">中海通专卖店</span> -->
								</label>	
  							</div>
	  						<div class="OL_fooditem_lf">
	  							<!-- <img  src="./img/swiper.png"> -->
	  							<img  :src="item.photoUrl">

	  						</div>
	  						<div class="OL_foodltem_rt ShoppingCard_bot" >
	  							<h1 >{{item.goodsName}}  <span class="gray_minfont"> {{item.goodsAttrStr}} </span></h1>
	  							<div class="ShoppingCard_btn">
	  								<div class="ShoppCard_money">
	  									<img src="../assets/img/ml4.png" width="10px" height="10px">
	  									{{item.price}}
	  								</div>
	  								<div class="ShoppingCard_box">
										<div class="DP_number">
									        <span class="decrease"  @click="decreaseFn('del',item.goodsId,item.attrvalId,index1,index)">-</span>
									        <span class="DP_num">{{item.amount}}</span>
									        <span class="increase"  @click="decreaseFn('add',item.goodsId,item.attrvalId,index1,index)">+</span>
									    </div>
										<img  @click="decreaseFn('clearOne',item.goodsId,item.attrvalId,index1,index)" class="shopingCard_delte" src="./img/delete.png" width="18px" height="18px">
									</div>
								
	  							</div>
	  						</div>
	  					</li>

	  				</ul>
	  			</li>
	  		</ul>
		</div>
		<div class="shoppingCard_footer">
			<div class="shoppingCard_footer_lf">
				<div class="SC_change_lf">
					<label class="mint-checklist-label">
						<span class="mint-checkbox" >
							<input type="checkbox" class="mint-checkbox-input" v-model="selectAll" value=""> 
							<span class="mint-checkbox-core" ></span>
						</span>
						 <span class="mint-checkbox-label organge_fonts" >全选</span>
					</label>
				</div>
				<div class="SC_change_rt">共<span class="max-organge_fonts">{{cartAmount}}</span>件 合计：<img src="../assets/img/ml4.png" width="10px" height="10px"><span class="max-organge_fonts"> {{total}}</span> </div>
			</div>
			<div class="shoppingCard_footer_rt" @click="SubmitClick">
				去结算
			</div>
		</div>
		<Nothing  v-if="datalist.length==0"></Nothing>
	</div>
</template>
<script>
import Nothing from './../components/noCard/Nothing'
import {setCookie,getCookie} from '../cookie/cookie.js'
import { MessageBox } from 'mint-ui';
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
import {Indicator,Loadmore,Badge} from 'mint-ui';
export default{
	name:'DetailsPage',
	components:{
		Nothing
	},
	data(){  
		return {
			datalist:[],
			id:1,
			searchInfo:{
	 			mallId:getCookie('mallId'),
	 			openId:getCookie('openId'),
	 			mobile:getCookie('mobile'),
	 			submitFlag:0

			},
			addInfo:{
				mallId:getCookie('mallId'),
	 			openId:getCookie('openId'),
	 			mobile:getCookie('mobile'),
	 			goodsId:'',
	 			attrvalId:'',
	 			opSymbol:''
			},
			check:false,
			submit:{
				mallId:getCookie('mallId'),
	 			openId:getCookie('openId'),
	 			mobile:getCookie('mobile'),
				attr:[]

			},
			OrderTotal:'',
			number:0,
			intValue:''
		}
	},
	methods:{
		serachInfo(){
			Indicator.open('Loading...');
	    	var url = this.$store.state.localHostUrl +'/searchMallCartGoodsInfo.json'
	    	var data= qs.stringify(this.searchInfo)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
	      		function (res){
      				if(!res.data.ret){
      					that.datalist=res.data.data
      					console.log(res.data)
      				}
					else{
						 that.$toast(res.data.descript)
					}
					Indicator.close('Loading...');
	      		}

	      	)
	    },
	    decreaseFn(o,g,a,PID,ID){
			var url = this.$store.state.localHostUrl +'/opMallCartGoodsInfo.json'
			this.addInfo.attrvalId=a
			this.addInfo.opSymbol=o
			this.addInfo.goodsId=g
			if(o=='add'||o=='del'){
				var data= qs.stringify(this.addInfo)
				var that = this
				that.$http.post(url,data,{emulateJSON:true}).then(
		      		function (res){
		      			that.intValue=res.data.intValue
						if(o=='add'){
							let self= that.datalist[PID]
							if(that.intValue==1){
								that.$toast("没货啦")
							}
							else{
								self.cartInfo[ID].amount++
							}
						}else if(o=='del'){
				    		let self= that.datalist[PID]
							if(that.intValue==-1){
								that.$toast("清空啦")
							}else{
								self.cartInfo[ID].amount--
							}
				        }

		      		}
		      	)

			}
			else{
				MessageBox.confirm('', {
	                message: '确定删除吗？',
	                title: '提示',
	                confirmButtonText: '确认',
	                cancelButtonText: '取消'
	            }).then(action => {
	            	console.log(ID);
					var data= qs.stringify(this.addInfo)
					var that = this
					that.$http.post(url,data,{emulateJSON:true}).then(
	      				function (res){
      						if(res.data.ret==0){
      							 // router.go(0)
      							 that.serachInfo();
      						}
							else{
								that.$toast(res.data.descript)
							}
	      				}
	     		 	)
	            }).catch(err => {
	                if (err == '取消') {
	                    return false;
	                }
	            });
			}
	    	
	    },
	    SubmitClick(){
	    	var OrderArry = [];
	    	this.datalist.forEach(function(list){
	    		list.cartInfo.forEach(function(item){
	    			if(item.selected){
	    				OrderArry.push(item.cartId)
	    			}
	    		})
	    	})
	    	this.submit.attr=OrderArry
	    	console.log(this.submit.attr)
			if(this.submit.attr.length!=0){
				var url = this.$store.state.localHostUrl +'/goMallSubmitClick.json'
		    	var data= qs.stringify(this.submit)
				var that = this
				that.$http.post(url,data,{emulateJSON:true}).then(
		      		function (res){
	      				if(!res.data.ret){
	      					that.$router.push({path:'/EOrderedFoodList'})
	      				}
						else{
							that.$toast(res.data.descript)
						}
		      		}
		      	)
			}else{
				this.$toast("您还没选中")
			}
	    	
	    },
	    checkShop(PId){
	    	// let self= this.datalist[PId]
	    	// if(!self.shopselected != true){
	    	// 	self.shopselected = true
	    	// 	self.cartInfo.forEach(function(list){
	    	// 		list.selected=true;
	    	// 		console.log('list：'+list.selected)
	    	// 	})
	    	// }else{
	    	// 	self.cartInfo.forEach(function(list){
	    	// 		self.shopselected = false
	    	// 		list.selected=false;
	    	// 		console.log('list：'+list.selected)

	    	// 	})
	    	// }
	    	let self= this.datalist[PId]
	    	setTimeout(function(){
	    		if(self.shopselected != true){
		    		self.shopselected = false
		    		self.cartInfo.forEach(function(list){
		    			list.selected=false;
		    		})
		    	}else{
		    		self.cartInfo.forEach(function(list){
		    			self.shopselected = true
		    			list.selected=true;

		    		})
		    	}
	    	},0)
	    	
	    },
	    checkGoods(PID,ID){
	    	let self= this.datalist[PID];

	    	if(this.datalist.length!=0){
		    	// if(!self.cartInfo[ID].selected){
		    	// 	self.cartInfo.filter(function(item){
		    	// 		console.log("选中:"+item.selected)
		    	// 		return item.selected == true;
			    //            }
			    //        	).length+1== self.cartInfo.length ? (self.shopselected = true,self.cartInfo[ID].selected=true) : self.shopselected = false;
				    	// }else{
				    	// 	self.cartInfo.filter(function(item){
				    	// 		console.log("取消选中:"+item.selected)
				    	// 		return item.selected == true;
			    //            }).length-1!= self.cartInfo.length ? (self.shopselected = false,self.cartInfo[ID].selected=false) : self.shopselected = true;
				    		
				    	// }
				setTimeout(function(){
			    	if(!self.cartInfo[ID].selected){
			    		self.cartInfo.filter(function(item){
			    			console.log("选中:"+item.selected)
			    			return item.selected == true;
		                 }
		             	).length+1== self.cartInfo.length ? (self.shopselected = false,self.cartInfo[ID].selected=false) : self.shopselected = true;
			    	}else{
			    		self.cartInfo.filter(function(item){
			    			console.log("取消选中:"+item.selected)
			    			return item.selected == true;
		                 }).length-1!= self.cartInfo.length ? (self.shopselected = true,self.cartInfo[ID].selected=true) : self.shopselected = false;
			    		
			    	}
		    	},0)

	    	}
	    	
	    },
	    toFixed(num, s) {
			var times = Math.pow(10, s)
			var	des = num * times + 0.5
			des = parseInt(des, 10) / times
			return des + ''
		},	
	},
	computed:{
		selectAll:{
			get:function(){
				if(this.datalist.length!=0){
					return this.datalist.filter(function(item){
		                return item.shopselected == true;
		            }).length == this.datalist.length;
				}
				
			},
			set:function(val){
				if(this.datalist.length!=0){
					this.datalist.forEach(function(item){//遍历所有商店
	                   item.shopselected = val;//所有商店选中
	                   item.cartInfo.forEach(function(list){//遍历所有商品
	                       list.selected = val;//所有商品选中
	                   })
	                });
				}
			},
		},
		total:function(){
			var total = 0;
			var that=this
			if(that.datalist!=0){
			    that.datalist.forEach(function(item){//遍历商家数组
	               item.cartInfo.filter(function(a){//遍历商品数组
	                   return a.selected//选择选中的商品
	               }).map(function(a){
	                   return a.amount*a.price//计算商品数量*商品单价
	               }).forEach(function(a){
	                   total += a;
	               });
	           })
			}
     	
           that.OrderTotal = that.toFixed(total,2);//更新商品总价
           console.log( that.OrderTotal)
           return that.toFixed(total,2);//返回总价
		},
		cartAmount:function(){
			var cartAmount=0
			if(this.datalist.length!=0){
				this.datalist.forEach(function(item){
					item.cartInfo.forEach(function(num){
						if(num.selected==true){
							cartAmount++
						}
					})
				})
				return cartAmount;
			}
		}
	},
	mounted(){
		this.serachInfo()
	}
}

</script>
<style>
.shoppingCard .shoppingCard_content .mar_top {
     display: block; 
}
.shoppingCard .shoppingCard_content{
	margin-bottom: 50px;
}
</style>