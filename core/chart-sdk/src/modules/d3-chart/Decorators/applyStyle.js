/*
 * @Author: zhihao_su
 * @Date: 2021-04-23 15:51:38
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-04-25 17:30:12
 */
import * as d3 from 'd3'
export default function (target) {
  /**
   * 绘制节点内容
   * @param {node} nodeEnter 创建的节点
   */
  target.prototype.applyNodeContent = function (nodeEnter) {
    nodeEnter.append('svg:g').append('circle').attr('r', 5).style('fill', '#467fd7')
  }
  /**
   * 更新节点内容
   * @param {node} nodeUpdate 更新的节点
   */
  target.prototype.applyNodeUpdate = function (nodeUpdate) {}

  /**
   * 绘制线条样式
   * @param {link} linkEnter 创建的path
   */
  target.prototype.applyLinkStyle = function (linkEnter) {
    linkEnter.style('fill', 'none').style('stroke', '#e0e0e0').style('stroke-width', '1px')
  }

  /**
   * 更新线条样式
   * @param {link} linkEnter 更新的path
   */
  target.prototype.applyLinkUpdate = function (linkUpdate) {}
  /**
   * 路径生成器
   * @param {Object}} {source, target} node节点
   */
  target.prototype.pathGenerator = function (o) {
    let link = d3
      .linkVertical()
      .x(d => d.x)
      .y(d => d.y)
    return link(o)
  }
}
