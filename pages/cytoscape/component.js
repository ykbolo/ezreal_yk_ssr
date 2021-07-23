import cytoscape from 'cytoscape'
import automove from 'cytoscape-automove'
if (typeof cytoscape('core', 'automove') !== 'function') {
  cytoscape.use(automove)
}
let cy
export default {
  data() {
    return {}
  },
  mounted() {
    cy = cytoscape({
      container: document.getElementById('cy'),

      style: cytoscape
        .stylesheet()
        .selector('node')
        .style({
          'background-color': function (ele) {
            return ele.data('bg')
          },
          width: '100px',
          height: '100px'
        })
        .css({
          color: '#000000',
          content: 'data(name)',
          'text-valign': 'center',
          'background-color': '#FFFFFF',
          'border-width': 1,
          'border-color': '#707070'
        })
        .selector('edge')
        .style({
          'background-color': function (ele) {
            return ele.data('bg')
          }
        })
        .css({
          color: '#000000',
          content: 'data(name)',
          'text-valign': 'center',
          'background-color': '#FFFFFF',
          'border-width': 1,
          'border-color': '#707070'
        })
    })
    const edgeStyle = {
      'line-style': 'solid',
      'control-point-step-size': 20,
      'target-arrow-shape': function (e) {
        // var n = e.data('sourceOrg')
        return 'triangle'
      },
      'text-background-color': '#fff',
      'text-background-opacity': 1,
      'text-background-padding': 2,
      'target-arrow-color': function (t) {
        return '#008BF8'
      },
      'arrow-scale': 0.8,

      'text-opacity': 1,
      'font-size': 10,
      'overlay-color': '#fff',
      'overlay-opacity': 0
    }
    // 添加节点和边
    const eles = cy.add([
      { group: 'nodes', data: { id: 'root', name: 'ez', bg: 'blue' }, classes: 'classes-A', style: { 'background-color': '#1478f0' } },
      { group: 'nodes', data: { id: 'a1', name: 'yk' }, classes: 'classes-A' },
      { group: 'nodes', data: { id: 'a2', name: 'yk' }, classes: 'classes-A' },
      { group: 'nodes', data: { id: 'a3', name: 'yk' }, classes: 'classes-A' },
      { group: 'nodes', data: { id: 'a4', name: 'yk' }, classes: 'classes-A' },
      { group: 'nodes', data: { id: 'a5', name: 'yk' }, classes: 'classes-A' },
      {
        group: 'edges',
        data: { id: 'root-a1', name: '拥有', source: 'n1', target: 'n2' },
        style: edgeStyle
      },
      {
        group: 'edges',
        data: { id: 'root-a2', name: '拥有', source: 'n1', target: 'n3' },
        style: edgeStyle
      },
      {
        group: 'edges',
        data: { id: 'root-a3', name: '拥有', source: 'n1', target: 'n4' },
        style: edgeStyle
      },
      {
        group: 'edges',
        data: { id: 'root-a4', name: '拥有', source: 'n1', target: 'n5' },
        style: edgeStyle
      },
      {
        group: 'edges',
        data: { id: 'root-a5', name: '拥有', source: 'n1', target: 'n6' },
        style: edgeStyle
      },
      {
        group: 'edges',
        data: { id: 'e6', name: '拥有', source: 'n1', target: 'n7' },
        style: edgeStyle
      },
      {
        group: 'edges',
        data: { id: 'e7', name: '拥有', source: 'n1', target: 'n8' },
        style: edgeStyle
      },
      {
        group: 'edges',
        data: { id: 'e8', name: '拥有', source: 'n1', target: 'n2' },
        style: edgeStyle
      }
    ])

    cy.on('tap', '#n2', e => {
      var node = e.target
      console.log(node.id())
      cy.add([
        { group: 'nodes', data: { id: 'n3', name: 'yangkang' }, classes: 'classes-A', position: { x: 200, y: 300 } },
        { group: 'edges', data: { id: 'e2', name: '是', source: 'n2', target: 'n3' } }
      ])
    })

    var layout = cy.layout({
      name: 'concentric',
      fit: true,
      padding: 30,
      startAngle: (3 / 2) * Math.PI, // where nodes start in radians
      endAngle: (5 / 2) * Math.PI, // this doesn't work
      sweep: undefined,
      clockwise: true,
      equidistant: false,
      minNodeSpacing: 10,
      boundingBox: undefined,
      avoidOverlap: true,
      nodeDimensionsIncludeLabels: false,
      height: undefined,
      width: undefined,
      spacingFactor: undefined,
      concentric: function (node) {
        return node.degree()
      },
      levelWidth: function (nodes) {
        return nodes.maxDegree() / 4
      },
      animate: false,
      animationDuration: 500,
      animationEasing: undefined,
      animateFilter: function (node, i) {
        return true
      },
      ready: undefined,
      stop: undefined,
      transform: function (node, position) {
        return position
      }
    })
    layout.run()
    // cy.style().selector('.classes-A').style({ 'background-color': '#FF0000', 'border-color': '#FF0000', 'border-width': '1px' })
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c)
    }
  }
}
