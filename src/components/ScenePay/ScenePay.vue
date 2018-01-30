<template>
	<div class="ScenePay">
		<!-- <img src="./img/top_bg.png" width="100%" height="44px"> -->
		<div class="SP_header">
			<img class="Sp_icon" src="../../assets/img/Or_icon.png" width="20px" height="20px">
			<h1>{{merchantName}}</h1>
		 </div>
		 <div class="SP_content">
			 <span>￥</span>
			 <!-- <b class="col">可用余额：</b> -->
			 <input v-model="SceneInfo.payAmt" type="number" @blur="reg_money" maxlength="9" :placeholder="restAmt" name=""  value="">
		 </div>
		 <p class="SP_con">仅限于面对面支付</p>
	 	<button class="home_pay SP_btn"   @click="ScenePayFn"  :disabled="isShow">
			<span class="home_pay_icon">确认支付</span>
		</button>
	</div>
</template>
<script>
import router from '@/router'
import {setCookie,getCookie} from '../../cookie/cookie.js'
import { Indicator } from 'mint-ui';
import qs from 'qs'
import Vue from 'vue'
export default{   
	name:'ScenePay',
	data(){
		return{
			SceneInfo:{
	 			openId:getCookie('openId'),
	 			merId:getCookie('merId'),
	 			mobile:getCookie('mobile'),
	 			payAmt:''
		 	},
		 	merchantName:getCookie('merchantName'),
		 	isShow:false
		}
	},
	methods:{
		reg_money(){
         var reg =/(^((0|[1-9][0-9]{0,7})([.]\d{1,2})?)$)/;
           if(!reg.test(this.SceneInfo.payAmt)){
              this.SceneInfo.payAmt=""
              return false
            }
        },
		ScenePayFn(){
			
			var reg =/(^((0|[1-9][0-9]{0,7})([.]\d{1,2})?)$)/;
			if(this.SceneInfo.payAmt==""){
				alert("金额不能为空")
				return false
			}else if(!reg.test(this.SceneInfo.payAmt)){
				alert("金额格式不正确")
				return false
			}
			else{
				this.isShow=true
				Indicator.open('Loading...');
				var url=this.$store.state.localHostUrl+'/pay.json'
				var data=qs.stringify(this.SceneInfo)
				var that = this
				that.$http.post(url,data,{emulateJSON:true}).then(
					function(res){
						console.log(res.data)
						if(!res.data.ret){
							alert(res.data.descript)
							  router.push({path: '/OrderedFoodSuccess',query : { 'payAmt':that.SceneInfo.payAmt}})
						}else{
							
							alert(res.data.descript)
						}
						that.isShow=false
						Indicator.close();
					}
				)
			}
			
		}
		
	},
	mounted(){
		// this.$store.dispatch('getCardInfo')
	},
	computed:{
		restAmt(){
			 return '当前余额 '+this.$store.state.CardInfo.restAmt
		}
	},
	created(){
		this.$store.dispatch('getCardInfo');
	}
}
</script>
<style scoped>
.SP_header{
	margin-top: 2rem;
	margin-bottom: 1.5rem;
	text-align: center;
}
.SP_header h1{
	margin-top: 0.5rem;
	font-weight: bold;
	font-size: 1rem;
	color: #F08632;

}
.SP_content{
	display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box; 
	display: -moz-box;
	display: -ms-flexbox;
	 display: -webkit-flex;
      width: 80%;
    margin: 0 auto;
    height: 2.1rem;
    line-height: 2.5rem;
    border: 1px solid #F19B55;
    border-radius: 5px;
    position: relative;
}
.SP_content>span{
	width: 50px;
	flex:0 0 50px;
	-webkit-box-flex: 0 0 50px;
	-moz-box-flex: 0 0 50px;
	-webkit-flex: 0 0 50px;
	-ms-flex: 0 0 50px;
	text-align: right;
	font-size: 1.5rem;
	color: #F08531;
	font-weight: bold;
	line-height:2.2rem;
}
.SP_content>input{
	flex:1;
	-webkit-box-flex: 1;
	-moz-box-flex:1;
	-webkit-flex:1;
	-ms-flex: 1;
    background: none;
    /* padding-left: 1rem; */
    color: #F08632;
    /* width: 99%; */
    outline: none;
    padding-right: 10px;
    font-size: 0.8rem;
    position: absolute;
    height: 44px;
    left: 50px;
    /* width: 100%; */

}
.SP_content>input:visited{
	color:#000;
}
.SP_con{
	margin-top: 12px;
	text-align: center;
	font-size: 0.7rem;
	color: #565656;
}
.SP_btn{
	margin-top:3rem;
}
.col{
	color:#498FC4;
}
</style>