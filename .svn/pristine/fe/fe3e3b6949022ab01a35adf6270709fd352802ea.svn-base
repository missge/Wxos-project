<template>
	<div class="MealCard" >
		<div class="OL_tab">
			<div class="swipe-wrapper">
            	<div class="MC_bg" >
		        	<p>饭卡 &nbsp;{{cardInfo.companyName}}</p>
		        	<h3><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{cardInfo.restAmt}}</h3>
		        	<p class="two_p">卡号:{{cardInfo.cardNo}}</p>
		        	<div class="MC_bot">
		        		<span>Name.{{cardInfo.userName}}</span>
		        		<span>No.{{mobile}}</span>
		        	</div>

		        	<img src="./img/bg_icon1.png" width="100%" height="100%">
		        </div>
		    </div>
		    <div class="MC_title">
		    	<span>消费明细</span>
		    </div>
		</div>
	   <div  class="OL_content" >
		    <div>
		    	<ul v-for="(items,index) in datalist">
				  	<li class="MC_list" v-for="(item,index) in items.payRecord" >
						<div class="MC_listlf">
							<p class="MC_state" v-if="item.type==0">消费
								<span v-if="item.flag==0" >（正常）</span>
								<span v-if="item.flag==1" >（已冲正）</span>
								<span v-if="item.flag==2" >（已退货）</span>
								<span v-if="item.flag==3" >（已撤销）</span>
							</p>
							<p class="MC_state" v-if="item.type==1">充值
								<span v-if="item.flag==0" >（正常）</span>
								<span v-if="item.flag==1" >（已冲正）</span>
								<span v-if="item.flag==2" >（已退货）</span>
								<span v-if="item.flag==3" >（已撤销）</span>
							</p>
							<p class="MC_state" v-if="item.type==2">退款
								<span v-if="item.flag==0" >（正常）</span>
								<span v-if="item.flag==1" >（已冲正）</span>
								<span v-if="item.flag==2" >（已退货）</span>
								<span v-if="item.flag==3" >（已撤销）</span>
							</p>
							<p class="MC_time">{{item.payTime}}</p>
						</div>	  		
						<div class="MC_listrt">
							<img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{item.symbol}}{{item.payAmt}}
						</div>
				  	</li>
		  		</ul> 
		    </div>
		<div v-show="allLoaded==true && datalist.length!=0" class="no-data">木有数据啦。。。</div>
		</div>
		<div class="ML_load"  v-if="datalist.length!=0 && allLoaded!=true " @click="loadBottom(true)">点击加载更多>></div>
		
	</div>
</template>
<script>
import router from '@/router'
import Vue from 'vue'
import qs from 'qs'
import {Indicator,Loadmore} from 'mint-ui';
import {setCookie,getCookie,delCookie} from '../../cookie/cookie.js'
	export default{
  		name:'MealCard',
  		data(){
  			return {
  				// is_loadding:this.$route.query.is_loadding,
  				mobile:getCookie('mobile'),
  				OrderInfo:{
  					mallId:getCookie('mallId'),
  					pageIndex:1,
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
		        cardInfo:'',
		        PayRecord :{
		 			mobile:getCookie('mobile'),
		 			openId:getCookie('openId'),
	      		},
  			}
  		},
  		methods:{
  			loadBottom(ifFlag){
  				// this.is_loadding=true
  				if(ifFlag){
	    			this.OrderInfo.pageIndex +=1;
	    		}else{
	    			this.OrderInfo.pageIndex =1;
	    		}
  				Indicator.open('Loading...');
  				var url = this.$store.state.localHostUrl +'/searchPayRecord.json'
  				var data= qs.stringify(this.OrderInfo)
	      		var that = this
	      		that.$http.post(url,data,{emulateJSON:true}).then(
	      			function (res){
	      				if(!res.data.ret){	
	      					that.cardInfo=res.data.data[0]
	      					console.log(that.cardInfo)
	      					// that.datalist=res.data.data
	      					that.length=res.data.data.length
	      					that.datalist=that.datalist.concat(res.data.data);//拼接数组
	      					console.log(res.data.endType)
	      					if(res.data.data==''||res.data.endType==1){
								that.allLoaded = true;
	      					}
	      				}
						else{
							that.$toast(res.data.descript)
							var url= that.$store.state.localHostUrl+'/syncUserInfo.json' 
							var formData=qs.stringify(that.PayRecord)
							that.$http.post(url,formData,{emulateJSON:true}).then(
								function(res){
									if(!res.data.ret){
										that.$toast("更新资料成功")
									}
									else{
										that.$toast(res.data.descript)
									}
								}
							)

						}
						Indicator.close();
	      			}
	      		)
	      	
  			}
  		},
  		mounted(){
			this.loadBottom(false)
		}
	}
</script>
<style>
.MealCard .swipe-wrapper{
	padding: 15px 10px 15px 10px;
}

/*.swipe-wrapper{
	padding:20px 10px 30px 10px;
}*/
.MC_bg{
	position: relative;
	height: 170px;
	/*background: url("./img/bg_icon1.png") no-repeat center 100%;*/
    background-size: 100%;

}
.MC_bg>p{
	padding:0 0 15px 0;
	color:#fff;
	font-size: 0.9rem;
	position: absolute;
	top:30px;
	left: 40px;
}
.MC_bg>h3{
	position: absolute;
	font-size: 1.5rem;
	font-weight: bold;
	color:#fff;
	top: 54px;
	left: 40px;
}
.MC_bot{
	display: flex;
	justify-content: space-between;
	position: absolute;
	bottom: 5px;
	color: #FF8F28;
	width: 100%;

}
.MC_bot>span:first-child{
	padding-left: 20px;
	font-size: 10px;
}
.MC_bot>span:last-child{
	padding-right: 10px;
	font-size: 10px;
}

.MC_list{
	border-bottom: 2px solid #EFF0F2;
	background: #fff;
	width: 100%;
	justify-content: space-between;
	display: flex;

}
ul>.MC_list:last-child{
	border:none;
}
.MC_listlf{
	font-size: 10px;
	padding: 15px 0 15px 10px;
}
.MC_listrt{
	line-height: 60px;
	padding-right: 20px;
	color:#959595;
}
.MC_state{
	margin-bottom: 7px;
}
.blue_font{
	color:#3475B9;
}


.swipe-wrapper{
    height: 170px;
}
.MC_title{
	width:100%;
    margin: 0 auto;
    /* border-top: 1px solid #3275BB; */
    /* position: relative; */
    height: 30px;
    background: #fff;
    line-height: 30px;
    font-size: 0.7rem;
    border-bottom: 1px solid #ddd;
    color: #FF8F28;
    	/*margin-bottom:200px;*/
}
.MC_title>span{margin-left:10px;}
.MealCard>ul{width: 96%;margin:0 auto;}
.MC_bg .two_p{top: 90px;font-size:14px;}

/*.MC_title>span{
	position: absolute;
	display: block;
	text-align: center;
	/*width: 80px;*/
	/*background: #F7F7F7;
	top:-8px;
	left: 50%;
	transform: translateX(-50%);
	color: #3575BD;
	font-weight: bold;*/
/*}*/
  
</style>