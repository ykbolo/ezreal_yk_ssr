/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 11:57:07
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 16:59:52
 */
export default {
  name: 'app-top-bar',
  props: [],
  data() {
    return {
      isLogin: false,
      username: '',
      isMobile: false
    }
  },
  mounted() {
    this.isLogin = !!this.$cookies.get('token')
    this.username = this.$cookies.get('username')
    console.log(document.body.offsetWidth)
    this.isMobile = !!(document.body.offsetWidth < 500)
  },
  methods: {}
}
