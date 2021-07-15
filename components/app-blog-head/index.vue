<!--
 * @Author: Yang Kang
 * @Date: 2021-05-06 11:53:59
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 18:23:21
-->
<template>
  <div>
    <div class="app-blog-head justify-content-between align-items-center bg-white p-relative">
      <div class="p-relative d-flex">
        <a href="/">
          <svg class="ez-logo">
            <symbol id="line-text">
              <text text-anchor="middle" x="50%" y="50%" dy=".4em" v-if="isMobile">EZ-Y</text>
              <text text-anchor="middle" x="50%" y="50%" dy=".4em" v-else>EZREAL-YORK</text>
            </symbol>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use>
            <use xlink:href="#line-text" class="text"></use></svg
        ></a>
        <div class="main-nav">
          <a href="/list?page=1" class="t-nowrap"> 技术 </a>
          <a href="/video" class="t-nowrap f-gray disabled"> 视频 </a>
          <a href="/photos" class="t-nowrap"> 照片 </a>
        </div>
      </div>
      <div>
        <a href="/mood" class="p-h-15 p-v-15 f-bold mood">MOOD</a>
        <a href="/login" class="p-h-15 p-v-15 f-bold mood" v-if="!isLogin">登录</a>
        <a-dropdown class="p-h-15 p-v-15 f-bold mood" @click="logout()" v-else>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()"> {{ username }} <a-icon type="down" class="t-middle" /> </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a @click="changeName">修改昵称</a>
            </a-menu-item>
            <a-menu-item key="0">
              <a @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <!-- <a class="p-h-15 p-v-15 f-bold mood" @click="logout()" v-else></a> -->
      </div>
    </div>
    <div class="head-holder"></div>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
