<template>
  <div class="register">
    <div class="Wxos-regbg">
      <div class="reg-boxs">
        <div class="reg_table">
         <div class="img_log">
              <img src="./img/logo.png"  width="136px">
            </div>
          <form>
           
            <div class="reg_phone">
              <span class="reg_icon_phone"></span>
              <input class="" type="" name=""  maxlength="12" @keyup="filterNumber" @afterpaste="filterNumber"  v-model="Info.phone" placeholder="请输入手机号">
            </div>
            <div class="reg_phone reg_code_box">
              <div class="reg_code">
                <span class="reg_icon_code"></span>
                <input type="" name="" maxlength="6" @keyup="filterNumber" @afterpaste="filterNumber" v-model="Info.code"placeholder="验证码">
              </div>
              <div >
                  <span class="reg_getcode" v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                 <span class="reg_getcode" @click="send" v-if="!sendMsgDisabled">验证码</span>
              </div>
              
            </div>
            <div class="reg_bind" @click="loginFn">
              登录
            </div>
          </form>
        </div>
      </div>
      <img class="test_img"  src="./img/regbg.png">
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import router from '@/router'
import {setCookie,getCookie,delCookie} from '../../cookie/cookie.js'
export default {
  name: 'register',
  data () {
    return {
      Info:{
          phone:'',
          code:'',
          openId:'1'
      },
      sendMsgDisabled:false,
      time:60,
      regInfo:{
         openId:'',
          mallId:'',
          mobile:''
      }

    }
  },
   methods: {
    filterNumber(){
         this.Info.phone=this.Info.phone.replace(/\D/g,'')
      this.Info.code=this.Info.code.replace(/\D/g,'')
    },
    send(){
       var url=this.$store.state.localHostUrl+'/sendSMSCode.json'
       var formData=qs.stringify({'mobile':this.Info.phone,'mallId':getCookie('mallId')})
       var checkPhone=/^1[34578]\d{9}$/
     
       if(this.Info.phone == '' ){
        alert("请输入手机号")
        return false
       }
       if(!(checkPhone.test(this.Info.phone))){ 
          alert("手机号码有误，请重填") 
          return false
        } 
       else{
          this.$http.post(url,formData,{emulateJSON: true}).then(
              function(res){
                    console.log(res.data)
                    if(!res.data.ret){
                        // alert(res.data.descript)
                    }else{
                         // alert(res.data.descript)
                    }
              }
          )
          let me = this;
          me.sendMsgDisabled = true;
          let interval = window.setInterval(function() {
           if ((me.time--) <= 0) {
            me.time = 60;
            me.sendMsgDisabled = false;
            window.clearInterval(interval);
           }
          }, 1000);
        }
      },
    loginFn:function(){
        var url=this.$store.state.localHostUrl+'/checkSMSCode.json'
         var formData=qs.stringify({'mobile':this.Info.phone,'code':this.Info.code})
         var checkPhone=/^1[34578]\d{9}$/
          var checkCode=/^\d{6}$/
         if(this.Info.phone == '' ){
          alert("请输入手机号")
          return false
         }
         if(!(checkPhone.test(this.Info.phone))){ 
            alert("手机号码有误，请重填") 
            return false
          } 
          if(this.Info.code == ''){
             alert("验证码不能为空")
             return false
          }
          if(!(checkCode.test(this.Info.code))){ 
            alert("验证码必须为6位数字") 
            return false
          } else{
              var that = this
             that.$http.post(url,formData,{emulateJSON: true}).then(
              function(res){
                 that.regInfo.openId=getCookie('openId')
                 that.regInfo.mallId=getCookie('mallId')
                  that.regInfo.mobile=that.Info.phone
                let url=that.$store.state.localHostUrl+'/register.json'
                let formDate1=qs.stringify(that.regInfo)
                console.log(res.data)
                if(!res.data.ret){
                    that.$http.post(url,formDate1,{emulateJSON: true}).then(
                      function(res){
                        console.log(res.data.ret)
                         if(res.data.ret==0){
                            var merId=res.data.merId
                             var mobile=res.data.mobile
                             setCookie('mobile',mobile,1000*60)
                              setCookie('merId',merId,1000*60)
                              if(merId=="NULL"){
                                that.$router.push({path:'/noCard',query:{flag:'0'}})
                              }
                             else{
                                var method=that.$store.state.method 
                                if(method==0){
                                    that.$store.state.merId = res.data.merId
                                    that.$store.state.mobile = res.data.mobile
                                    setCookie('mobile', res.data.mobile,1000*60)
                                    setCookie('merId', res.data.merId,1000*60)
                                    if(that.$store.state.merId=='NULL'){
                                       that.$router.push({path:'/noCard',query:{flag:'0'}})
                                    }else{
                                        that.$router.push('/Home')
                                    }


                                }else if(method ==2){
                                     that.$router.push('/PersonalCenter')
                                }
                             }
                          }
                          else if (res.data.ret==-4){
                              that.$router.push({path:'/noCard',query:{flag:-6}})
                          }
                          else if (res.data.ret==-2){
                              alert("您已注册过。")
                              that.$router.push({path:'/PersonalCenter'})
                          }else{
                               that.$router.push({path:'/noCard',query:{flag:0}})
                          }
                      }
                    )
                    // alert(res.data.descript)
                }else{
                  that.$router.push('/')
                  alert(res.data.descript)
                }
              }

            )
          }
    },
    setParameter(){
      this.$store.state.openId = this.getUrlKey('openId')
      this.$store.state.flag = this.getUrlKey('flag')
        this.$store.state.method = this.getUrlKey('method')
       setCookie('openId', this.$store.state.openId,1000*60)
       setCookie('method', this.$store.state.method,1000*60)
      var method = this.$store.state.method 
        //注册 
         if(method==0 ){
           //  0：用户未注册  // 1：用户己注册  // -1：失败：查询错误    // -2：失败：会员己注册，但手机号为空
           this.$store.state.mallId = this.getUrlKey('mallId')
           setCookie('mallId', this.$store.state.mallId,1000*60)
          if( this.$store.state.flag == 1){
              this.$store.state.merId = this.getUrlKey('merId')
              this.$store.state.mobile = this.getUrlKey('mobile')
              setCookie('mobile', this.$store.state.mobile,1000*60)
              setCookie('merId', this.$store.state.merId,1000*60)
              if(this.$store.state.merId=='NULL'){
                 this.$router.push({path:'/noCard',query:{flag:'0'}})
              }else{
                  this.$router.push('/Home')
              }

          }else if(this.$store.state.flag == 0){
              this.$router.push('/')
          }else if( this.$store.state.flag == -1|| this.$store.state.flag == -2){
              // alert("请联系管理员")
               this.$router.push('/')
          }
          // 
       }else if(method==1){
             if( this.$store.state.flag == 1){
               this.$store.state.orderId = this.getUrlKey('orderId')
                this.$store.state.mobile = this.getUrlKey('mobile')
                setCookie('mobile', this.$store.state.mobile,1000*60)
                setCookie('orderId', this.$store.state.orderId,1000*60)
                this.$router.push('/Orderdetail_pay')
             }else if(this.$store.state.flag == -6){
                this.$store.state.orderId = this.getUrlKey('orderId')
                this.$store.state.mobile = this.getUrlKey('mobile')
                setCookie('mobile', this.$store.state.mobile,1000*60)
                setCookie('orderId', this.$store.state.orderId,1000*60)
                this.$router.push({path:'/Orderdetail_pay'})
             }else if(this.$store.state.flag == -2){
                  this.$router.push({path:'/noCard',query:{flag:-3}})

             }
             else{
               this.$router.push({path:'/noCard',query:{flag:this.$store.state.flag}})

             }
       }else  if(method==2 ){
        // 个人中心
           //  0：用户未注册  // 1：用户己注册  // -1：失败：查询错误    // -2：失败：会员己注册，但手机号为空
           this.$store.state.mallId = this.getUrlKey('mallId')
           setCookie('mallId', this.$store.state.mallId,1000*60)
          if( this.$store.state.flag == 1){
              this.$store.state.merId = this.getUrlKey('merId')
              this.$store.state.mobile = this.getUrlKey('mobile')
               this.$store.state.wxName = this.getUrlKey('wxName')
              setCookie('wxName', this.$store.state.wxName,1000*60)
              this.$store.state.wxHeadImgUrl = this.getUrlKey('wxHeadImgUrl')
              setCookie('wxHeadImgUrl', this.$store.state.wxHeadImgUrl,1000*60)
              setCookie('mobile', this.$store.state.mobile,1000*60)
              if(this.$store.state.merId!="NULL"){
                setCookie('merId', this.$store.state.merId,1000*60)
              }
              this.$router.push('/PersonalCenter')

          }else if(this.$store.state.flag == 0){
              // this.$router.push('/')
              that.$router.push({path:'/error',query:{flag:'0'}})

          }else if( this.$store.state.flag == -1|| this.$store.state.flag == -2){
              // alert("请联系管理员")
              // this.$router.push('/')
              that.$router.push({path:'/error',query:{flag:'0'}})
          }
       }
   
    },
     getUrlKey (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
    },
    quit(){
       // delCookie('mobile')
        delCookie('merId')
         // delCookie('openId') 
         delCookie('mallId')
    },
    // weixinPay:function(data){      
    //       var vm= this;
    //       if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
    //         if( document.addEventListener ){
    //           document.addEventListener('WeixinJSBridgeReady', vm.WeixinJSBridge(data), false);
    //         }else if (document.attachEvent){
    //           document.attachEvent('WeixinJSBridgeReady', vm.WeixinJSBridge(data));
    //           document.attachEvent('onWeixinJSBridgeReady',vm.WeixinJSBridge(data));
    //         }
    //       }else{   
    //         vm.onBridgeReady();
    //       }
    //     }, 
    //     onBridgeReady() {  
    //        WeixinJSBridge.invoke('hideOptionMenu',{},function(res){
    //     }
    //   )
    // }
  },
  mounted(){
    this.quit()   
    this.setParameter()
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    // this.weixinPay();
    
  },
  created(){
  }
}
</script>
<style scoped>
/*.Wxos-regbg{
    background: url("../../assets/img/regbg.png") no-repeat center center;
}*/
.img_log{text-align: center;margin-bottom:13px;}
.Wxos-regbg{
   position: absolute;
    top: 0;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    background-size: cover;

}
.reg-boxs{
  position: absolute;
  left:50%;
  transform: translateY(-50%) translateX(-50%);
  width: 80%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  top: 40%;
      z-index: 10;
}
.reg_table{
  width: 90%;
 margin: 1.8rem auto;
 margin-top: 20px;
}
.reg_phone{
  background: #fff;
  height: 2.5rem;
  position: relative;
  border-radius: 3px;
  border: 1px solid #DBDBDB;
   margin-bottom: 0.65rem;
}
.reg_icon_code,.reg_icon_phone{
      /* width: 20px; */
    height: 27px;
    position: absolute;
    padding-left: 24px;
    padding-right: 17px;
    padding-top: 22px;
}
.reg_icon_phone{
  background: url("./img/phone.png") no-repeat center center;
  background-size: 70%;
 
}
.reg_icon_code{
    background: url("./img/pwd.png") no-repeat center center;
    background-size: 70%;
}
.reg_phone>input,.reg_code>input{
   background: none;
  border: none;
  width: 80%;
  padding-left: 2rem;
  height: 2.5rem;
  line-height: 2.5rem;
  color: #ADADAD;
  /*font-size: 0.9rem;*/
  font-size: 0.75rem;
   position:relative;
  outline: none;
}
.reg_code>input{
  width: 58%;
}
.reg_code_box{
  height: 2.5rem;
      margin-bottom: 0.9rem;
  overflow: hidden;
  position: relative;
}      
.reg_code,.reg_getcode{
 
  height: 2.5rem;
  border-radius: 3px;
}  
.reg_code{
  float: left;
  width: 100%;
  position: relative;
   background:#fff;
}
.reg_getcode{
        float: right;
    width: 59px;
    text-align: center;
    background: #F08632;
    position: absolute;
    right: 0;
    color: #fff;
    line-height: 1.3rem;
    font-size: 0.65rem;
    padding: 0 5px;
    height: 1.4rem;
    position: absolute;
    top: 10px;
    right: 10px;
}
 .reg_phone>input::-webkit-input-placeholder,.reg_code>input::-webkit-input-placeholder {
    /* placeholder颜色  */
   color: #ADADAD;

 }
  .reg_phone>input:-moz-placeholder,.reg_code>input::-webkit-input-placeholder {
    /* placeholder颜色  */
   color: #ADADAD;

 }
  .reg_phone>input::-moz-placeholder,.reg_code>input::-webkit-input-placeholder {
    /* placeholder颜色  */
   color: #ADADAD;

 }
  .reg_phone>input:-ms-input-placeholder,.reg_code>input::-webkit-input-placeholder {
    /* placeholder颜色  */
   color: #ADADAD;

 }
 .reg_bind{
   width: 90%;
   background: #F08632;
   height: 2rem;
  line-height: 2rem;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 1.1rem; 
  font-size: 0.75rem;
 }
 .test_img{
      position: relative;
    width: 100%;
    height: 100%;
 }

</style>
