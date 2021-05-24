<!--
 * @Author: Yang Kang
 * @Date: 2021-05-18 16:16:21
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-24 16:47:46
-->

<template>
  <div>
    <div id="md"></div>
  </div>
</template>
<script>
  import marked from 'marked'
  import service from '../../services/index'
  import hljs from 'highlight.js'
  import javascript from 'highlight.js/lib/languages/javascript'
  import 'highlight.js/styles/monokai-sublime.css'
  export default {
    validate(md5) {
      return true
    },
    async asyncData({ params }) {
      console.log(params, '---')
      let md5 = params.md5
      const result = await service.getArticleByMd5({ md5 })
      return {
        md5: params.md5,
        items: result.items,
        total: result.total
      }
    },
    mounted() {
      var rendererMD = new marked.Renderer()
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
      service.getArticleByMd5({ md5: this.md5 }).then(res => {
        // console.log(res)
        document.getElementById('md').innerHTML = marked(res.content)
      })
    }
  }
</script>
<style lang="scss" scoped>
  ::v-deep pre {
    // background: rgba(20, 55, 240, 0.1);
  }
</style>
