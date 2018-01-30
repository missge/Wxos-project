<template>
	<div class="InformationModifine">
		<ul class="IM_list">
			<li>
				<mt-cell title="收藏的商品"  is-link>
					<span class="IM_header1 blank_font">
						<i class="IM_logo">
							<img src="./img/logo.jpg" width="25px" height="25px">
						</i>
							小黑人儿
					</span>
				</mt-cell>
			</li>
			<li>
				<mt-cell title="手机号"  is-link>
					<span class="blank_font">
						15810092213
					</span>
				</mt-cell>
			</li>
			<li>
				<mt-cell title="性别"  is-link>
					<span class="blank_font">未设置</span>
				</mt-cell>
			</li>
		</ul>
		<div class="wide_btn_blue">
			退出登录
		</div>
		<button class="mint-button mint-button--default mint-button--large" @click="actionSheet">  
        <label class="mint-button-text">点击上拉 action sheet</label>  
      </button>
		<div class="IM_bot">
			 <mt-actionsheet  
        :actions= "data"  
        v-model="sheetVisible">  
    </mt-actionsheet>  
		</div>
	</div>
</template>
<script>
export default {  
  name: 'InformationModifine',  
  data () {  
    return {  
       data: [{  
        name: '女',  
        method : this.getCamera()
      }, {  
        name: '男',   
        method : this.getLibrary()
      }],  
      sheetVisible: false  
    }
  },  
  methods: {  
    actionSheet: function(){  
      this.sheetVisible = true;  
    },  
    getCamera: function(){  
      console.log("打开照相机")  
    },  
    getLibrary: function(){  
      console.log("打开相册")  
    }  
  }  
}  
</script>
<style>
.IM_list{
	background: #fff;
}
.IM_list span{
	font-size: 12px;
    line-height: 40px;
}
.IM_list .mint-cell{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #d7d7d7;
}
.IM_header1{
	display: flex;
}
.IM_logo{
	width: 25px;
	height: 25px;
	border-radius: 50%;
	position: relative;
	display: inline-block;
	justify-content: center;
	align-items: center;	
	padding-right: 10px;
}
.IM_logo>img{
	border-radius: 48%;
}
.InformationModifine>.wide_btn_blue{
	margin-top: 25px;
}
</style>