<template>
  <div class="hide_toolbar" >
      <div class="toolbar">
        <div class="EC_CP_header">
          <div class="toolbar_lf" @click="isShowFn">
              <img width="15px" height="25px"  src="./img/jt1.png">
          </div>  
          <div class="EC_CP_input1">
            <input type="search" v-model="search" ref="search" name="" autofocus> 
            <img  src="../assets/img/ML_search.png"  width="18px" height="18px" @click='searchFn' >
          </div>  
        </div>
        <ul class="suggest-container">
          <li >
            <h3 class="suggest_title">
              <span>搜索记录:</span>
              <img src="./img/delete.png" width="15px" height="15px;" @click='SearchOldInfo(1)'>
            </h3>
            <ul class="suggest-hotkey">
              <li v-for="items in result" @click="clickHistory(items.goodsName)">
                {{items.goodsName}}
              </li>
            </ul>
            <!-- <div class="no-data" v-if="result.length==0">暂无搜索记录</div> -->
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import {setCookie,getCookie} from '../cookie/cookie.js'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
  export default {
    name:'Search',
    props:{
      isShow:{
        type:Boolean
      }
     
    },
    data(){
      return {
          search:'',
          // isShow:false,
          path:'',
          Info:{
             mallId:getCookie('mallId'),
             delStatus:''
          },
          result:[],
      }
    },
    mounted(){
      // this.$store.dispatch('getGoodsSearchOldInfo');
    },
    // computed:{
    //     result(){
    //        return this.$store.state.GoodsSearchOldInfo.result
    //     },
    // },
    methods:{
      clickHistory(g){
         this.SetisShow(false);
         this.$router.push({path:'MallList',query:{goodsName:g,searchFlag:3}})
      },
      searchFn(){
          this.SearchOldInfo(0);
          this.$router.push({path:'MallList',query:{search:this.search,searchFlag:1}})
          this.SetisShow(false);
      },
      isShowFn(){
           this.SetisShow(false);
      },
      SetisShow(){
         this.$emit('getIsShow',this.isShow);
         
      },
      SearchOldInfo(delStatus){
        this.Info.delStatus=delStatus
        var url=this.$store.state.localHostUrl +'/goodsSearchOldInfo.json'
        var data= qs.stringify(this.Info)
        var that = this
          that.$http.post(url,data,{emulateJSON:true}).then(
            function (res){
              if(!res.data.ret){
                console.log(res.data.data);
                that.result=res.data.data
              }
              else{
                // alert(res.data.descript)
              }
            }
        )
      }
    },
    mounted(){
      this.$nextTick(() =>{
          this.SearchOldInfo(0);
          this.$refs['search'].focus();
      })
       
    }
  }
</script>
<style>
  .toolbar_lf>img{
    vertical-align: sub;
  }
</style>