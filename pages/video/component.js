/*
 * @Author: Yang Kang
 * @Date: 2021-07-15 15:02:26
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 16:15:57
 */
import service from '~/services/index'
import _ from 'lodash'
export default {
  layout: 'blog',
  async asyncData() {
    let res = await service.getLobosVideos({})
    return {
      total: res.data.total,
      items: res.data.items
    }
  },
  mounted() {
    _.forEach(this.items, item => {
      const iframe = document.getElementById(`${item.bvid}`)
      iframe.onload = () => {
        item.loaded = true
        this.$forceUpdate()
      }
    })
  }
}
