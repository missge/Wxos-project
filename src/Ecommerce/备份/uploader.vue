<template>
<div>
    <form method="post"  @submit.prevent="fileChanged"  enctype="multipart/form-data">
     <div class="vue-uploader">
        <div class="file-list">
            <section v-for="(file, index) of files" class="file-item draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <!-- <p class="file-name">{{file.name}}</p> -->
                <span class="file-remove" @click="remove(index)">+</span>
            </section>
            <section v-if="status == 'ready'" class="file-item">
                <div @click="add" class="add">
                    <span>
                        <!-- <img  src="./img/file_img.png" width="39px" height="44px"> -->
                        <i class="file_img"></i>
                    </span>
                </div>
            </section>
         
        </div>
         <div class="file-Explain">
            图片在3M以上，支持jpg,png等格式，最多可上传6张
        </div>
        <section v-if="files.length != 0" class="upload-func">
            <div class="progress-bar">
                <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
            </div>
            <!-- <div class="operation-box">
                <button v-if="status == 'ready'" @click="submit">上传</button>
                <button v-if="status == 'finished'" @click="finished">完成</button>
            </div> -->
        </section>
        <input type="file" accept="image/*"  ref="file" multiple="multiple">
        <input type="submit" value="提交">
    </div>
</form>
</div>
   
</template>
<script>
    import qs from 'qs'
    import Vue from 'vue'
    import router from '@/router'
    import axios from 'axios'
    export default {
        props: {
            src: {
                type: String,
                required: true
            }

        },
        data() {
            return {
                status: 'ready',
                files: [],
                point: {},
                uploading: false,
                percent: 0,
                fileIds:[]
            }
        },
        methods: {
            add() {
                this.$refs.file.click()
            },
            setFileIds: function(){
                this.$emit('getFileIds',this.fileIds);
            },
            setClickDisabled :function(bool){
                this.$emit('getClickDisabled',bool);
            },
            submit() {
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                const formData = new FormData()
                this.files.forEach((item) => {
                    formData.append('name', item.name)
                    formData.append('file', item.file)
                    console.log(item.name, item.file)
                })
              
               this.files.forEach(function(item){
                      console.log(item.size)
                })

                // const xhr = new XMLHttpRequest()
                // xhr.upload.addEventListener('progress', this.uploadProgress, false)
                // xhr.open('POST', this.src, true)
                // this.uploading = true
                // xhr.send((formData))
                // let _self = this
                // xhr.onload = () => {
                //     this.uploading = false
                //     if (xhr.status === 200 || xhr.status === 304) {
                //         this.status = 'finished'
                //         console.log('upload success!')
                //         this.fileIds.push(fileId);

                //         this.setFileIds();

                //     } else {
                //         console.log(`error：error code ${xhr.status}`)
                //     }

                //     // this.finished()
                //     this.setClickDisabled(true)
                // }
         
                var url = this.$store.state.localHostUrl +'/uploadImage.json'
                    // var data= qs.stringify(formData)
                    this.$http.post(url,(formData),{emulateJSON:true}).then(
                        function (res){
                           
                            
                        }
                    )
            
              


            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
               //加一个删除的接口；并且要删除fileIds中对应的值，并调用this.setFileIds();
                this.files.splice(index, 1)
            },
            fileChanged() {
                this.setClickDisabled(false)
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.files.push(item)
                    }
                }
                this.$refs.file.value = ''

                this.submit();
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            }
        }
    }
</script>
<style>
.vue-uploader {
    /*border: 1px solid #e5e5e5;*/
}
.vue-uploader .file-list {
    padding: 10px 0px;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    float: left;
    position: relative;
    width: 100px;
    text-align: center;
     margin-right: 10px;
}
.vue-uploader .file-list .file-item img{
    width: 100px;
    height: 100px;
    border: 1px solid #959595;
}
.vue-uploader .file-list .file-item .file-remove {
      position: absolute;
    right: 6px;
    display: none;
    top: 4px;
    width: 22px;
    height: 22px;
    color: white;
    cursor: pointer;
    line-height: 22px;
    border-radius: 100%;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    background: #F08632;
}
.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}
.vue-uploader .file-list .file-item .file-name {
    margin: 0;
    height: 40px;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.vue-uploader .add {
    width: 100px;
    height: 100px;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 80px;
    border: 2px dashed #ececec;
    font-size: 30px;
    cursor: pointer;
}
.vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
    background: #f8f8f8;
    border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center; 
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #007ACC;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.vue-uploader > input[type="file"] {
    display: none;
}
.file_img{width: 40px;height: 44px;background: url(./img/file_img.png) no-repeat center center ; background-size: 100%;display: inline-block;    margin-top: 20px;}
.file-Explain{font-size: 0.55rem;padding:0 0 10px 0;width: 96%;margin:0 auto;}
</style>