/*
 * @Author: zhihao_su
 * @Date: 2021-04-20 12:00:50
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-04-25 17:29:35
 */
// import _ from 'lodash'
import * as d3 from 'd3'
import applyEvent from '../Decorators/applyEvent'
import applyStyle from '../Decorators/applyStyle'
import applyCalc from '../Decorators/applyCalc'

const nullFn = () => {}
const nullPromise = () => Promise.resolve()

@applyCalc
@applyEvent
@applyStyle
class Tree {
  data = null
  nodeHierarchy = null
  layout = ''
  nodeSize = [100, 100]
  prefix = ''
  nodeId = 0
  nodeG = null
  linkG = null
  duration = 0
  reverse = false
  toggleChildren = null
  loadChildren = null
  _nextTickCallback = []
  constructor(root, data, nodeSize, { layout = 'tree', prefix = 'node', duration = 500, reverse, toggleChildren = nullFn, loadChildren = nullPromise } = {}) {
    // node节点在link节点之上，可以解决一般情况下的link穿透的问题
    this.linkG = root.append('svg:g').classed('links', true)
    this.nodeG = root.append('svg:g').classed('nodes', true)
    this.data = data
    this.nodeSize = nodeSize
    this.layout = layout
    this.prefix = prefix
    this.duration = duration
    this.reverse = Boolean(reverse)
    this.toggleChildren = toggleChildren
    this.loadChildren = loadChildren

    this.update()
  }

  update(source) {
    // 触发节点
    this.nodeHierarchy = d3.hierarchy(this.data)
    let treeLayoutT = d3[this.layout]().nodeSize(this.nodeSize)
    treeLayoutT(this.nodeHierarchy)
    let nodes = this.nodeHierarchy.descendants()

    nodes.forEach(o => {
      // 数据id
      if (!o.data.identifier) {
        o.data.identifier = o.parent ? o.parent.data.identifier + '_' + ++this.nodeId : (++this.nodeId).toString()
      }
      if (this.reverse) {
        o.y = -o.y
      }
      this.modifyNode(o)

      // 计算公司或者人员节点的宽度和高度， calcNodeOffset无需计算x0,y0，直接保留上次的
      o.data.offset = { ...(o.data.offset || {}), ...this.calcNodeOffset(o) }
    })

    if (!source) {
      source = nodes[0]
      source.data.offset.x0 = source.data.offset.x
      source.data.offset.y0 = source.data.offset.y
    }

    this._updateNodes(source)
    this._updateLinks(source)

    // 保存当前节点坐标
    nodes.forEach(o => {
      o.data.offset.x0 = o.data.offset.x
      o.data.offset.y0 = o.data.offset.y
    })

    this._nextTickCallback.forEach(callback => {
      callback()
    })
    this._nextTickCallback = []
  }

  _updateNodes(source) {
    let node = this.nodeG.selectAll('g.node').data(this.nodeHierarchy, d => {
      return d.data.identifier
    })

    // enter
    let nodeEnter = node
      .enter()
      .append('svg:g')
      .attr('class', d => `node node-${d.data.identifier} ${d.data.className || ''}`)
      .attr('id', d => `${this.prefix}-${d.data.identifier}`)
      .attr('transform', `translate(${source.data.offset.x0}, ${source.data.offset.y0})`)
    nodeEnter
      .transition()
      .duration(this.duration)
      .ease(d3.easeQuad)
      .attr('transform', d => `translate(${d.data.offset.x}, ${d.data.offset.y})`)
    this.applyNodeContent(nodeEnter)

    this.applyExpandEvent(nodeEnter)

    // update
    let nodeUpdate = node
    nodeUpdate
      .transition()
      .duration(this.duration)
      .ease(d3.easeQuad)
      .attr('transform', d => `translate(${d.data.offset.x}, ${d.data.offset.y})`)
    this.applyNodeUpdate(nodeUpdate)

    // exit
    let nodeExit = node.exit()
    nodeExit
      .transition()
      .duration(this.duration)
      .ease(d3.easeQuad)
      .attr('transform', () => `translate(${source.data.offset.x}, ${source.data.offset.y})`)
      .remove()
  }

  _updateLinks(source) {
    let link = this.linkG.selectAll('path.link').data(this.nodeHierarchy.links(), d => {
      return d.source.data.identifier + '-' + d.target.data.identifier
    })
    // enter
    let linkEnter = link
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('id', d => `link-${d.source.data.identifier + '-' + d.target.data.identifier}`)
      .attr('d', d => {
        let o = {
          x: source.data.offset.x0,
          y: source.data.offset.y0
        }
        if (d.target.depth === source.depth) {
          return this.pathGenerator({
            source: {
              x: d.source.data.offset.x0,
              y: d.source.data.offset.y0
            },
            target: o
          })
        } else {
          return this.pathGenerator({ source: o, target: o })
        }
      })
      .transition()
      .ease(d3.easeQuad)
      .duration(this.duration)
      .attr('d', d => this.pathGenerator(this.getLinkSourceAndTarget(d)))
    this.applyLinkStyle(linkEnter)

    // update
    let linkUpdate = link
    link
      .transition()
      .ease(d3.easeQuad)
      .duration(this.duration)
      .attr('d', d => this.pathGenerator(this.getLinkSourceAndTarget(d)))
    this.applyLinkUpdate(linkUpdate)

    // exit
    link
      .exit()
      .transition()
      .duration(this.duration)
      .ease(d3.easeQuad)
      .attr('d', d => {
        let o = { x: source.data.offset.x, y: source.data.offset.y }
        if (d.target.depth === source.depth) {
          return this.pathGenerator({
            source: {
              x: d.source.data.offset.x,
              y: d.source.data.offset.y
            },
            target: o
          })
        } else {
          return this.pathGenerator({ source: o, target: o })
        }
      })
      .remove()
  }

  nextTick(callback) {
    this._nextTickCallback.push(callback)
  }
}

export default Tree
