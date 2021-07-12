/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 11:57:07
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-12 14:49:26
 */
export default {
  name: 'app-top-bar',
  props: [],
  data() {
    return {
      isLogin: false,
      username: ''
    }
  },
  mounted() {
    this.isLogin = !!this.$cookies.get('token')
    this.username = this.$cookies.get('username')
  },
  methods: {}
}
