<!--
 * @Author: Yang Kang
 * @Date: 2021-05-18 16:16:21
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-01 10:48:13
-->

<template>
  <div class="container">
    <div v-for="(item, index) in items" :key="item.md5" class="list-item p-20 b-radius-8 m-t-15">
      <a class="list-title f-20 f-blue" :href="'/detail/' + item.md5" target="_blank">{{ index + (page - 1) * 5 + 1 }}. {{ item.title }}</a>
      <div class="row m-t-10">
        <div class="col-6">{{ item.time }}</div>
      </div>
      <div class="row m-t-10">
        <div>{{ item.content ? item.content.slice(0, 100) + '...' : '' }}</div>
      </div>
    </div>
    <div class="t-right m-t-30 p-b-30">
      <a-pagination v-model="page" :total="total" show-less-items :pageSize="5" :defaultCurrent="1" @change="onPageChange" />
    </div>
  </div>
</template>
<script>
  import service from '../../services/index'
  export default {
    validate(type) {
      return true
    },
    layout: 'blog',
    async asyncData({ query }) {
      const page = +query.page || 1
      const hit = 5
      const result = await service.getMdFromMysql({ start: (page - 1) * hit, hit })
      return {
        page: page,
        items: result.items,
        total: result.total
      }
    },
    data() {
      return {}
    },
    methods: {
      async onPageChange(page, pageSize) {
        let newPage = window.location.href.replace(/page=\d+/, `page=${page}`)
        history.pushState('', '', newPage)

        const result = await service.getMdFromMysql({ start: (page - 1) * pageSize, hit: 5 })
        this.page = page
        this.items = result.items
        this.total = result.total
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list-item {
    border: 1.5px solid #0099ff;
  }
</style>
