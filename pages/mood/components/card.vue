<!--
 * @Author: Yang Kang
 * @Date: 2021-05-25 16:44:43
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-26 16:27:52
-->
<template>
  <div class="card p-h-30 p-v-15 m-t-10">
    <div class="author f-20 f-bold">
      {{ item.author }}
    </div>
    <div class="words f-14 m-t-10">
      {{ item.words }}
    </div>
    <div class="images d-flex justify-content-start m-t-15">
      <div class="img d-inline-block" v-for="image in item.images" :key="image.url">
        <img :src="image.url" alt="" style="object-fit: contain" width="100%" height="100%" />
        <!-- <van-image width="100%" height="100%" :src="image.url" fit="contain" /> -->
      </div>
    </div>
  </div>
</template>
<script>
  import { Image as VanImage } from 'vant'
  export default {
    name: 'card',
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    components: {
      [VanImage.name]: VanImage
    }
  }
</script>
<style lang="scss" scoped>
  .img {
    width: 100px;
    height: 100px;
    margin-right: 3%;
    border: 1px solid #e9e9e9;
    border-radius: 8px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
