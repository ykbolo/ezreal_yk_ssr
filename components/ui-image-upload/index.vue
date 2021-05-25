<!--
@name 照片上传
@event change
-->

<template>
  <label
    class="ui-image-upload overflow-hidden p-relative b-gray-3 b-radius-2 cursor-pointer"
    :class="{ 'pointer-events-none': disable }"
    :style="{ width, height }"
  >
    <input ref="input" class="d-none" type="file" accept="image/png, image/jpeg" @change="handle_change" />
    <template v-if="width && height">
      <template v-if="base64 || src">
        <img class="image w-100 h-100" :style="{ 'object-fit': imageFit }" :src="base64 || src" @error="handle_img_error" />
        <div v-if="watermark" class="watermark p-absolute left-0 top-0 w-100 h-100"></div>
      </template>
      <div v-else class="w-100 h-100 bg-100" :style="{ 'background-image': `url(${backgroundSrc})` }"></div>
    </template>
    <template v-else>
      <!-- 高度自适应 -->
      <template v-if="(base64 || src) && !error">
        <img class="image w-100" :style="{ 'object-fit': imageFit }" :src="base64 || src" @error="handle_img_error" />
        <div v-if="watermark" class="watermark p-absolute left-0 top-0 w-100 h-100"></div>
      </template>
      <img v-else class="w-100" :src="backgroundSrc" />
    </template>

    <i
      v-if="remove"
      v-show="base64 || src"
      class="iconfont-close remove p-absolute right-0 top-0 f-white f-20 t-center line-height-1"
      @click.stop.prevent="handle_remove_click"
    ></i>
    <div v-if="preview" v-show="base64 || src" class="preview p-absolute-center d-flex flex-center f-white">
      <div class="p-h-15 p-v-5 b-white f-16" @click.stop.prevent="handle_preview_click">预览</div>

      <i v-if="remove" class="iconfont-close remove p-absolute right-0 top-0 f-white f-20 t-center line-height-1" @click.stop.prevent="handle_remove_click"></i>
    </div>
  </label>
</template>

<script src="./component.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
