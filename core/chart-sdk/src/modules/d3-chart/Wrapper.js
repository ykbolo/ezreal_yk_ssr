/*
 * @Author: zhihao_su
 * @Date: 2021-04-20 11:11:12
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-04-26 11:18:12
 */
import * as d3 from 'd3'

class Wrapper {
  $container = null
  selector = ''
  svg = null // 视图容器
  rootG = null // 画布容器
  zoom = null
  svgWidth = 0 // 容器宽度
  svgHeight = 0

  constructor(selector, config = {}) {
    this.selector = selector
    this.$container = document.querySelector(this.selector)
    this.svgWidth = this.$container.offsetWidth
    this.svgHeight = this.$container.offsetHeight
    this.scaleExtent = config.scaleExtent
    // 清空容器
    d3.select(this.selector).select('svg').remove()
    // 初始化根节点
    this.svg = d3.select(this.selector).append('svg:svg').attr('width', this.svgWidth).attr('height', this.svgHeight)
    // 初始化根容器，用于移动缩放
    this.rootG = this.svg.append('svg:g').attr('id', 'root')
    // 初始化缩放
    this.zoom = d3.zoom().on('zoom', event => {
      this.rootG.attr('transform', event.transform.toString())
    })
    this.svg.call(this.zoom)
    if (this.scaleExtent) {
      this.zoom.scaleExtent(this.scaleExtent)
    }
    this.zoom.translateBy(this.svg, this.svgWidth / 2, this.svgHeight / 2)
  }

  transformToCenter({ x, y }, duration = 500) {
    let transform = d3.zoomTransform(this.svg.node())
    let dx = -x * transform.k + this.svgWidth / 2
    let dy = -y * transform.k + this.svgHeight / 2
    this.rootG
      .transition()
      .duration(duration)
      .ease(d3.easeQuad) // 动画效果
      .attr('transform', `translate(${dx}, ${dy})scale(${transform.k})`)
      .on('end', () => {
        transform.x = dx
        transform.y = dy
        this.zoom.transform(this.svg, transform)
      })
  }
}

export default Wrapper
