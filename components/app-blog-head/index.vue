<!--
 * @Author: Yang Kang
 * @Date: 2021-05-06 11:53:59
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-11 16:03:02
-->
<template>
  <div>
    <div class="app-blog-head justify-content-between align-items-center">
      <div class="p-relative d-flex">
        <a to="/">
          <svg class="ez-logo">
            <symbol id="line-text">
              <text text-anchor="middle" x="50%" y="50%" dy=".4em">EZREAL-YORK</text>
            </symbol>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use></svg
        ></a>
        <div class="main-nav">
          <a to="/list?page=1" class="t-nowrap"> Articles </a>
          <a to="/video" class="t-nowrap"> Videos </a>
          <a to="/photos" class="t-nowrap"> Photos </a>
          <a to="/about" class="t-nowrap"> ME </a>
        </div>
      </div>
      <a to="/mood" class="p-h-15 p-v-15 f-bold mood">MOOD</a>
    </div>
    <div class="head-holder"></div>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss"></style>
