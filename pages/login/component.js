/*
 * @Author: Yang Kang
 * @Date: 2021-07-12 14:22:48
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-12 15:29:49
 */
import service from '~/services'
export default {
  layout: 'blog',
  name: 'login',
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    login() {
      service.login({ phone: this.phone, password: this.password }).then(res => {
        if (+res.status === 1) {
          this.$message.info(`您好${res.user?.nickyname}`)
          setTimeout(() => {
            window.location.href = '/'
          }, 500)
        } else if (+res.status === 0) {
          this.$message.info('登录失败')
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
        // window.location.href = '/'
      })
    }
  }
}
