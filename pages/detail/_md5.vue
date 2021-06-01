<!--
 * @Author: Yang Kang
 * @Date: 2021-05-18 16:16:21
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-01 11:09:59
-->

<template>
  <div class="container">
    <div id="md" class="container" v-html="marked(content)"></div>
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
