/*
 * @Author: Yang Kang
 * @Date: 2021-05-13 14:21:34
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-18 09:52:22
 */
import service from '../../services/index'

export default {
  // components: {
  //   [Carousel.name]: Carousel,
  // },
  // layout: 'blog',
  async asyncData({ req, res }) {
    const result = await service.getPicsFromServer({ keyword: 'jinbao' })
    return {
      items: result.items,
      total: result.total
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.items)
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c)
    }
  }
}
