<template>
    <div>
        <h3>所有注册用户</h3>
        <ul>
            <li v-for="item in list">
                {{item.username}}
            </li>
        </ul>
        <a href="#" @click="quit">注销登录</a>
    </div>
</template>

<style>
    ul{padding: 0;}
    ul li{list-style: none;}
</style>

<script>
import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
    export default{
        data(){
            return{
                list: ''
            }
        },
        mounted(){
            this.$http.get('http://localhost:3000/users').then((res) =>{
                this.list = res.data
                console.log(res)
            })
        },
        methods:{
            quit(){
                /*删除cookie*/
                delCookie('username')
                setTimeout(() => this.$router.push('/') ,1000)
            }
        }

    }
</script>