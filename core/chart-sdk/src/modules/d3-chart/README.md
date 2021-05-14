# d3-tree

d3 树状图 SDK，自动计算节点位置，帮助图谱快速布局

<!-- TOC -->

- [d3-tree](#d3-tree)
  - [目录结构](#目录结构)
  - [Wrapper](#wrapper)
    - [SDK](#sdk)
      - [Example](#example)
      - [Arguments](#arguments)
    - [Instance](#instance)
    - [API](#api)
      - [transformToCenter](#transformtocenter)
  - [Trees](#trees)
    - [SDK](#sdk-1)
      - [Base.js](#basejs)
      - [Horizontal.js](#horizontaljs)
      - [Vertical.js](#verticaljs)
    - [Instance](#instance-1)
      - [nodeHierarchy](#nodehierarchy)
    - [API](#api-1)
      - [update](#update)
      - [nextTick](#nexttick)
  - [Decorators](#decorators)
    - [applyCalc](#applycalc)
      - [Methods](#methods)
      - [Example](#example-1)
    - [applyEvent](#applyevent)
      - [Methods](#methods-1)
      - [Example](#example-2)
    - [applyStyle](#applystyle)
      - [Methods](#methods-2)
      - [Example](#example-3)
  - [util](#util)
    - [getTextWidth](#gettextwidth)
    - [cutTextForRow](#cuttextforrow)

<!-- /TOC -->

## 目录结构

```
├── Decorators
│   ├── applyCalc.js
│   ├── applyEvent.js
│   └── applyStyle.js
├── Trees
│   ├── Base.js
│   ├── Horizontal.js
│   └── Vertical.js
├── util.js
└── Wrapper.js
```

## Wrapper

提供图谱画布容器，支持缩放拖拽等基础交互

### SDK

new Wrapper(selector, config)

#### Example

```js
let wrapper = new Wrapper('#chart', { scaleExtent: [0.5, 2] })
```

#### Arguments

- selector: 画布的容器，可使用 class 或者 id，必填

- config：配置对象，选填

```js
// config
{
  // 缩放比例，不填的话d3会默认无限放大缩小
  scaleExtent: [min, max]
}
```

### Instance

| 实例属性  | 类型        | 描述                               |
| --------- | ----------- | ---------------------------------- |
| svg       | d3-selector | svg 根节点，一般情况下用不到       |
| svgWidth  | Number      | svg 根节点宽度                     |
| svgHeight | Number      | svg 根节点高度                     |
| rootG     | d3-selector | 图层根节点，所有内容添加在该层级内 |
| zoom      | d3-zoom     | 支持拖拽缩放                       |

### API

#### transformToCenter

将图层中的某一点移动到容器中心位置

Example:

```js
wrapper.transformToCenter({ x, y }, duration)
```

Arguments：

- {x, y}: 该点在图层中的坐标，必填
- duration：移动到中心点的过渡时间，选填，默认 500ms

## Trees

基于 d3 树状图和集群图的二次封装，自动计算节点坐标，封装展开收起等基础交互

### SDK

#### Base.js

基类实现，封装核心逻辑

new Tree(root, data, nodeSize, config)

基础配置项:

| 配置项   | 类型        | 描述                                                  | 是否必选 | 默认值 |
| -------- | ----------- | ----------------------------------------------------- | -------- | ------ |
| root     | d3-selector | svg 容器，必须为<g>标签                               | 是       | 无     |
| data     | Object      | 数据                                                  | 是       | 无     |
| nodeSize | Array       | 描述节点距离，Array[0]:同层节点间距 Array[1]:层级间距 | 是       | 无     |

config:

| 配置项         | 类型     | 描述                                       | 是否必选 | 默认值 |
| -------------- | -------- | ------------------------------------------ | -------- | ------ |
| layout         | String   | 使用的 d3 模型，暂时只支持 tree 和 cluster | 否       | 'tree' |
| prefix         | String   | 节点 id 前缀                               | 否       | 'node' |
| duration       | Number   | 动画过渡时间                               | 否       | 500    |
| reverse        | Boolean  | 节点层级是否反向                           | 否       | false  |
| toggleChildren | Function | 节点点击展开/收起时触发                    | 否       |        |
| loadChildren   | Function | 加载数据时触发                             | 否       |        |

#### Horizontal.js

将图谱旋转 90deg 水平布局，调用方式和 API 与 Base.js 一致。

#### Vertical.js

Base.js 别名

### Instance

| 实例属性      | 类型        | 描述              |
| ------------- | ----------- | ----------------- |
| nodeHierarchy | d3-Array    | d3 生成的树结构   |
| nodeG         | d3-selector | svg node 节点容器 |
| linkG         | d3-selector | svg link 节点容器 |

#### nodeHierarchy

d3 生成的树结构，每一个节点都有固定的数据格式，在原始的数据结构上又对 data 字段进行了扩展。

原始结构参考文档：[d3-hierarchy](https://github.com/d3/d3-hierarchy/tree/v2.0.0)

data 扩展属性：

| 属性名                      | 类型   | 描述                                                  | 示例     |
| --------------------------- | ------ | ----------------------------------------------------- | -------- |
| identifier                  | String | 节点唯一 id，id 包含了其所有父节点的 id，并以'\_'连接 | 1_4_9_13 |
| offset.x, offset.y          | Number | 节点**_基准点_**坐标，**当前渲染坐标**                |          |
| offset.x0, offset.y0        | Number | 节点**_基准点_**坐标，**上一次渲染的历史坐标**        |          |
| offset.left, offset.top     | Number | 节点**_绘制起点_**坐标，即图形占位最左上角的坐标      |          |
| offset.width, offset.height | Number | 节点实际的占位大小                                    |          |
| \_children                  | Array  | 隐藏的子节点                                          |          |

注意：

- 由于 data 属性即原始数据，要避免原始数据中有以上字段名，防止字段冲突
- 如果需要自行扩展，应当全部在 data 属性中进行扩展，否则会被 d3 清除
- 基准点是一个概念，是假设节点不占位的情况下的坐标，通过基准点可以计算出节点的真实起始位置，以及连线的起始位置。假设基准点设置在节点中心，那么 left = x -
  width/2; top = y - height/2
- 绘制起点指的是元素的真实起点坐标

### API

#### update

更新数据并重新绘制。

tree.update(source)

Arguments：

| 配置项 | 类型    | 描述                  | 是否必选 | 默认值                      |
| ------ | ------- | --------------------- | -------- | --------------------------- |
| source | d3-node | d3-hierarchy 中的节点 | 否       | this.nodeHierarchy 的根节点 |

#### nextTick

在下次 nodes 更新循环结束之后执行延迟回调，获取更新后的节点坐标。

Arguments：

| 配置项   | 类型     | 描述     | 是否必选 | 默认值 |
| -------- | -------- | -------- | -------- | ------ |
| callback | Function | 回调函数 | 是       | 无     |

## Decorators

实现了大部分基础的绘图功能，按照其功能划分三个核心模块，也是子类在继承时需要主要重写的模块，可以提供参考。

### applyCalc

计算模块，重写 d3 计算的 x，y 以实现自定义的节点间距，以及连线的坐标

#### Methods

- modifyNode：节点对象，可以执行添加 className，重新计算 x，y 等操作
- calcNodeOffset：实现节点坐标核心算法，计算节点真实占位
- getLinkSourceAndTarget: 计算连线真实起止点

#### Example

```js
class HTree extends HorizontalTree {
  // ... 其他代码
  modifyNode(o) {
    o.data.className = o.data.children?.length ? 'expand-children' : ''
  }
  calcNodeOffset(o) {
    return {
      x: o.y,
      y: o.x,
      left: o.y - this.nodeSize[1] / 2,
      top: o.x - this.nodeSize[0] / 2,
      width: this.nodeSize[1],
      height: this.nodeSize[0]
    }
  }
  getLinkSourceAndTarget(d) {
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
```

### applyEvent

事件模块，默认为节点绑定了展开/收起事件，子类实现的时候可以自定义扩展事件。注意同一个节点不可以重复绑定同一个事件类型，否则前一个会失效：

> If an event listener was previously registered for the same typename on a selected element, the old listener is removed before the new listener is added.

#### Methods

- applyExpandEvent: 绑定节点事件

#### Example

```js
class HTree extends HorizontalTree {
  // ... 其他代码
  applyExpandEvent(node) {
    super.applyExpandEvent(node)
    node.on('mouseover', (e, d) => {
      // 不能继续绑定click，否则会移除默认的click事件
      console.log('绑定其他事件')
    })
  }
}
```

### applyStyle

样式模块，子类必须实现的模块，根据计算出来的坐标绘制节点的具体样式。

#### Methods

- applyNodeContent: 绘制节点内容
- applyNodeUpdate: 更新节点内容
- applyLinkStyle: 绘制连线样式
- applyLinkUpdate: 更新连线样式
- pathGenerator: 自定义线段生成器

#### Example

```js
class HTree extends HorizontalTree {
  // ... 其他代码
  applyNodeUpdate(node) {
    nodeUpdate.selectAll('circle.expand').style('fill', d => {
      if (d.data.children?.length) {
        return '#467fd7'
      } else {
        return '#f65252'
      }
    })
  }
  pathGenerator() {
    let link = d3
      .linkVertical()
      .x(d => d.x)
      .y(d => d.y)
    return link(o)
  }
}
```

## util

### getTextWidth

获取文字的宽度

Arguments：

| 配置项   | 类型   | 描述     | 是否必选 | 默认值 |
| -------- | ------ | -------- | -------- | ------ |
| text     | String | 文字内容 | 是       | 无     |
| fontSize | Number | 文字大小 | 是       | 无     |

Returns:

| 类型   | 描述     |
| ------ | -------- |
| Number | 文字宽度 |

### cutTextForRow

将文字按照最大宽度换行，可限制最大行数

Arguments：

| 配置项   | 类型   | 描述         | 是否必选 | 默认值     |
| -------- | ------ | ------------ | -------- | ---------- |
| text     | String | 文字内容     | 是       | 无         |
| fontSize | Number | 文字大小     | 是       | 无         |
| maxWidth | Number | 单行最大宽度 | 是       | 无         |
| row      | Number | 最大行数     | 否       | 不限制行数 |

Returns:

| 类型          | 描述               |
| ------------- | ------------------ |
| Array[String] | 每行文字组成的数组 |
