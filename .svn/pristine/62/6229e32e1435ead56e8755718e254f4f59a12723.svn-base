<template>
<div>
	<div class="OnlineOrder">
		<div class="OnlineO_header">
			<img src="./img/onlineo_bg.png" width="100%" height="83px">
		</div>
	</div>
	<div class="Online_goods">
		<div class="menu-wrapper"  ref="menuWrapper">
			<ul>
				<li v-for="(items,index) in datalist" @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
					<span class="text">
						{{items.familyName}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" id="wrapper"  ref="foodsWrapper" >
			<ul>
				<li class="food-list food-list-hook"  v-for="(items,indexA) in datalist">
					<h1>{{items.familyName}}</h1>
					<ul>
						<li class="food-item"  v-for="(item,indexB) in items.goodsInfo">
							<div class="icon">
								<img width="52px" height="40px" src="./img/foods-icon.png">
							</div>
							<div class="content">
								<h2>{{item.goodsName}}</h2>
								<div class="price">
									<span class="newPrice">
										<span class="unit"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/></span>{{item.goodsPrice}}
									</span>
								</div>
								<div class="Online_Surplus">{{item.stockNo}}</div>
								{{food.count}}
								<counter v-model="food.counts[item.goodsId]" :counter="item"  v-on:listenToChildEvent="count(item.goodsPrice,item.goodsId)" ></counter>
								</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div class="shopCart">
		<div class="Online_content">
			<div class="Online_content-left">
				<div class="Online_shop_card">
					<div class="Online_logo">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="Online_price"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{food.price}} <span>({{food.count}}份)</span></div>
				</div>
			</div>
			<div class="Online_content-right" @click="ChooseOk()">选好了</div>
		</div>
	</div>
</div>
	
</template>
<script>
import {setCookie,getCookie} from '../../cookie/cookie.js'
import BScroll from 'better-scroll'
import counters from '@/components/counter'
import qs from 'qs'
import Vue from 'vue'

Vue.use(counters)

const ERR_OK = 0
const eventHub = new Vue()
export default{
	name: 'OnlineOrder',
	created() {
		this.$nextTick(() => {
		  this._initScroll(); // 初始化scroll
		  this._calculateHeight(); // 初始化列表高度列表
		})
	},
	data() {
	 	return {
	 		food:{
	 			count:0,
	 			price:0,
	 			counts:[]
	 		},
	 		tempCount:[],
	 		tempPrice:[],
	 		goodsId:'',
	 		Attr_info:[],
	 		ChooseInfo:{
	 			merId:getCookie('merId'),
	 			mobile:getCookie('mobile'),
	 			openId:getCookie('openId'),
 				GoodsInfo:''
	 		},
	      listHeight: [],
	      foodsScrollY: 0,
	      orderInfo:{
				merId:getCookie('merId'),
				mobile:getCookie('mobile'),
				openId:getCookie('openId')
			},
	 	}
	},
 	computed:{
	    menuCurrentIndex() {
			for (let i = 0, l = this.listHeight.length; i < l; i++) {
				let topHeight = this.listHeight[i]
					let bottomHeight = this.listHeight[i + 1]
					if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
					  return i
					}
				}
			return 0
	    },
		datalist(){
		   return this.$store.state.GoodsInfo.result
		}
	},
	methods: {
		_initScroll() {
		  this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
		    click: true
		  });
		  this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
		    click: true,
		    probeType: 3
		  });
		  // 监控滚动事件
		  this.foodsScroll.on('scroll', (pos) => {
		    this.foodsScrollY = Math.abs(Math.round(pos.y))
		  })
		},
	    _calculateHeight() {
	      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
	      let height = 0
	      this.listHeight.push(height)
	      for (let i = 0, l = foodList.length; i < l; i++) {
	        let item = foodList[i]
	        height += item.clientHeight
	        this.listHeight.push(height)
	      }
	    },
	    menuClick(index, event) {
	      if (!event._constructed) {
	        return
	      }
	      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
	    },
		count(g,id){
			// if(type==1){
				let count=0,price=0;
				this.tempCount['"'+id+'"']=this.food.counts[id];
				this.tempPrice['"'+id+'"']=this.food.counts[id]*g;
				for(let v in this.tempCount) { 
					count +=this.tempCount[v];
					price +=this.tempPrice[v];
				}
				this.food.count = count;
				this.food.price = price;
			// }
		},
		ChooseOk(){
			var url= this.$store.state.localHostUrl+'/addCartGoodsInfo.json' 
			// console.log(this.tempCount)
			// for(let v in this.tempCount) { 
			// 	console.log(v+":",this.tempCount[v])
			// }

			// var formData=qs.stringify({"goodsInfo":this.tempCount,"merId":this.ChooseInfo.merId,"mobile":this.ChooseInfo.mobile,"openId":this.ChooseInfo.openId});
			
			var formData=qs.stringify(this.tempCount)+'&'+ qs.stringify({"merId":this.ChooseInfo.merId,"mobile":this.ChooseInfo.mobile,"openId":this.ChooseInfo.openId})
				var that= this
				that.$http.post(url,formData,{emulateJSON:true}).then(
					function(res){
						if(!res.data.ret){
							that.$router.push('/OrderedFoodList')
						}
						else{
							alert(res.data.ret)
						}
					}
				)
		},
		getCartGood(){
			var url= this.$store.state.localHostUrl+'/searchCartGoodsInfo.json' 
			var formData=qs.stringify(this.orderInfo)
			var that=this
			that.$http.post(url,formData,{emulateJSON:true}).then(
				function(res){
					if(!res.data.ret){
						// that.datalist=res.data.data
						var map = res.data.data
						let count=0,price=0;
						for(let i=0; i<map.length;i++){ 
							that.food.counts=map[i].goodsId
							that.count(map[i].price,map[i].amount)
							that.tempCount['"'+map[i].goodsId+'"']=map[i].amount;
							that.tempPrice['"'+map[i].goodsId+'"']=map[i].price;
							count=map[i].amount
							price=map[i].price
							console.log(that.food.counts) 
						}

						that.food.count = count;

						that.food.price = price;
					}
					else{
						alert(res.data.descript)
					}
				}
			)
		}
	},
	created(){
  		this.getCartGood()
  	}
}
</script>

<style scoped>
	.OnlineOrder{
		position: relative;
	}
	.OnlineO_header{
		position: absolute;
		top: 0;
	    left: 0;
	    width: 100%;
	}
	.Online_goods{
		display: -ms-flexbox;
	    display: flex;
	    position: absolute;
	    top: 81px;
	    bottom: 48px;
	    width: 100%;
	    overflow: hidden;
	}
	.menu-wrapper{
	-ms-flex: 0 0 104px;
    flex: 0 0 104px;
    width: 104px;
    background: #fff;
    margin-top: 4px;
	}
.Online_goods .menu-item,.Online_goods .menu-item-selected{
    position: relative;
    display: table;
    height: 54px;
    line-height: 14px;
    width: 90px;
    padding: 0 7px;
	}
.Online_goods .menu-item-selected{
	 background: #fff;
	 margin-top: -1px;
}
.Online_goods .text{
	display: table-cell;
    vertical-align: middle;
    font-size: 12px;
    font-weight: 200;
    white-space: normal;
    line-height: 14px;
    border-bottom: 1px solid #B6B6B6;
    position: relative;
}
.menu-item-selected .text{
	border:none;
	color:#325496;
}
.menu-item{
	background: #EAEAEA;
}
.Online_icon{
    position: absolute;
    right: 8px;
    top: 5px;
    display: block;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    color: #fff;
    background: red;
    text-align: center;
    line-height: 15px;
    /* padding: 10px; */
    font-size: 9px;
}
.Online_goods .foods-wrapper {
    -ms-flex: 1;
    flex: 1;
    margin-top: 2px;
    background: #fff;
}
.Online_goods .foods-wrapper .food-list h1 {
	height: 20px;
    line-height: 20px;
    padding-left: 12px;
    font-size: 12px;
    color: #325496;
    background: #fff;
    border-left: 3px solid #325496;
    border-bottom: 1px solid #FDFDFD;
    margin: 3px 0;
}
.foods-wrapper .food-item{
	position:relative;
	display: flex;
	display: -ms-flexbox;
	margin:0 18px;
    padding: 8px 0 0 0;
	 border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food-item .icon {
    -ms-flex: 0 0 57px;
    flex: 0 0 57px;
}
 .food-item .content {
    -ms-flex: 1;
    flex: 1;
    padding-left: 10px;
}
.food-item .content h2 {
    margin: 2px 0 8px 0;
    font-size: 15px;
    line-height: 14px;
    height: 14px;
}
.content .price {
    font-size: 10px;
    font-weight: 700;
    line-height: 24px;
}
.newPrice{
    font-size: 14px;
    color: #f01414;
}
.unit{
	    font-size: 10px;
    font-weight: normal;
}

</style>