<!--
 * @Author: Yang Kang
 * @Date: 2021-05-18 16:16:21
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-04 10:11:12
-->

<template>
  <div class="container">
    <div id="md" class="container markdown" v-html="marked(content)"></div>
    <div class="row p-15">
      <div class="col-4">
        <a class="pre d-flex" :to="`/detail/${pre.md5}`">
          <img src="./images/left.svg" alt="" width="16px" />
          {{ pre.title }}</a
        >
      </div>
      <div class="col-2"></div>
      <div class="col-2"></div>
      <div class="col-4 t-right">
        <a class="next d-flex justify-content-end" :to="`/detail/${next.md5}`"> {{ next.title }} <img src="./images/right.svg" alt="" width="16px" /></a>
      </div>
    </div>
  </div>
</template>
<script>
  import marked from 'marked'
  import service from '../../services/index'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/monokai-sublime.css'
  export default {
    layout: 'blog',

    async asyncData({ params }) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return hljs.highlightAuto(code).value
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      }) //基本设置
      let md5 = params.md5
      const result = await service.getArticleByMd5({ md5 })
      return {
        pre: result.preNext?.pre || {},
        next: result.preNext?.next || {},
        title: result.title,
        md5: params.md5,
        content: result.content
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          { name: 'description', content: this.title },
          { name: 'keywords', content: 'nuxt,ezreal,ezreal-yk,博客' }
        ]
      }
    },
    data() {
      return {
        marked: marked
      }
    },
    mounted() {}
  }
</script>
<style lang="scss" scoped></style>
