/*
 * @Author: Yang Kang
 * @Date: 2021-07-12 14:22:48
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-13 16:41:25
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
      if (this.phone && this.password) {
        service.login({ phone: this.phone, password: this.password }).then(res => {
          if (+res.status === 1) {
            this.$message.info(`您好${res.user?.username}`)
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
      } else {
        this.$message.info('请输入正确的用户名或密码')
      }
    }
  }
}
