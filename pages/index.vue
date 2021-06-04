<template>
  <div class="container">
    <div class="home">
      <div :class="{ container: true, sideleft: hasResult }">
        <div class="ntp-contents" :class="{ collapse: hasResult }">
          <div class="main-container">
            <div class="input-container d-flex">
              <div class="input-box">
                <input class="input" type="text" v-model="keywords" @keyup.enter="submit" placeholder="请输入关键字" />
              </div>
              <div class="search" @click="submit()">搜索</div>
            </div>

            <div v-for="(item, index) in items" :key="item.md5" class="list-item p-20 b-radius-8 m-t-15">
              <a class="list-title f-20 f-blue" :href="'/detail/' + item.md5" target="_blank">{{ index + (page - 1) * 5 + 1 }}. {{ item.title }}</a>
              <div class="row m-t-10">
                <div class="col-6">{{ item.time }}</div>
              </div>
              <div class="row m-t-10">
                <div>{{ item.content ? item.content.slice(0, 100) + '...' : '' }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="block col-md-10 col-xs-12 col-lg-8 margin-t-2x margin-b-1x" v-if="total">
          共搜索到
          <em>{{ totalText }}</em
          >条数据 &nbsp;用时
          <em>{{ time_take }}</em>
          ms
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '~/services'
  export default {
    data() {
      return {
        keywords: '',
        time_take: 0,
        start: 0,
        hit: 10,
        items: [],
        hasResult: false,
        total: 0
      }
    },
    mounted() {
      console.log(this.$__env__)
    },
    methods: {
      submit() {
        service.searchMds({ keyword: this.keywords }).then(res => {
          console.log(res)
          this.total = res.total
          this.items = res.items
        })
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

        .input-container {
          justify-content: center;

          .input-box {
            padding: 0 30px;
            border: 1px solid rgba(140, 0, 0, 0.5);
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            height: 40px;
            box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.18);
            // background-color: #00A0E9;
            max-width: 470px;
            width: 55%;

            .input {
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              border: none;
              // display: inline-block;

              &:focus {
                cursor: text;
                outline: 0px solid #afecab;
                color: #212121;
                font-size: 1.1em;
              }
            }
          }

          .search {
            text-align: center;
            background-color: #8c0000;
            width: 15%;
            line-height: 35px;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            // border-radius: 20px;
            box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
            font-size: 1.2em;
            color: whitesmoke;
            position: relative;
            left: -10px;

            &:hover {
              cursor: pointer;
              box-shadow: 0 1px 6px 0 rgb(32, 33, 36);
            }
          }
        }
      }
    }
  }
</style>
