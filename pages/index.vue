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
      <a-input-search
        class="m-t-30"
        placeholder="输入关键词"
        enter-button="搜索"
        size="large"
        @search="submit"
        v-model="keyword"
        @blur="handleBlur()"
        @focus="
          () => {
            showLenovo = true
          }
        "
      />

      <div class="lenovo b-gray-2" tabindex="0" v-show="showLenovo">
        <nuxt-link :to="'/detail/' + item.md5" v-for="item in titles" :key="item.title"
          ><div class="p-v-5 p-h-5 b-b-gray-2 f-dark" v-html="item.title"></div
        ></nuxt-link>
      </div>
      <div class="t-right m-t-15">
        <nuxt-link to="/list?page=1">查看全部文章</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '~/services'
  export default {
    layout: 'blog',
    data() {
      return {
        titles: [],
        total: 0,
        loading: false,
        keyword: '',
        showLenovo: false
      }
    },
    watch: {
      keyword(newV) {
        if (newV) {
          this.loading = true
          service.searchMds({ keyword: newV }).then(res => {
            this.titles = res.items.slice(0, 10)
            this.titles.forEach(element => {
              element.title = element.title.replace(newV, `<em>${newV}</em>`)
            })
            this.$forceUpdate()
            this.total = res.total
            this.loading = false
          })
        }
      }
    },
    methods: {
      submit(keywords) {
        if (!keywords) {
          this.$message.info('请输入关键词再试')
          return
        }
        this.$router.push(`/search?keyword=${encodeURIComponent(keywords)}`)
      },
      handleBlur() {
        setTimeout(() => {
          this.showLenovo = false
        }, 200)
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
  .lenovo {
    em {
      color: #e44e34;
    }
  }
</style>
