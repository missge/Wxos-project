<template>
	<div class="DetailsPage">
		<div class="DP_nav white_bg">
			<p class="DP_nav_lf">
				{{datalist.goodsName}}
			</p>
			<div class="DP_nav_rt">
				<img class="DP_icon1" width="24px" height="20px" src="./img/DP_icon1.png">
				<img width="17px" height="22px" src="./img/DP_icon2.png">
				<img class="DP_icon3" width="23px" height="20px" src="./img/DP_icon3.png">
			</div>
		</div>
		<div class="DP_cont1 white_bg">
			<div class="DP_swiper">
				<mt-swipe :auto="0" :show-indicators="true"  ref="swipeWrapper">
		            <!-- <mt-swipe-item class="swip-item-1 item" :key='key' v-for="(item,key) in datalist.photoUrl" > -->
		            <mt-swipe-item class="swip-item-1 item" >

			            <div class="DP_swiper_img">
			   				<!-- <img :src="item"> -->
			   				<img src="./img/goods_img.png">
			            </div>
		            </mt-swipe-item>
		        </mt-swipe> 
			</div>
			<div class="DP_introduction">
				<h5 class="DP_title">{{datalist.goodsName}}</h5>
				<div class="DP_moneyBox">
					<span class="DP_new_price" >
						<img src="./img/ml.png" width="11px" height="14px">
				<!-- 		<span v-if="datalist.attrFlag==1 && datalist.minPrice != datalist.maxPrice"> {{datalist.minPrice}}~{{datalist.maxPrice}}</span>
						<span v-if="datalist.attrFlag==0 || (datalist.minPrice == datalist.maxPrice)"> {{datalist.maxPrice}}</span> -->
						<span v-if="priceFlag==0 ">{{datalist.minPrice}}</span>
						<span v-if="priceFlag==1 ">{{attrDatalist.price}}</span>
					</span>
					<!-- <span class="DP_old_price">
						<img src="./img/ml2.png" width="8px" height="9px">
						<span>590</span>
					</span> -->
				</div>
				<p class="DP_red">游击无公害，全场包邮</p>
			</div>
		</div>
	<!-- 	<div class="DP_Coupon white_bg">
			<div class="">11</div>
		</div> -->
	<!-- 	<div class="white_bg DP_Sales_box">
			<div class="DP_lf_title">促销:</div>
			<ul class="DP_Sales_rt">
				<li >
					<span class="whiteBlue_btn">抢购</span>
					<span class="DP_Sales_li">截止到11月09日 00:00:00</span>
				</li>
				<li >
					<span  class="whiteBlue_btn">抢购</span>
					<span class="DP_Sales_li">该商品可使用米粒儿最高抵扣 <span class="blue">59米粒儿</span></span>
				</li>
			</ul>
		</div> -->
		<div class="DP_list_Spec  white_bg" @click="showModel">
			<span class="DP_list_Spec_title">规格:</span>
			<span class="DP_list_Specbox" v-if="datalist.mallGoodAttrInfoDTO==null"> {{addShopInfo.amount}}件</span>
			<span class="DP_list_Specbox" v-if="datalist.mallGoodAttrInfoDTO!=null&&datalist.mallGoodAttrInfoDTO.length==1 && searchAttr.attrValue1!=''"> {{addShopInfo.amount}}件,  {{searchAttr.attrValue1}}</span>
			<span class="DP_list_Specbox" v-if="datalist.mallGoodAttrInfoDTO!=null&&datalist.mallGoodAttrInfoDTO.length==2 && searchAttr.attrValue1!=''&& searchAttr.attrValue2!=''"> {{addShopInfo.amount}}件,  {{searchAttr.attrValue1}},{{searchAttr.attrValue2}}</span>
			<span class="DP_list_Specbox" v-if="datalist.mallGoodAttrInfoDTO!=null&&datalist.mallGoodAttrInfoDTO.length==3 && searchAttr.attrValue1!=''&& searchAttr.attrValue2!=''&& searchAttr.attrValue3!=''"> {{addShopInfo.amount}}件,  {{searchAttr.attrValue1}},{{searchAttr.attrValue2}},{{searchAttr.attrValue3}}</span>
			<span class="DP_list_Specbox" v-if="datalist.mallGoodAttrInfoDTO!=null&&datalist.mallGoodAttrInfoDTO.length==4 && searchAttr.attrValue1!=''&& searchAttr.attrValue2!=''&& searchAttr.attrValue3!=''&& searchAttr.attrValue4!=''"> {{addShopInfo.amount}}件,  {{searchAttr.attrValue1}},{{searchAttr.attrValue2}},{{searchAttr.attrValue3}},{{searchAttr.attrValue4}}</span>
				<span class="DP_list_Specbox" v-if="datalist.mallGoodAttrInfoDTO!=null&&datalist.mallGoodAttrInfoDTO.length==5 && searchAttr.attrValue1!=''&& searchAttr.attrValue2!=''&& searchAttr.attrValue3!=''&& searchAttr.attrValue4!=''&& searchAttr.attrValue5!=''"> {{addShopInfo.amount}}件,  {{searchAttr.attrValue1}},{{searchAttr.attrValue2}},{{searchAttr.attrValue3}},{{searchAttr.attrValue4}},{{searchAttr.attrValue5}}</span>
			<img class="icon_jt" width="9px" height="10px" src="./img/jt.png">
		</div>
		<div class="DP_list_Spec  white_bg" @click="showCity">
			<span class="DP_list_Spec_title">配送地区:</span>
			<span class="blue DP_list_Specbox " v-if="datalist.supportAreaList==null"> 大陆除海南、新疆、青海...</span>
			<span class="blue DP_list_Specbox " v-if="datalist.supportAreaList!=null&&datalist.supportAreaList.length==1"> 该商品仅配送{{datalist.supportAreaList[0].provinceName}}地区</span>
			<span class="blue DP_list_Specbox " v-if="datalist.supportAreaList!=null&&datalist.supportAreaList.length>=2"> 该商品仅配送{{datalist.supportAreaList[0].provinceName}}、{{datalist.supportAreaList[1].provinceName}}等部分地区</span>
			<img class="icon_jt" width="9px" height="10px" src="./img/jt.png">
		</div>
		<div class="white_bg DP_servers">
			<div class="DP_servers_top">
					<span class="DP_list_Spec_title">服务:</span>
				<span class="DP_list_Specbox black_font"> 该商品由 <span class="b_font"> {{datalist.userName}}</span> 销售并提供售后服务。</span>
		
			</div>
			<div class="DP_servers_bot">
				<div class="wide_btn_blue">进入店铺》</div>
			</div>
		</div>
	<!-- 	<div class="DP_evel-list white_bg">
			<div class="DP_evel_title">评价:</div>
			<ul>
				<li class="DP_evel">
					<div class="DP_star_wrapper">
						<img src="./img/star.png">
					</div>
					<div class="DP_evel_text">
               			 不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.
					</div>
					<div class="DP_evel_img">
						<img src="./img/swiper.png">
						<img src="./img/swiper.png">
					</div>
					<div class="DP_evel_user">
						丰富**发表于 <span class="DP_evel_rateTime">10月12日</span>
					</div>
				</li>
			</ul>
			<div class="Dp_evel_btn">
				<span class="whiteBlue_longbtn">查看全部125条评论>></span>
			</div>
		</div> -->
		<div class="DP_goods_introduce white_bg">
			<div class="DP_goods_title">商品介绍</div>
			<ul class="DP_goods_box">
				<li v-html="datalist.details">
					
				</li>
			</ul>
		</div>
		<div class="DP_shopCard ">
			<div class="DP_shopCard_lf">
				<!-- <div class="DP_shop_one">
					<img src="./img/DP_iconst.png"  width="20px" height="20px">
					<p>收藏</p>
				</div> -->
				<div class="DP_shop_two" @click="ShoppingCard()">
					<img src="./img/DP_iconst2.png" width="20px" height="20px">
					<p>购物车</p>
				</div>
			</div>
			<div class="DP_shopCard_rt">
				<div class="DP_shopping" @click='showModel()'>
					加入购物车
				</div>
				<div class="DP_buy" @click='showModel()'>
					立即购买
				</div>
			</div>
		</div>


		<!--  摸态框-->
		<div class="model_box" v-if="clicked==true" >
			<div class="model" v-if="clicked==true"  @click="showModel">
			 </div>  
			<div class="change_spec"  v-if="clicked==true" >
				<div class="change_header">
					<div class="change_header_img">
						<img :src='searchAttr.picture' width="100%" height="100%">
					</div>
					<div class="change_header_money">
						<h4> 
							<img src="./img/ml.png"> 
							<!-- 	<b v-if="priceFlag==0 && datalist.attrFlag==1 && datalist.minPrice != datalist.maxPrice">{{datalist.minPrice}}~{{datalist.maxPrice}}</b>
								<b v-if="priceFlag==0 &&  datalist.attrFlag==0 || (datalist.minPrice == datalist.maxPrice)">{{datalist.minPrice}}</b> -->
								<b v-if="priceFlag==0 ">{{datalist.minPrice}}</b>
								<b v-if="priceFlag==1 ">{{attrDatalist.price}}</b>
						</h4>
						<p  v-if="priceFlag==0" class="gray_fonts">库存：{{datalist.stockNo}}件</p>
						<p  v-if="priceFlag==1 " class="gray_fonts">库存：{{attrDatalist.amount}}件</p>
					</div>
				</div>
				<ul class="change_spec_content">
					<li v-for="(items, index) in datalist.mallGoodAttrInfoDTO">
						<div class="change_width">
							<div class="change_title">
								{{items.attrValue}}
							</div>

							<div class="change_content_box"  >
<span class="empty_bluebtn" :class="map.get(items.fieldValue)==items.strArray[index]?'empty_bluebtn':'empty_whitebtn'"  @click="searchAttrFn(items.fieldValue,items.strArray[index],datalist.mallGoodAttrInfoDTO.length)" v-for="(strArray,index) in items.strArray">{{strArray}}
</span>
								<!-- <span class="empty_whitebtn">1.5kg装</span> -->
							</div>
						</div>
					</li>
			

				</ul>
				<div class="change_spec_number">
					<span class="change_title">数量</span>
					<div class="DP_number">
				        <span class="decrease" v-on:click="decreaseCart()">-</span>
				        <span class="DP_num">{{addShopInfo.amount}}</span>
				        <span class="increase"  v-on:click="addCart()">+</span>
				    </div>
				</div>
				<div class="change_footer">
					<div class="change_footer_lf"  @click="addShop(0)">加入购物车</div>
					<div class="change_footer_rt" @click="addShop(1)">立即购买</div>

				</div>
			</div>
		</div>
		
		<div class="model_box" v-if="viewcity==true" >
			<div class="model" v-if="viewcity==true"  @click="showCity">
			 </div>  
			<div class="Shipping_address" v-if="viewcity==true">
				<div class="change_width">
					<span v-if="datalist.supportAreaList!=null&&datalist.supportAreaList.length>0">
						<div class="shipping_title">仅配送一下地区:</div>
						<ul class="shippingAdd_ul">
							<li class="shippingAdd_list"  v-for="(areaItem,index) in datalist.supportAreaList">
								<div class="shippingAdd_list_lf">
									{{areaItem.provinceName}} :
								</div>
								<ul class="shippingAdd_list_rt">
									<li>
										<span class="empty_bluebtn" v-for="(cityItem,index) in areaItem.cityArray">{{cityItem.cityName}}</span>
									</li>
									
								</ul>
							</li>
						</ul>
						<div class="shipping_footer">
							除以上地区外，其他地区不支持配送，敬请谅解！
						</div>
					</span>

					<span v-if="datalist.supportAreaList==null">
						<ul class="shipping_all" >
							大陆除海南、新疆、青海、西藏、港澳台、黑龙江漠河外，其他地方均可配送。
						</ul>
					</span>
					
				</div>
				<div class="shipping_add_btn" @click="showCity">
						关闭
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
import {setCookie,getCookie} from '../cookie/cookie.js'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
export default{
	name:'DetailsPage',
	data(){  
		return {
			clicked:false,
			viewcity:false,
			datalist:[],
			searchInfo:{
				mallId:getCookie('mallId'),
				goodsId:this.$route.query.goodsId
			},
			searchAttr:{
				mallId:getCookie('mallId'),
				goodsId:this.$route.query.goodsId,
				attrValue1:'',
				attrValue2:'',
				attrValue3:'',
				attrValue4:'',
				attrValue5:''
			},
			addShopInfo:{
				openId:getCookie('openId'),
				openId:getCookie('openId'),
				mallId:getCookie('mallId'),
				mobile:getCookie('mobile'),
				attrvalId:'',
				goodsId:this.$route.query.goodsId,
				amount:1,
				buyNowFlag:''
			},
	
			attrDatalist:[],
			priceFlag:0,//标志价格,
			number:1,
			on:'',
			map:new Map()
		}
	},

	methods:{
		serachInfo(){
	    	var url = this.$store.state.localHostUrl +'/searchMallGoodsDetail.json'
	    	var data= qs.stringify(this.searchInfo)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
	      		function (res){
      				if(!res.data.ret){
      					console.log(res.data.data)
      					that.datalist=res.data.data
      				}
					else{
						alert(res.data.descript)
					}
	      		}
	      	)
	    },
	    searchAttrFn(level,index,length){
	    	if(level==1){
	    		this.map.set(1,index)
	    		this.searchAttr.attrValue1=index
	    	}else if(level==2){
	    		this.map.set(2,index)
	    		this.searchAttr.attrValue2=index
	    	}else if(level==3){
	    		this.map.set(3,index)
	    		this.searchAttr.attrValue3=index
	    	}else if(level==4){
	    		this.map.set(4,index)
	    		this.searchAttr.attrValue4=index
	    	}else{
	    		this.map.set(5,index)
	    		this.searchAttr.attrValue5=index
	    	}
	    	if(this.datalist.mallGoodAttrInfoDTO!=null){
	    		if(length==1){
					if(this.searchAttr.attrValue1!=''){
				    	this.getAttr()
					}
				}else if(length==2){
					if(this.searchAttr.attrValue1!='' && this.searchAttr.attrValue2!=''){
				    	this.getAttr()
					}
				}else if(length==3){
					if(this.searchAttr.attrValue1!='' && this.searchAttr.attrValue2!=''&& this.searchAttr.attrValue3!=''){
				    	this.getAttr()
					}
				}else if(length==4){
					if(this.searchAttr.attrValue1!='' && this.searchAttr.attrValue2!='' && this.searchAttr.attrValue3!='' && this.searchAttr.attrValue4!=''){
				    	this.getAttr()
					}
				}else{
					if(this.searchAttr.attrValue1!='' && this.searchAttr.attrValue2!='' && this.searchAttr.attrValue3!='' && this.searchAttr.attrValue4!='' && this.searchAttr.attrValue5!=''){
				    	this.getAttr()
					}
				}
	    	}
			
	    },
	    getAttr(){
	    	var url = this.$store.state.localHostUrl +'/searchMallGoodsByAttr.json'
	    	var data= qs.stringify(this.searchAttr)
			var that = this
			that.$http.post(url,data,{emulateJSON:true}).then(
	      		function (res){
      				if(!res.data.ret){
      					that.priceFlag=1
      					that.attrDatalist=res.data
      					console.log(res.data)
      				}
					else{
						alert(res.data.descript)
					}
	      		}
	      	)
	    },
		addShop(buyflag){
			if(buyflag==0){
				this.addShopInfo.buyNowFlag=''
			}else if(buyflag==1){
				this.addShopInfo.buyNowFlag=1
			}
			if(this.priceFlag==1 || this.datalist.mallGoodAttrInfoDTO==null){
				
				this.clicked=!this.clicked
				this.addShopInfo.attrvalId=this.attrDatalist.attrvalId
				this.addShopInfo.amount=this.addShopInfo.amount
	

				var url = this.$store.state.localHostUrl +'/addMallCartGoodsInfo.json'
		    	var data= qs.stringify(this.addShopInfo)
				var that = this
				that.$http.post(url,data,{emulateJSON:true}).then(
		      		function (res){
	      				if(!res.data.ret){
	      					if(buyflag==1){
	      						that.$router.push({path:'/EOrderedFoodList'})
	      					}
	      				}
						else{
							alert(res.data.descript)
						}
		      		}
		      	)
			}
		},

	    //摸态框禁止后面滑动
		// stop(){
	 //  	  let mo=function(e){e.preventDefault()}
		// 	document.body.style.overflow='hidden';
  // 			document.addEventListener("touchmove",mo,false);//禁止页面滑动
		// },
		//  move(){
	 //  	   let mo=function(e){e.preventDefault()}
		//     document.body.style.overflow='';//出现滚动条
		//     document.removeEventListener("touchmove",mo,false);
		// },
		showModel(){
			console.log(this.clicked)
			this.clicked=!this.clicked
			// if(	this.clicked== true){
			// 	// this.stop()
			// }else{
			// 	// this.move()

			// }
		},
		showCity(){
			//console.log(this.viewcity)
			this.viewcity=!this.viewcity
		},
		decreaseCart(){
			if(this.addShopInfo.amount>1) this.addShopInfo.amount--;
		},
		addCart(){
			if(this.addShopInfo.amount) this.addShopInfo.amount++;
		},
		ShoppingCard(){
			this.$router.push({path:'/ShoppingCard'})
		}
	},
	mounted(){
		this.serachInfo()
		
	}
}
</script>
<style>
.Shipping_address .shipping_title{margin:23px 0 10px 0;font-size: 0.6rem;}
.shippingAdd_list{display: flex; }
.shippingAdd_list_lf{width: 50px;flex: 0 0 1;font-size: 0.6rem;height: 33px;line-height: 30px;}
.shippingAdd_list_rt{flex: 1;}
.shippingAdd_list_rt span{margin:0 8px 10px 0;}
.shippingAdd_ul{margin-bottom: 30px;}
.shipping_footer{color: red;margin-bottom: 29px;font-size: 0.55rem}
.shipping_add_btn{color: 0.6rem;color: #fff;background:#F08632; position: absolute;bottom: 0;width: 100%;text-align: center;height: 45px;line-height: 45px;}
.Shipping_address>.change_width{margin-bottom: 75px;}
.shipping_all{color: #F08632;margin-bottom: 45px;font-size: 0.7rem;margin-top:29px;}


.change_spec,.Shipping_address{ background: #fff;position: absolute;bottom: 0;width: 100%;left: 0px;z-index:1000;}
.change_header,.change_spec_content{width: 98%;margin:0 auto;}
.change_header{
	    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 75px;
    border-bottom: 1px solid #ddd;
}
.change_header_img{
	position: absolute;
    width: 110px;
    top: -50px;
    left: 10px;
    height: 110px;
    margin-right: 20px;
    border: 1px solid #000;
}
.change_header_money{  
  margin-left: 135px;
    margin-top: 22px;}
.change_header_money>h4 b{font-size: 1.4rem;color:#F08632;font-weight: bold;}
.change_header_money>.gray_fonts{font-size: 0.7rem;    margin-top: 5px;}
.change_spec_content li{border-bottom:1px solid #ddd;}
.change_width,.change_spec_number{width: 95%;margin:0 auto;}
.change_content_box>span{margin-right: 15px;margin-bottom: 10px;}
.change_footer{
	position: absolute;bottom: 0;width: 100%;
	height: 40px;
	line-height: 40px;display: flex;
}
.change_footer_lf,.change_footer_rt{
	 flex: 1;
    text-align: center;
    font-size: 0.6rem;
    color:#fff;
    font-weight: bold;
}
.change_footer_lf{ background: #F79E20;}
.change_footer_rt{background: #F08632;}






.DP_nav{height: 1.8rem;line-height: 1.8rem;display: flex;}
.DP_nav_lf{flex: 1;font-size: 0.75rem;color:#434343;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
.DP_nav_rt{flex:0 0 100px;width: 100px;}	
.DP_nav_rt>img{vertical-align: middle;}
.DP_icon1{padding-left: 15px;}
.DP_swiper{height: 300px;width: 93%;margin:0 auto;padding: 15px 0 ;}
/*.mint-swipe-items-wrap > div.is-active{padding: 20px;}*/
.DP_swiper_img{
	height: 300px;
}
.DP_swiper_img{text-align: center;}
.DP_swiper_img>img{	    max-width: 100%;
    max-height: 100%;height: 100%;
    width: 100%;}
.DP_introduction{border-top:1px solid #D8D8D8;margin:0 auto;}
.DP_title{font-size: 0.75rem;color:#434343;margin: 13px 0;text-align: left;}
.DP_new_price{

}
.DP_new_price>span{font-size: 1.4rem;margin-left: 2px;color:#F08632;}
.DP_old_price{margin-left: 11px;font-size: 0.5rem;    text-decoration: line-through;color:#BFBFBF;}
.DP_old_price>span{color: #BFBFBF}
.DP_red{padding:12px 0 16px 0; font-size: 0.7rem;color: #E60012;}
.DP_Coupon{ height: 100px; }
.DP_Sales_box{display: flex;}
.DP_lf_title{flex: 0 0 47px; width: 47px;text-align: center;    font-size: 0.7rem;}
.DP_Sales_rt{flex: 1;}
.DP_Sales_box{padding:13px 0;}
.DP_Sales_rt li {margin-bottom: 8px;}

.DP_Sales_li{font-size: 0.55rem}

.DP_list_Spec{position: relative; height: 50px;line-height: 50px;}
.DP_list_Spec_title{width: 47px;text-align: left;font-size: 0.75rem}
.DP_list_Specbox{padding-left: 10px;color: #969696;font-size: 0.75rem}
.icon_jt{position: absolute;right: 15px;top:50%;transform:translateY(-50%);}
.DP_list_Spec .blue{color:#F08836;}
.b_font{font-weight: bold;color: #F08836;}
.black_font{color:#000;}
.DP_servers_top{height: 50px;line-height: 50px;}
.DP_servers_bot{padding:14px 0;border-top:1px solid #d8d8d8;}
.DP_servers_bot>.wide_btn_blue{width: 100px;margin:0 auto;height: 30px;line-height: 30px;font-size: 0.75rem}
/*.DP_evel_btn{padding:10px 12px;color:#488AC8;border:1px solid #F08632;text-align: center;margin:0 auto;font-size: 0.6rem;}*/
.DP_evel{border-bottom: 1px solid #d8d8d8}
.DP_evel_title{padding-top:13px;font-size:0.7rem; }
.DP_star_wrapper{padding-top:13px;}
.DP_star_wrapper>img{width: 13px;height: 12px;}
.DP_evel_text{font-size: 0.6rem;padding:13px 0; line-height: 15px;}
.DP_evel_img>img{max-width: 80px;max-height: 80px;margin:0 5px;}
.DP_evel_user{font-size: 0.5rem;text-align: right;margin:3px 9px 7px 0;}
.Dp_evel_btn{text-align: center;padding:10px 0;}
.DP_goods_title{font-size: 0.75rem;padding: 13px 0;}
.DP_goods_box{width: 100%;}
.DP_goods_box>li{padding-bottom:5px;}
.DP_goods_box img{max-width: 100%;}
.DP_goods_introduce{margin-bottom:60px;}
.DP_shopCard{position: fixed;bottom: 0;left: 0;width: 100%; height: 44px;display: flex;background: #fff;}
.DP_shopCard_lf{flex: 0 0 1; width: 110px;display: flex;}
.DP_shopCard_rt{flex: 1;display: flex;}
.DP_shopping,.DP_buy{font-size: 0.75rem;color:#fff; font-weight: bold;line-height: 44px;}
.DP_shopping{flex: 1;background: #FFA82B;text-align: center;font-size: 0.75rem;}
.DP_buy{	flex: 0 0 1;width: 90px;background: #F08632;text-align: center;}
.DP_shop_one,.DP_shop_two{flex:1;text-align: center;}
.DP_shop_two>p,.DP_shop_one>p{font-size: 0.65rem;color:#959595;}
.DP_shop_two>img,.DP_shop_one>img{margin-top:5px ;}
.model_box{    position: fixed;
    bottom: 0;
    /*background: rgba(1,1,1,0.8);*/
    width: 100%;
    height: 100%;}
.model_box>.model{    position: absolute;
    top: 0;
    bottom: 0px;
  }
</style>