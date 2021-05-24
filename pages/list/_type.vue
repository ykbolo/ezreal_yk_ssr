<!--
 * @Author: Yang Kang
 * @Date: 2021-05-18 16:16:21
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-24 17:56:36
-->

<template>
  <div class="container">
    <div v-for="(item, index) in items" :key="item.md5" class="list-item p-20 b-radius-8 m-t-15">
      <a class="list-title f-20 f-blue" :href="'/detail/' + item.md5" target="_blank">{{ index + (current - 1) * 5 + 1 }}. {{ item.title }}</a>
      <div class="row m-t-10">
        <div class="col-6">{{ item.time }}</div>
      </div>
      <div class="row m-t-10">
        <div>{{ item.content ? item.content.slice(0, 100) + '...' : '' }}</div>
      </div>
    </div>
    <div class="t-right m-t-30 p-b-30">
      <a-pagination v-model="current" :total="total" show-less-items :pageSize="5" :defaultCurrent="1" @change="onPageChange" />
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
    async asyncData({ params }) {
      let md5 = params.md5
      const result = await service.getMdFromMysql({ start: 0, hit: 5 })
      return {
        md5: params.md5,
        items: result.items,
        total: result.total
      }
    },
    data() {
      return {
        current: 1
      }
    },
    mounted() {
      console.log(this.items)
    },
    methods: {
      async onPageChange(page, pageSize) {
        console.log(page, pageSize)
        const result = await service.getMdFromMysql({ start: (page - 1) * pageSize, hit: 5 })

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
