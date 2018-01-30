<template>
	<div class="footer_bot">
		<mt-tabbar>
			<mt-tab-item id="tab1" >
				<div  @click="goPage('Ehome')" :class="{'on': clicked === 'Ehome' }" >
					<span class="icon1" ></span>
					<p class="icon_font">首页</p>
				</div>
				
			</mt-tab-item>
			<mt-tab-item id="tab2" >
				<div  @click="goPage('CategoryPage')" :class="{'on': clicked === 'CategoryPage' }">
					<span class="icon2" ></span>
					<p class="icon_font" >分类</p>
				</div>
			</mt-tab-item>
			<mt-tab-item id="tab3" >
				<div  @click="goPage('ShoppingCard')"  :class="{'on': clicked === 'ShoppingCard' }">
					<span class="icon3" ></span>
					<p class="icon_font">购物车</p>
				</div>
			</mt-tab-item>
			<mt-tab-item id="tab4" >
				<div @click="goPage('PersonalCenter')" :class="{'on': clicked === 'PersonalCenter' }">
					<span class="icon4" ></span>
					<p  class="icon_font">我的</p>
				</div>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
import router from '@/router'
import {setCookie,getCookie} from '../cookie/cookie.js'

import qs from 'qs'
import Vue from 'vue'
	export default{
		name:'footer',
		data(){
			return {
				clicked:'Ehome',
         		getUrl:getCookie('getUrl')

			}
		},
		methods:{
			goPage(Gopage){
				 this.clicked = Gopage
				if(Gopage=='PersonalCenter'){
					window.location.href=this.getUrl
				}else{
					this.$router.push({path:'/'+Gopage})
				}
			}
		}
	}
</script>
<style>

</style>