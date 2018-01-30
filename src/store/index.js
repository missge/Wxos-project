// store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import {setCookie,getCookie} from '../cookie/cookie.js'
import { Indicator } from 'mint-ui';
Vue.use(Vuex)
  //var localhostStr='http://zhht.dealreal.com.cn'
 var localhostStr='http://wcy.dealreal.com.cn'
  // var localhostStr='http://10.0.0.2:8080/wxmanage'
 // var localhostStr='http://10.0.0.5:8080/wxmanage'


const store = new Vuex.Store({
	state:{
		openId:getCookie('openId'),
		merId:getCookie('merId'),
		mobile:getCookie('mobile'),
		mallId:getCookie('mallId'),
		flag:'',
		refererUrl:'',
		familyIdFlag:'',
		method:getCookie('method'),
		wxName:getCookie('wxName'),
		wxHeadlmgUrl:getCookie('wxHeadlmgUrl'),
		merchantName:getCookie('merchantName'),
		localHostUrl: localhostStr,
		// imgUrl:imgUrl,
		// 获取卡包
		CardInfo:{
			pramater:{openId:this.openId,mobile:this.mobile},
			url:localhostStr+'/getCardInfo.json',
			result:[],
			restAmt:''
		},
		// 菜品类目
		FoodCategory:{
			pramater:{openId:this.openId,merId:this.merId,mobile:this.mobile},
			pramater:{merId:this.merId},
			url:localhostStr+'/searckGoodsFamily.json',
			result:[],
			supplyDate:'',
			ret:''
		},
	    // 点餐页
		GoodsInfo:{
			result:[],
			number:[],
	    	count:0,
	    	price:0
		},
	    qrCode: {
	      url: 'http://101.200.188.251:8085/gyapp_api/getPayQrcode.json',
	      pramater: {localHostUrl: '111111',merId: '0'},
	      result: [],
	    },
	    // 卡包记录
		PayRecord: { 
		  url:localhostStr+'/searchPayRecord.json',
	      pramater: {openId:getCookie('openId'),mobile:getCookie('mobile')},
	      result: [],
	      length:0
		},
		//商品搜索记录
		GoodsSearchOldInfo:{
			url:localhostStr+'/goodsSearchOldInfo.json',
			pramater: {mallId:getCookie('mallId'),delStatus:'0'},
			result: [],
		}
	

	},
	actions: {
		getCardInfo(context){
			context.state.CardInfo.pramater.openId = context.state.openId
		   context.state.CardInfo.pramater.mobile = context.state.mobile
	      axios.post(context.state.CardInfo.url,qs.stringify(context.state.CardInfo.pramater), {emulateJSON: true}).then(
	        function (res) {
	            if(!res.data.ret){
	            	context.state.CardInfo.restAmt=res.data.data.restAmt
	            	console.log(res.data.data.restAmt)
	            }else{
	              // alert(res.data.descript)
	            }
	        })
		},
		getFoodCategory(context){
			context.state.FoodCategory.pramater.openId = context.state.openId
			context.state.FoodCategory.pramater.merId = context.state.merId
			context.state.FoodCategory.pramater.mobile = context.state.mobile
			axios.post(context.state.FoodCategory.url,qs.stringify(context.state.FoodCategory.pramater), {emulateJSON: true}).then(
				function (res) {
					context.state.FoodCategory.ret= res.data.ret
				    if(res.data.ret==0||res.data.ret==100){
				    	context.state.FoodCategory.result=res.data.data
						context.state.FoodCategory.supplyDate=res.data.data[0].supplyDate
						 setCookie('supplyDate', res.data.supplyDate,1000*60)//公映日期
						 setCookie('merchantName', res.data.merchantName,1000*60)//餐厅名称
						 var haveCard=res.data.data[0].haveCard
						 if(!haveCard){
						 	router.push({path: '/noCard'})
						 }
					
				    }else{
				      // alert(res.data.descript)
				      // context.state.FoodCategory.ret=100
				    }
			})
		},
		getPayRecord(context){
			Indicator.open('Loading...');
			context.state.PayRecord.pramater.openId = context.state.openId
			context.state.PayRecord.pramater.mobile = context.state.mobile
			var is_loadding = true
			axios.post(context.state.PayRecord.url,qs.stringify(context.state.PayRecord.pramater), {emulateJSON: true}).then(
				function (res) {
				    if(!res.data.ret){
				    	console.log(res.data)
				    	context.state.PayRecord.result=res.data.data
						context.state.PayRecord.length=res.data.data.length
						Indicator.close();				
						router.push({path: '/MealCard'})
				    }else{
				      Indicator.close();	
				      // alert(res.data.descript)
				    }
			})
		},
		getGoodsSearchOldInfo(context){
		   context.state.GoodsSearchOldInfo.pramater.delStatus = context.state.delStatus
		   context.state.GoodsSearchOldInfo.pramater.mallId = context.state.mallId
		   console.log(context.state.GoodsSearchOldInfo.pramater)
	       axios.post(context.state.GoodsSearchOldInfo.url,qs.stringify(context.state.GoodsSearchOldInfo.pramater), {emulateJSON: true}).then(
	        function (res) {
	            if(!res.data.ret){
	            	console.log(res.data.data )
	            	context.state.GoodsSearchOldInfo.result=res.data.data
	            }else{
	              // alert(res.data.descript)
	            }
	        })
		},
	},	    

})

export default store