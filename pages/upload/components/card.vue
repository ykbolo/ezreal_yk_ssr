<!--
 * @Author: Yang Kang
 * @Date: 2021-05-25 16:44:43
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-25 17:04:09
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
      <div class="img d-inline-block" v-for="image in item.images" :key="image.url" :style="{ 'background-image': `url(${image.url})` }"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'card',
    props: {
      item: {
        type: Object,
        default: {}
      }
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
