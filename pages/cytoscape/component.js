/*
 * @Author: Yang Kang
 * @Date: 2021-05-13 14:21:34
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-18 11:20:07
 */
import cytoscape from 'cytoscape'
import automove from 'cytoscape-automove'
export default {
  data() {
    return {}
  },
  mounted() {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      // ...

      style: cytoscape
        .stylesheet()
        .selector('node')
        .style({
          'background-color': function (ele) {
            return ele.data('bg')
          }
        })

      // ...

      // , ...
    })
    // 添加单个节点
    // cy.add({
    //   group: 'nodes',
    //   data: {
    //     weight: 75
    //   },
    //   position: {
    //     x: 200,
    //     y: 200
    //   }
    // })
    // 添加节点和边
    const eles = cy.add([
      { group: 'nodes', data: { id: 'n0', weight: 50 }, position: { x: 100, y: 100 } },
      { group: 'nodes', data: { id: 'n1', weight: 20 }, position: { x: 200, y: 100 } },
      { group: 'nodes', data: { id: 'n2', weight: 20 }, position: { x: 300, y: 300 } },
      { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1', weight: 20 } },
      { group: 'edges', data: { id: 'e1', source: 'n1', target: 'n2', weight: 20 } },
      { group: 'edges', data: { id: 'e2', source: 'n2', target: 'n0', weight: 10 } }
    ])
    // 删除元素
    // cy.remove(cy.$('#n0'))
    // 移除集合中的元素
    // const collection = cy.elements('node[weight>20]')
    // cy.remove(collection)
    // 使用集合
    // let collection = cy.collection()
    // cy.nodes().on('click', function (e) {
    //   const clickedNode = e.target

    //   collection = collection.union(clickedNode)
    //   console.log(collection)
    // })
    // 图数据绑定及获取
    console.log(cy.data(), cy.scratch())
    // on
    // cy.on('tapdrag', function (event) {
    //   console.log(event)
    // })
    // pon
    cy.pon('tap').then(function (event) {
      console.log('tap promise fulfilled')
    })
    //
    cy.center()
    cy.fit()
    //
    // setTimeout(function () {
    //   cy.pan({ x: 50, y: -100 })
    // }, 1000)

    // setTimeout(function () {
    //   cy.zoom(2)
    // }, 2000)

    // setTimeout(function () {
    //   cy.reset()
    // }, 3000)
    //
    cy.pan({
      x: 100,
      y: 100
    })
    //
    console.log(cy.panningEnabled())
    //
    cy.animate(
      {
        pan: { x: 100, y: 100 },
        zoom: 2
      },
      {
        duration: 1000
      }
    )
    //
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c)
    }
  }
}
