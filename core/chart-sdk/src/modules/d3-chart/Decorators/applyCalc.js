/*
 * @Author: zhihao_su
 * @Date: 2021-04-23 15:51:38
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-04-25 16:49:42
 */
export default function (target) {
  /**
   * 修改节点x，y
   * @param {node} o 节点对象，可以执行添加className，重新计算x，y等操作
   */
  target.prototype.modifyNode = function (o) {}
  /**
   * 计算节点真实占位，需要子类重新实现
   * @param {Node} o 节点对象
   * @returns {Object} 节点offset
   */
  target.prototype.calcNodeOffset = function (o) {
    return {
      x: o.x, // 基准点
      y: o.y, // 基准点
      left: o.x - this.nodeSize[0] / 2,
      top: o.y - this.nodeSize[1] / 2,
      width: this.nodeSize[0],
      height: this.nodeSize[1]
    }
  }
  /**
   * 计算连线真实起止点，需要子类重新实现
   * @param {Object}} {source, target} 原始node节点
   * @returns {Object} {source, target} node节点
   */
  target.prototype.getLinkSourceAndTarget = function (d) {
    return {
      source: {
        x: d.source.data.offset.x,
        y: d.source.data.offset.y
      },
      target: {
        x: d.target.data.offset.x,
        y: d.target.data.offset.y
      }
    }
  }
}
