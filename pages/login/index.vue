<!--
 * @Author: Yang Kang
 * @Date: 2021-07-12 14:15:55
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 17:02:29
-->
<template>
  <div class="login-bg t-center">
    <div class="form-wrapper d-inline-block m-t-50 b-radius-4">
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
      <div class="f-12 t-center m-t-30">
        <a href="/register" class="f-white t-decoration">没有账号？立即注册吧>></a>
      </div>
    </div>
  </div>
</template>
<script src="./component.js"></script>

<style src="./style.scss" lang="scss" scoped></style>
