<!--
 * @Author: Yang Kang
 * @Date: 2021-05-25 10:27:39
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-25 11:16:44
-->
<template>
  <div>
    <input ref="input" type="file" accept="image/png, image/jpeg" @change="handle_change" />
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    layout: 'blog',
    mounted() {},
    methods: {
      /**
       * @name 处理变更
       * @param {Object} ev 事件
       */
      handle_change(ev) {
        let formData = new FormData()
        let file = ev.target.files[0]
        formData.append('file', file)
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
      }
    }
  }
</script>
