<template>
	<div>
		<div class="OnlineOrder">
			<div class="OnlineO_header">
				<img src="./img/onlineo_bg.png" width="100%" height="83px">
			</div>
		</div>
		<div class="Online_goods">
			<div class="menu-wrapper"  ref="menuWrapper">
				<ul v-show="items.goodsInfo.length>0" v-for="(items,index) in datalist">
					<li   @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
						<span class="text">
							{{items.familyName}}
						</span>
							<i v-if="familyGoodsNum[index]>0" class="Online_icon">{{familyGoodsNum[index]}}</i>
							
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" id="wrapper"  ref="foodsWrapper" >
				<ul>
					<li class="food-list food-list-hook"  v-for="(items,indexA) in datalist" v-show="items.goodsInfo.length>0">
						<h1>{{items.familyName}}</h1>
						<ul>
							<li class="food-item"  v-for="(item,indexB) in items.goodsInfo" >
								<div class="icon">
									<!-- <img src="./img/onlineo_bg.png"> -->
									<img :src="item.photoUrl">
								</div>
								<div class="content">
									<h2>{{item.goodsName}}</h2>
									<div class="price">
										<span class="newPrice">
											<span class="unit"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/></span>{{item.goodsPrice}}
										</span>
									</div>
									<div class="Online_Surplus" v-if="item.stockNo>50">数量充足</div>
										<div class="Online_Surplus yellow_color" v-if="item.stockNo<=50">剩余:{{item.stockNo}}份</div>
									<counter v-model="food.counts[item.goodsId]" :item="item"  v-on:listenToChildEvent="count(item.goodsPrice,item.goodsId)" ></counter>
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
					<div class="Online_shop_card" >
						<div class="Online_logo">
							<i class="icon-shopping_cart"></i>
						</div>
						<!-- <div class="Online_price"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{food.price}} <span>({{food.count}}份)</span></div> -->
						<div class="Online_price"><img class="ml4" width="10px" height="10px" src="../../assets/img/ml4.png"/>{{food.price}} <span>({{food.count}}份)</span></div>
					</div>
				</div>
				<div class="Online_content-right" @click="ChooseOk()">
					<span>选好了</span>
				</div>
			</div>
		</div>
			<div class="NothindMore" v-if="datalist.length==0">
				<img src="../../assets/img/timg.png" width="80px" height="80px">
				<p class="Nc_bot">抱歉，什么都没有</p>
			</div>
	</div>
</template>
<script>
	import {setCookie,getCookie} from '../../cookie/cookie.js'
	import BScroll from 'better-scroll'
	import counters from '@/components/counter'
	import qs from 'qs'
	import Vue from 'vue'
	import {Indicator,Loadmore} from 'mint-ui';
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
		 			count:'',
		 			price:'',
		 			counts:[]
		 		},
		 		tempCount:[],
		 		tempPrice:[],
		 		familyId:[],
		 		familyIdIndex:[],
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
				number:[],
				currentIndex: 0,
				scrollFlag: true,
				familyGoodsNum:[]
			
		 	}
		},
	 	computed:{
		  menuCurrentIndex() {
		  	if (this.scrollFlag){
					for (let i = 0, l = this.listHeight.length; i < l; i++) {
						let topHeight = this.listHeight[i]
						let bottomHeight = this.listHeight[i + 1]
						if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
							return i
						}
					}
				}
				return this.currentIndex
		  },
			datalist(){
			  return this.$store.state.GoodsInfo.result
			},
		},
		methods: {
			numberInit(){
				let  result=this.$store.state.GoodsInfo.result
				// var  num=[]
				for(let i=0 ;i<result.length;i++){
					var familyGoodsNum = 0
					this.familyIdIndex.push(result[i].familyId)
					console.log(this.familyIdIndex)
					for(let j=0;j<result[i].goodsInfo.length;j++){
						familyGoodsNum+=result[i].goodsInfo[j].number

					}
					this.familyGoodsNum.push(familyGoodsNum)
				}
			},
			init(){
				for(let v in this.$store.state.GoodsInfo.result){
					for(let w in this.$store.state.GoodsInfo.result[v].goodsInfo){
						//分类Id
						let familyId=this.$store.state.GoodsInfo.result[v].familyId
						let number = this.$store.state.GoodsInfo.result[v].goodsInfo[w].number,
							price = this.$store.state.GoodsInfo.result[v].goodsInfo[w].goodsPrice,
							goodsId = this.$store.state.GoodsInfo.result[v].goodsInfo[w].goodsId;
						if(number > 0){
							this.tempCount['"'+ goodsId +'"'] = number;
							this.tempPrice['"'+ goodsId +'"'] = number*price;
						}
						
						this.familyId['"'+ goodsId +'"'] = familyId;
						console.log(this.familyId)
					}

				}

				let count=0,price=0;
				for(let v in this.tempCount) { 
					count +=this.tempCount[v];
					price +=this.tempPrice[v];
				}
				this.food.count = count;
				this.food.price = this.toFixed(price,2);
			},
			_initScroll() {
    			

			  this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
			    click: true
			  });
			  this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
			    click: true,
			    probeType: 3
			  });
			  this.foodsScroll.on('scrollStart', () => {
			    this.scrollFlag = true;
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
		      this.currentIndex = index
		      this.scrollFlag = false;
		      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
		    },
		    toFixed(num, s) {
				var times = Math.pow(10, s)
				var	des = num * times + 0.5
				des = parseInt(des, 10) / times
				return des + ''
			},	
			count(g,id){
				var count=0,price=0;
				var old=0;
				this.tempCount['"'+id+'"']=this.food.counts[id];
				this.tempPrice['"'+id+'"']=this.food.counts[id]*g;
				for(let v in this.tempCount) { 
					count +=this.tempCount[v];
					price +=this.tempPrice[v];
				}
				old=this.food.count;
				this.food.count = count;
				this.food.price = this.toFixed(price,2);
				// 左上角
				var arr=[]
				arr=this.familyGoodsNum
				var that=this
				for(let i= 0;i<arr.length;i++){
					 if(that.familyIdIndex[i] == that.familyId['"'+id+'"']){
					 	if(old>count){
					 		arr[i] = arr[i]-1;
						 }else{
						 	arr[i] = arr[i]+1;
						 }

					 }
				}
				this.familyGoodsNum = arr
			},
			ChooseOk(){
				// if(this.food.count>0){
				// 	var url= this.$store.state.localHostUrl+'/addCartGoodsInfo.json' 
				// 	var formData=qs.stringify(this.tempCount)+'&'+ qs.stringify({"merId":this.ChooseInfo.merId,"mobile":this.ChooseInfo.mobile,"openId":this.ChooseInfo.openId})
				// 		var that= this
				// 		that.$http.post(url,formData,{emulateJSON:true}).then(
				// 			function(res){
				// 				if(!res.data.ret){
									

				// 					that.$router.push('/OrderedFoodList')
				// 				}
				// 				else{
				// 					alert(res.data.decript)
				// 				}
				// 			}
				// 		)
				// 	}
				//  else{
				// 	alert("购物车是空的")
				// 	return false
				// }

				this.$router.push('/OrderedFoodList')
			}
				
		},
		mounted(){
	  	  this.numberInit();

	  	  this.init();
	 	 }
	}
</script>

<style scoped>
	
</style>