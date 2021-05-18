<!--
 * @Author: Yang Kang
 * @Date: 2021-05-13 14:20:06
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 18:12:54
-->
<template>
  <div class="container">
    <a-carousel arrows dots-class="slick-dots slick-thumb" autoplay>
      <!-- <a slot="customPaging" slot-scope="props">
        <img :src="items[props.i + 1]" />
      </a> -->
      <div v-for="item in items" :key="item">
        <img :src="item" />
      </div>
    </a-carousel>
  </div>
</template>
<script src="./component.js"></script>
<style lang="scss" scoped>
::v-deep .slick-dots {
  height: auto;
}
::v-deep .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
  max-height: 300px;
}
::v-deep .slick-thumb {
  bottom: -45px;
}
::v-deep .slick-thumb li {
  width: 60px;
  height: 45px;
}
::v-deep .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
::v-deep .slick-thumb {
  li.slick-active {
    img {
      filter: grayscale(0%);
    }
  }
}
</style>
