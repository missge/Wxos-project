<template>
	<div class="cartcontrol-wrapper">
		<div class="cartcontrol">
			<transition name="fadeRotate">
				<div class="cart-decrease" v-show="item.number>0" v-on:click="decreaseCart(item.goodsId)" >
					<span class="icon-remove_circle_outline inner">	</span>
				</div>
			</transition>
			<div class="cart-count" v-show="item.number>0" >{{item.number}}</div>
			<div class="cart-add" v-on:click="addCart(item.goodsId)">
				<i class="icon-add_circle"></i>
			</div>
		</div>
	</div>
</template>
<script>
import {setCookie,getCookie} from '../../cookie/cookie.js'
import qs from 'qs'
import Vue from 'vue'
export default{
	data() {
	 	return {
    		counter: 0,
    		Info:{
	  			merId:getCookie('merId'),
	  			goodsId:'',
		  		opSymbol:'',
	  			openId:getCookie('openId'),
	  			mobile:getCookie('mobile')


	  		}
  		}
  		
	},
	props:{
		'item':Object,
	},
	methods: {
	    addCart: function(ID){
	     	 this.item.number++;
	      // this.num+=this.item.number
	      // console.log(this.item.number)
	      	this.notify();
		    var url = this.$store.state.localHostUrl +'/opCartGoodsInfo.json'
		    this.Info.goodsId=ID
		    this.Info.opSymbol='add'
			var data= qs.stringify(this.Info)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
	      		function (res){
    				if(res.data.ret==0){
    					console.log("成功")
    				}else{
    					console.log("失败")
    				}
	      		}
	      	)

		} ,	

	    decreaseCart: function(ID){

	    	if(this.item.number) this.item.number--;
	    	
	      	this.notify();

	      	 var url = this.$store.state.localHostUrl +'/opCartGoodsInfo.json'
		    this.Info.goodsId=ID
		    this.Info.opSymbol='del'
			var data= qs.stringify(this.Info)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
	      		function (res){
    				if(res.data.ret==0){
    					console.log("成功")
    				}else{
    					console.log("失败")
    				}
	      		}
	      	)
	    },
		notify () {
			this.$emit('input',this.item.number);
			this.$emit('listenToChildEvent','event');
		}
  	},

}	
</script>