<!--
 * @Author: Yang Kang
 * @Date: 2021-05-18 16:16:21
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-24 11:27:34
-->

<template>
  <div>111</div>
</template>
<script>
  import service from '../../services/index'
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
      service.getArticleByMd5({ md5: this.md5 }).then(res => {
        console.log(res)
      })
    }
  }
</script>
