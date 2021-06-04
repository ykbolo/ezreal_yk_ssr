<template>
  <div class="container">
    <div class="home p-t-50">
      <div class="m-t-30 t-center">
        <svg class="ez-logo" style="transform: scale(1.5)">
          <symbol id="line-text">
            <text text-anchor="middle" x="50%" y="50%" dy=".4em">EZREAL-YORK</text>
          </symbol>
          <use xlink:href="#line-text" class="text"></use>
          <use xlink:href="#line-text" class="text"></use>
          <use xlink:href="#line-text" class="text"></use>
          <use xlink:href="#line-text" class="text"></use>
        </svg>
      </div>
      <a-input-search class="m-t-30" placeholder="输入关键词" enter-button="搜索" size="large" @search="submit" />
    </div>
  </div>
</template>

<script>
  // import service from '~/services'
  export default {
    methods: {
      submit(keywords) {
        if (!keywords) {
          this.$message.info('请输入关键词再试')
          return
        }
        this.$router.push(`/search?keyword=${encodeURIComponent(keywords)}`)
      }
    }
  }
</script>

<style lang="scss">
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
  ::v-deep .ant-input {
    text-align: left !important;
  }
</style>
