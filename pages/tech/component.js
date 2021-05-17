/*
 * @Author: Yang Kang
 * @Date: 2021-05-13 14:21:34
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 16:14:53
 */
import service from '../../services/index'
export default {
  // components: {
  //   [Carousel.name]: Carousel,
  // },
  // layout: 'blog',
  // asyncData({ req, res }) {
  //   return service.getPicsFromServer({ keyword: 'jinbao' })
  // },
  mounted() {
    service.getPicsFromServer({ keyword: 'jinbao' }).then((res) => {
      console.log(res)
    })
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c)
    },
  },
}
