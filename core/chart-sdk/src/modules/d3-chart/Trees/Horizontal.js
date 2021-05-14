import * as d3 from 'd3'
import Tree from './Base'

export default class RightTree extends Tree {
  calcNodeOffset(o) {
    return {
      x: o.y, // 基准点
      y: o.x, // 基准点
      left: o.y - this.nodeSize[1] / 2,
      top: o.x - this.nodeSize[0] / 2,
      width: this.nodeSize[1],
      height: this.nodeSize[0]
    }
  }

  pathGenerator(o) {
    let link = d3
      .linkHorizontal()
      .x(d => d.x)
      .y(d => d.y)
    return link(o)
  }
}
