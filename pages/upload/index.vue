<!--
 * @Author: Yang Kang
 * @Date: 2021-05-25 10:27:39
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-25 15:08:13
-->
<template>
  <div class="container">
    <a-textarea placeholder="Autosize height based on content lines" auto-size />
    <div class="d-flex m-t-30">
      <div class="image m-r-30" v-for="image in images" :key="image.slice(0, 100)" :style="{ 'background-image': `url(${image})` }">
        <!-- <img :src="image" alt="" :style="{ 'object-fit': true }" /> -->
      </div>
      <label class="image-upload add m-r-30">
        <input ref="input" id="imgUp" type="file" accept="image/png, image/jpeg" @change="handle_change" class="d-none"
      /></label>
    </div>
    <div class="submit btn btn-primary w-100">发布</div>
    <!-- <div class="add m-t-30" @click="clickInput"></div> -->
    <!-- <ui-image-upload class="img m-t-10" width="50px" height="50px" :initSrc="logo" @change="handle_change"></ui-image-upload> -->
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    // layout: 'blog',
    data() {
      return {
        images: []
      }
    },
    mounted() {},
    methods: {
      /**
       * @name 处理变更
       * @param {Object} ev 事件
       */
      handle_change(ev) {
        console.log(ev)
        let formData = new FormData()
        let file = ev.target.files[0]
        formData.append('file', file)

        let fileReader = new FileReader()
        fileReader.onload = () => {
          let base64 = fileReader.result
          this.images.push(base64)
          // this.$emit('change', { base64: this.base64, name: file.name })
          console.log(base64)
        }
        if (file) {
          fileReader.readAsDataURL(file)
        }
        axios({
          method: 'post',
          url: 'http://127.0.0.1:9003/api/uploadImage',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (res) {
          console.log('上传成功', res)
        })
      },
      clickInput() {
        document.getElementById('#imgUp').onclick(e => {
          console.log('111')
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .add {
    width: 100px;
    height: 100px;
    border: 1px solid #e9e9e9;
    border-radius: 8px;
    background: url('./plus.png');
    background-size: 100% 100%;
  }
  .image {
    width: 100px;
    height: 100px;
    border: 1px solid #e9e9e9;
    border-radius: 8px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
