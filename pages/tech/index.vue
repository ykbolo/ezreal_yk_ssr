<!--
 * @Author: Yang Kang
 * @Date: 2021-05-13 14:20:06
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 11:05:36
-->
<template>
  <div class="container">
    <a-carousel :after-change="onChange">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
  </div>
</template>
<script src="./component.js"></script>
<style lang="scss" scoped>
::v-deep .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.slick-slide h3 {
  color: #fff;
}
</style>
