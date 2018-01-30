<template>
  <div id="app">
    <!-- <router-view v-wechat-title="$route.meta.title"/> -->
    <keep-alive>
        <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件 -->
        </router-view>
    </keep-alive>

    <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>
<script>
// import minitUi from 'assets/minit-ui.js'
import {setCookie,getCookie,delCookie} from './cookie/cookie.js'
export default {
  name: 'app',
  methods:{
  	 //   weixinPay:function(data){
    //       var vm= this;
    //       if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
    //         if( document.addEventListener ){
    //           document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
    //         }else if (document.attachEvent){
    //           document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
    //           document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
    //         }
    //       }else{
    //         vm.onBridgeReady();
    //       }
    //     },
    //  onBridgeReady() {  
    //        WeixinJSBridge.invoke('hideOptionMenu',{},function(res){
    //       }
    //   )
    // }
    getUrlKey (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
    },
    test(){
        // let cssFlag = this.getUrlKey('mallType ')
        let cssFlag=0
        setCookie('cssFlag',cssFlag,1000*60)
        var style=document.documentElement.style
        //0是橙色的，1是红色的
        if(cssFlag==0){
            require('./assets/orange-theme/reset.css')
        }else{
           //  let redcolor='#F81D31'
           //  let btnlf='#FF494B'
           //  let btnrt='#F81D31'
           //  let mainbackground='#DC2D3C';
           //  style.setProperty('--red-color', redcolor);
           //  style.setProperty('--btn-lf', btnlf);
           //  style.setProperty('--btn-rt',  btnrt);
           // style.setProperty('--main-background', mainbackground);
            require('./assets/red-theme/reset.css')
        }
        //读取css样式
        // const rootStyles = getComputedStyle(document.documentElement);
        // const varValue=rootStyles.getPropertyValue('--red-color');
        // let value='#2BBCD3'
        //设置css样式
        // document.documentElement.style.setProperty('--red-color', value);
    },
   
},
mounted(){
    // this.weixinPay();
    //let qw=require("./assets/css/reset.css")
    //console.log(qw);
    this.test()
}
}
</script>
  
<style>
  @import 'assets/css/bootstrap.css';
  @import 'assets/css/minit_style.css';

  @import 'assets/icon-style.css';
  @import 'assets/css/publicstyle.css';

  /*@import 'assets/css/reset.css';*/
 

</style>
