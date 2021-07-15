<!--
 * @Author: Yang Kang
 * @Date: 2021-07-15 14:56:41
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 16:13:12
-->
<template>
  <div class="t-center">
    <div class="aspect-ratio t-center m-t-20 d-inline-block" v-for="item in items" :key="item.url">
      <div class="f-bold f-16 m-b-30">{{ item.title }}</div>

      <iframe
        :src="item.iframeUrl"
        allowfullscreen="allowfullscreen"
        scrolling="no"
        frameborder="0"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        :id="item.bvid"
        class="b-radius-4 b-gray-5"
        v-show="item.loaded"
      ></iframe>
      <div class="iframe b-radius-4 b-gray-5" v-show="!item.loaded">
        <a-spin size="large" class="m-t-50" />
      </div>
    </div>
  </div>
</template>
<script src="./component.js"></script>
<style lang="scss" scoped>
  .aspect-ratio {
    position: relative;
  }
  .aspect-ratio {
    iframe {
      width: 80vw;
      height: 45vw;
    }
    .iframe {
      width: 80vw;
      height: 45vw;
    }
  }
  // .aspect-ratio iframe {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   left: 0;
  //   top: 0;
  // }
</style>
