/*
 * @Author: Yang Kang
 * @Date: 2021-05-13 14:21:34
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 17:07:21
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
      total: result.total,
    }
  },
  data() {
    return {
      baseUrl:
        'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/',
    }
  },
  mounted() {},
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c)
    },
  },
}
