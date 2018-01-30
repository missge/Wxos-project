<template>
	<div id="home">
		<div class="home_header">
			<div class="home_header_img">
				<img width="100%" height="100%" src="./img/home_bg.png">
			</div>
			<div class="home_title_bg">
				<img width="20px" height="20px"  src="./img/home_title_bg.png">
			</div>
			<h5>电控所江浦路餐厅</h5>
			<p>就餐日期:10月14日</p>
		</div>
		<div class="home_content" >
			<div class="Hc_BOX">
				<div class="hc_box_row" >
					<div class="hc_box_col" v-for="(items,index) in datalist"  v-if="items.nodeLevel==0">
						<div class="home_con_box">
							<div class="home_con_minwidth">
								<img width="30px"  height="23px" class="home_con_icon" src="./img/tab1.png">
								<span class="home_con_name" v-if="items.nodeLevel==0" >{{items.familyName}}</span>
							</div>
						</div>
					</div>
				</div>
			
			</div>
		</div>
		<div class="home_footer"> 
			<div class="home_pay" @click="orderFn">
				<span class="home_pay_icon">现场支付</span>
			</div>
			<div class="home_prompt">
				<p>
					温馨提示：早餐、中餐、晚餐、特色菜需要提前2天点餐；每周一“歌”菜品周一至周三17:00前接受预定，周五到食堂自行取餐。
				</p>
				<p>
					点餐订单如需退订,请于取餐前一天14:00前在订单详情页申请退款，预期无法处理;
				</p>
			</div>
		 </div>

		 <div @click="testCookie">删除cookie</div>
		  <div @click="request">测试</div>
	</div>
</template>
<script>
import router from '@/router'
import qs from 'qs'
import {setCookie,getCookie} from '../../cookie/cookie.js'
export default{
		 name: 'home',
		 data(){
		 	return {
		 		Info:{
		 			openId:'',
		 			merId:'',
		 			// familyId:''有问题
		 		},
		 		datalist:''
		 	}
		 },
	   methods: {
	    orderFn:function(){
	       router.push({path: '/OnlineOrder'})
		},
		testCookie(){
			  delCookie('phone')
	      setTimeout(() => this.$router.push('/') ,1000)
		},
		request:function(){
			 this.Info.openId = getCookie('openId')
			 this.Info.merId = getCookie('merId')
			var url = this.$store.state.localHostUrl+'/searckGoodsFamily.json' ;
			var formData= qs.stringify(this.Info)
			var that= this
			that.$http.post(url,formData,{emulateJSON: true}).then(
				function(res){
					var maps=res.data.data
					var result=[]
					for(var i=0;i<maps.length;i++){
						if(maps[i].nodeLevel==0){
							result.push(maps[i].nodeLevel)
						}
					}
					that.datalist=res.data.data
					
				}
			)
		}
	},
	mounted(){
		this.request()

	}
}
</script>
<style scoped>
.home_header{
	position: relative;
}
.home_header_img{
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.home_title_bg{
	text-align: center;
}
.home_title_bg>img{
	margin: 0 auto;
	padding: 12px 0;
}
.home_header>h5{
	text-align: center;
	color: #fff;

}
.home_header>p{
	text-align: center;
	color: #fff;
	font-size:10px;
	padding: 10px 0;

}
.home_content{
	width: 80%;
	margin:0 auto;
    margin-top: 1.5rem;
    margin-bottom: 1.7rem;
}		
.home_content .Hc_BOX{
	width:100%;
}
.home_con_box{
	width: 80%;
	margin: 0 auto;
	background: #DFDFDF;
	box-shadow:0px 0px  10px 5px #F1F1F1;
    height: 2.1rem;
    line-height: 2.1rem;
     margin-bottom: 1rem;
}
.home_con_minwidth{
	margin:0 auto;
	text-align: center;
}
.home_con_name{
	font-size: 14px;
}
.home_con_minwidth>img{
	display: inline-block;
	vertical-align: middle;
}
.last_tab{
	width: 90%;
	margin-bottom:0px;
}
.last_tab>.home_con_minwidth{
	text-align: center;
}
.home_footer{
	width: 90%;
	margin: 0 auto;
	border-top:1px solid #A0A0A0;
	text-align: center;

}

.home_prompt{
	width: 90%;
    background: #EEEEEE;
    margin: 0 auto;
    text-align: left;
    padding: 0 15px;
    /*padding-top: 10px;*/
}

.home_prompt>p{
	font-size: 10px;
	color:#8E8E8E;
	line-height: 18px;
    padding: 10px  0;

}
.home_prompt p:first-child{
	padding-bottom:0px;
}
.hc_box_row{
overflow: hidden;
}
.hc_box_col{
	float: left;
	width: 50%;
}
</style>