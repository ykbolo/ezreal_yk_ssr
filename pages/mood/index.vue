<!--
 * @Author: Yang Kang
 * @Date: 2021-05-25 10:27:39
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-26 16:46:36
-->
<template>
  <div class="container">
    <div class="pad p-30">
      <a-input v-model="author" placeholder="输入昵称"></a-input>
      <a-textarea placeholder="输入文字描述" auto-size v-model="words" class="m-t-30" />
      <div class="d-flex m-t-30">
        <div class="image m-r-30" v-for="image in imagesBase64" :key="image.slice(0, 100)">
          <!-- <img :src="image" alt="" :style="{ 'object-fit': true }" /> -->
          <van-image width="100%" height="100%" :src="image" fit="contain" />
        </div>
        <label class="image-upload add m-r-30"> <input ref="input" id="imgUp" type="file" accept="image/*" @change="handle_change" class="d-none" /></label>
      </div>
      <div class="submit btn btn-primary w-100" @click="submit()">发布</div>
      <!-- <div class="add m-t-30" @click="clickInput"></div> -->
      <!-- <ui-image-upload class="img m-t-10" width="50px" height="50px" :initSrc="logo" @change="handle_change"></ui-image-upload> -->
    </div>
    <card v-for="item in items" :item="item" :key="item.md5"></card>
  </div>
</template>
<script>
  import axios from 'axios'
  import services from '~/services'
  import uploadCard from './components/card.vue'
  import config from '~/config/backend'
  import { Image as VanImage } from 'vant'
  export default {
    // layout: 'blog',
    async asyncData() {
      const result = await services.getSubmitsFromMysql({ start: 0, hit: 10 })
      return {
        items: result.items,
        total: result.total
      }
    },
    data() {
      return {
        imagesBase64: [],
        images: [],
        author: '',
        words: ''
      }
    },
    components: {
      [uploadCard.name]: uploadCard,
      [VanImage.name]: VanImage
    },
    mounted() {
      console.log(this.items)
    },
    methods: {
      async fetch() {
        let res = await services.getSubmitsFromMysql({ start: 0, hit: 10 })
        this.items = res.items
        this.total = res.total
      },
      /**
       * @name 处理变更
       * @param {Object} ev 事件
       */
      handle_change(ev) {
        let self = this
        console.log(ev)
        let formData = new FormData()
        let file = ev.target.files[0]
        formData.append('file', file)

        let fileReader = new FileReader()
        fileReader.onload = () => {
          let base64 = fileReader.result
          this.imagesBase64.push(base64)
          // this.$emit('change', { base64: this.base64, name: file.name })
          console.log(base64)
        }
        if (file) {
          fileReader.readAsDataURL(file)
        }
        axios({
          method: 'post',
          url: `${config.host}/api/uploadImage`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (res) {
          console.log(res)
          if (res && res.data && res.data.filenameOnline && res.data.filenameOnlineZipped) {
            self.images.push({ url: res.data.filenameOnline, urlZipped: res.data.filenameOnlineZipped })
          }
        })
      },
      submit() {
        services
          .addOneSubmit({
            author: this.author,
            images: this.images,
            words: this.words
          })
          .then(res => {
            console.log('已发表')
            window.location.reload()
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pad {
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.08);
    background: rgba(70, 127, 215, 0.1);
  }
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
