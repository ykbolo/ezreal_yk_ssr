<!--
 * @Author: Yang Kang
 * @Date: 2021-07-12 14:15:55
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-12 14:59:34
-->
<template>
  <div class="login-bg t-center">
    <div class="form-wrapper d-inline-block m-t-50">
      <div class="header">EZREALYK</div>
      <div class="input-wrapper">
        <div class="border-wrapper">
          <input type="text" name="username" placeholder="请输入您的手机号" class="border-item" v-model="phone" />
        </div>
        <div class="border-wrapper">
          <input type="password" name="password" placeholder="请输入您的密码" class="border-item" v-model="password" />
        </div>
      </div>
      <div class="action">
        <div class="btn" @click="login">登录</div>
      </div>
      <div class="icon-wrapper">
        <i class="iconfont phs-weixin"></i>
        <i class="iconfont phs-weibo"></i>
        <i class="iconfont phs-github"></i>
      </div>
    </div>
  </div>
</template>
<script src="./component.js"></script>

<style src="./style.scss" lang="scss" scoped></style>
