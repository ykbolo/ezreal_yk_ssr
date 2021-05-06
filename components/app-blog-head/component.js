/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 11:57:07
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-06 14:12:53
 */
export default {
  name: 'app-top-bar',
  props: [],
  data() {
    return {
      tabs: [
        {
          name: '主页',
          path: '/',
        },
        {
          name: '测评',
          path: '/list/life',
        },
        {
          name: '技术',
          path: '/list/tech',
        },
        {
          name: '相册',
          path: '/list/game',
        },
      ],
    }
  },
  mounted() {},
  methods: {},
}
