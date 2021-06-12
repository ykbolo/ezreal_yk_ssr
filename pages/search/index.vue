<template>
  <div class="container">
    <div class="home">
      <div class="main-container">
        <a-input-search
          class="m-t-30"
          v-model="keyword"
          placeholder="请输入关键字"
          enter-button="搜索"
          @search="submit"
          @blur="handleBlur()"
          @focus="
            () => {
              showLenovo = true
            }
          "
        />
        <div class="lenovo b-gray-2" tabindex="0" v-show="showLenovo">
          <a :to="'/detail/' + item.md5" v-for="item in titles" :key="item.title"><div class="p-v-5 p-h-5 b-b-gray-2 f-dark" v-html="item.title"></div></a>
        </div>
        <a-spin v-if="loading" />
        <div class="p-v-20" v-else>
          <div class="p-v-15">
            共{{ total || 0 }}条搜索结果

            <span>没找到搜索结果?</span>
            <a to="/list?page=1">查看全部</a>
          </div>
          <div v-for="(item, index) in items" :key="item.md5" class="list-item p-20" :class="{ 'b-t-blue': index === 0 }">
            <a class="list-title f-20 f-blue" :href="'/detail/' + item.md5" target="_blank">{{ index + 1 }}. {{ item.title }}</a>
            <div class="row m-t-10">
              <div class="col-6">{{ item.time }}</div>
            </div>
            <div class="row m-t-10">
              <div>{{ item.content ? item.content.slice(0, 100) + '...' : '' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '~/services'
  export default {
    layout: 'blog',
    async asyncData({ query }) {
      let keyword = query.keyword || ''
      let res = await service.searchMds({ keyword })
      return {
        keyword,
        total: res.total || 0,
        items: res.items || []
      }
    },
    data() {
      return {
        loading: false,
        titles: [],
        total: 0,
        keyword: '',
        showLenovo: false
      }
    },
    watch: {
      keyword(newV) {
        if (newV) {
          service.searchMds({ keyword: newV }).then(res => {
            this.titles = res.items.slice(0, 10)
            this.titles.forEach(element => {
              element.title = element.title.replace(newV, `<em>${newV}</em>`)
            })
            this.$forceUpdate()
            this.total = res.total
          })
        }
      }
    },
    mounted() {
      console.log(this.items)
    },
    methods: {
      submit(keyword) {
        this.showLenovo = false
        if (!keyword) {
          this.$message.info('请输入关键词再试')
          return
        }
        this.loading = true
        service.searchMds({ keyword }).then(res => {
          this.items = res.items
          this.total = res.total
          this.loading = false
        })
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
  .b-t-blue {
    border-top: 1.5px solid #e9e9e9;
  }
  .list-item {
    border-left: 1.5px solid #e9e9e9;
    border-right: 1.5px solid #e9e9e9;
    border-bottom: 1.5px solid #e9e9e9;
  }
  .home {
    em {
      color: red !important;
    }

    .sideleft {
      margin: 10px;
    }

    .pagination {
      position: fixed;
      bottom: 10px;
      right: 0;
    }

    .ntp-contents {
      padding-top: 15vh;
      height: 40vh;

      &.collapse {
        height: 20vh;
        padding-top: 5vh;
        text-align: left;

        .logo {
          text-align: center;
        }

        .main-container {
          margin-top: 3vh;
          text-align: left;
          vertical-align: middle;
        }
      }

      .logo {
        text-align: center;

        img {
          width: 70%;
          max-width: 200px;
        }
      }

      .main-container {
        margin-top: 10vh;
        width: 100%;
        text-align: center;
        padding: 0;

        // .input-container {
        //   justify-content: center;

        //   .input-box {
        //     padding: 0 30px;
        //     border: 1px solid rgba(140, 0, 0, 0.5);
        //     border-top-left-radius: 20px;
        //     border-bottom-left-radius: 20px;
        //     height: 40px;
        //     box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.18);
        //     // background-color: #00A0E9;
        //     max-width: 470px;
        //     width: 55%;

        //     .input {
        //       box-sizing: border-box;
        //       width: 100%;
        //       height: 100%;
        //       border: none;
        //       // display: inline-block;

        //       &:focus {
        //         cursor: text;
        //         outline: 0px solid #afecab;
        //         color: #212121;
        //         font-size: 1.1em;
        //       }
        //     }
        //   }

        //   .search {
        //     text-align: center;
        //     background-color: #8c0000;
        //     width: 15%;
        //     line-height: 35px;
        //     border-top-right-radius: 20px;
        //     border-bottom-right-radius: 20px;
        //     // border-radius: 20px;
        //     box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
        //     font-size: 1.2em;
        //     color: whitesmoke;
        //     position: relative;
        //     left: -10px;

        //     &:hover {
        //       cursor: pointer;
        //       box-shadow: 0 1px 6px 0 rgb(32, 33, 36);
        //     }
        //   }
        // }
      }
    }
  }
</style>
