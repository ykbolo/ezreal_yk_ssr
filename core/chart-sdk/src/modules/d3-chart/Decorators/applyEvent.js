/*
 * @Author: zhihao_su
 * @Date: 2021-04-23 15:51:38
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-04-25 17:32:24
 */
export default function (target) {
  /**
   * 绑定展开收起事件，需要子类重新实现
   * @param {Object}} {node} node节点
   */
  target.prototype.applyExpandEvent = function (node) {
    node.on('click', (e, d) => {
      if (d.data.hasChildren) {
        this.toggleChildren(e, d)
        if (d.data.children?.length) {
          d.data._children = d.data.children
          d.data.children = []
          this.update(d)
        } else if (d.data._children?.length) {
          d.data.children = d.data._children
          d.data._children = []
          this.update(d)
        } else {
          this.loadChildren(d).then(children => {
            d.data.children = children
            this.update(d)
          })
        }
      }
    })
  }
}
