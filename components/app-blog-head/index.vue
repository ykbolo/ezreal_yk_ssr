<!--
 * @Author: Yang Kang
 * @Date: 2021-05-06 11:53:59
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-24 17:11:29
-->
<template>
  <div>
    <div class="app-blog-head">
      <svg class="ez-logo">
        <symbol id="line-text">
          <text text-anchor="middle" x="50%" y="50%" dy=".4em">EZREAL-YORK</text>
        </symbol>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
        <use xlink:href="#line-text" class="text"></use>
      </svg>
      <div class="main-nav">
        <nuxt-link v-for="(el, index) in tabs" :key="index" :to="el.path">
          {{ el.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="head-holder"></div>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss"></style>
