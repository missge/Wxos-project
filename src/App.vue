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
import qs from 'qs'
import Vue from 'vue'
export default {
  name: 'app',
  data(){
    return{
      mallId:getCookie('mallId')
    }
  },
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
    getmallType(){
        var url = this.$store.state.localHostUrl +'/getMallType.json'
        var data= qs.stringify({mallId:this.mallId})
        var that = this
        that.$http.post(url,data,{emulateJSON:true}).then(
            function (res){
                if(res.data.ret == 0){
                    let cssFlag = res.data.mallType 
                    setCookie('cssFlag',cssFlag,1000*60)
                    if(cssFlag==0){
                        import('./assets/orange-theme/reset.css')
                    }else if(cssFlag==1){
                        import('./assets/red-theme/reset.css')
                    }
                }
            }

        )
      }
    // getUrlKey (name) {
    //   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
    // },
    // test(){
        // let cssFlag = this.getUrlKey('mallType')
        // let cssFlag=1
        // setCookie('cssFlag',cssFlag,1000*60)
        // var style=document.documentElement.style
        //0是橙色的，1是红色的
        // if(cssFlag==0){
            // require('./assets/orange-theme/reset.css')
            // import('./assets/orange-theme/reset.css')
          

        // }else if(cssFlag==1){
            // require('./assets/red-theme/reset.css')
          

            // import('./assets/red-theme/reset.css')
           //  let redcolor='#F81D31'
           //  let btnlf='#FF494B'
           //  let btnrt='#F81D31'
           //  let mainbackground='#DC2D3C';
           //  style.setProperty('--red-color', redcolor);
           //  style.setProperty('--btn-lf', btnlf);
           //  style.setProperty('--btn-rt',  btnrt);
           // style.setProperty('--main-background', mainbackground);
        // }
        //读取css样式
        // const rootStyles = getComputedStyle(document.documentElement);
        // const varValue=rootStyles.getPropertyValue('--red-color');
        // let value='#2BBCD3'
        //设置css样式
        // document.documentElement.style.setProperty('--red-color', value);
    // },
   
},
mounted(){
        // this.weixinPay();
        //let qw=require("./assets/css/reset.css")
        //console.log(qw);
        this.getmallType();
        //判断数组中是否包含某字符串  
        // Array.prototype.contains = function(needle) {  
        //     for (i in this) {  
        //         if (this[i].indexOf(needle) > 0)  
        //             return i;  
        //     }  
        //     return -1;  
        // }  
      
        // var device_type = navigator.userAgent;//获取userAgent信息  
        // console.log(device_type);//打印到页面  
        // var md = new MobileDetect(device_type);//初始化mobile-detect  
        // var os = md.os();//获取系统  
        // var model = "";  
        // if (os == "iOS") {//ios系统的处理  
        //     os = md.os() + md.version("iPhone");  
        //     model = md.mobile();  
        // } else if (os == "AndroidOS") {//Android系统的处理  
        //     os = md.os() + md.version("Android");  
        //     var sss = device_type.split(";");  
        //     var i = sss.contains("Build/");  
        //     if (i > -1) {  
        //         model = sss[i].substring(0, sss[i].indexOf("Build/"));  
        //     }  
        // }  

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
