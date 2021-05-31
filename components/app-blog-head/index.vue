<!--
 * @Author: Yang Kang
 * @Date: 2021-05-06 11:53:59
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-31 17:19:13
-->
<template>
  <div>
    <div class="app-blog-head justify-content-between align-items-center">
      <div class="p-relative d-flex">
        <nuxt-link to="/">
          <svg class="ez-logo">
            <symbol id="line-text">
              <text text-anchor="middle" x="50%" y="50%" dy=".4em">EZREAL-YORK</text>
            </symbol>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use></svg
        ></nuxt-link>
        <div class="main-nav">
          <nuxt-link to="/list" class="t-nowrap"> Articles </nuxt-link>
          <nuxt-link to="/Video" class="t-nowrap"> Videos </nuxt-link>
          <nuxt-link to="/Photos" class="t-nowrap"> Photos </nuxt-link>
          <nuxt-link to="/about" class="t-nowrap"> ME </nuxt-link>
        </div>
      </div>
      <nuxt-link to="/mood" class="p-h-15 p-v-15 f-bold mood">MOOD</nuxt-link>
    </div>
    <div class="head-holder"></div>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss"></style>
