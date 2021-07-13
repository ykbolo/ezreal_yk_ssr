/*
 * @Author: Yang Kang
 * @Date: 2021-07-12 14:22:48
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-13 16:27:32
 */
import service from '~/services'

export default {
  layout: 'blog',
  name: 'login',
  data() {
    return {
      phone: '',
      username: '',
      password: ''
    }
  },
  computed() {},
  methods: {
    login() {
      if (this.phone && this.password) {
        service.register({ phone: this.phone, username: this.username, password: this.password }).then(res => {
          if (+res.status === 1) {
            setTimeout(() => {
              window.location.href = '/login'
            }, 500)
          } else if (+res.status === 0) {
            this.$message.info(res.message)
          }
        })
      }
    }
  }
}
