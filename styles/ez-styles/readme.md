# webc-style

WebC 样式库。

## 使用

使用 npm 安装：

```sh
npm i --save-dev webc-style
```

在全局样式文件中：

```scss
@import '~webc-style/index';
```

## 自定义

在引入前可以定义变量`$colors`、`$gaps`、`$levels`，这样自定义的颜色等值会覆盖默认的设置（`lib/_variable.scss`）。

## 文档

**目录**

1.  [布局](#layout)
2.  [盒模型](#box)
3.  [层级](#level)
4.  [字体](#font)
5.  [排版](#text)
6.  [边框](#border)
7.  [背景](#background)
8.  [交互](#interact)
9.  [装饰](#decoration)

### layout

_布局_

---

**位置**

| 名称     | 含义   | CSS         |
| -------- | ------ | ----------- |
| left-0   | 左边缘 | `left: 0`   |
| right-0  | 右边缘 | `right: 0`  |
| top-0    | 上边缘 | `top: 0`    |
| bottom-0 | 下边缘 | `bottom: 0` |

---

**相对**

| 名称       | 含义     | CSS                   |
| ---------- | -------- | --------------------- |
| p-relative | 相对位置 | `position: relative;` |

---

**绝对**

| 名称                            | 含义                     | CSS                                                                          |
| ------------------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| p-absolute                      | 绝对位置                 | `position: absolute;`                                                        |
| p-absolute-100                  | 充满包含块               | `position: absolute; left: 0; right: 0; top: 0; bottom: 0;`                  |
| p-absolute-100-center           | 处于中央                 | `position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto;`    |
| p-absolute-100-center-transform | 处于中央，transform 实现 | `position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);` |

---

**固定**

| 名称        | 含义       | CSS                                                                    |
| ----------- | ---------- | ---------------------------------------------------------------------- |
| p-fixed     | 固定位置   | `position: fixed;`                                                     |
| p-fixed-100 | 充满包含块 | `position: fixed; left: 0; right: 0; top: 0; bottom: 0;`               |
| p-fixed-100 | 处于中央   | `position: fixed; left: 0; right: 0; top: 0; bottom: 0; margin: auto;` |

---

**浮动**

| 名称        | 含义   | CSS                                                      |
| ----------- | ------ | -------------------------------------------------------- |
| float-left  | 左浮动 | `float: left;`                                           |
| float-right | 左浮动 | `float: right;`                                          |
| float-clear | 左浮动 | `&::after { content: ""; display: block; clear: both; }` |

---

**类型**

| 名称           | 含义 | CSS                      |
| -------------- | ---- | ------------------------ |
| d-none         | 无   | `display: none;`         |
| d-inline       | 行   | `display: inline;`       |
| d-block        | 块   | `display: block;`        |
| d-inline-block | 行块 | `display: inline-block;` |
| d-flex         | 块   | `display: flex;`         |
| d-inline-flex  | 行块 | `display: inline-flex;`  |

---

**流**

| 名称                    | 含义                      | CSS                               |
| ----------------------- | ------------------------- | --------------------------------- |
| flex-row                | 主轴水平方向              | `flex-direction: row;`            |
| flex-column             | 主轴垂直方向              | `flex-direction: column;`         |
| flex-wrap               | 主轴换行                  | `flex-wrap: wrap;`                |
| flex-nowrap             | 主轴不换行                | `flex-wrap: nowrap;`              |
| flex-none               | 主轴不缩放，基尺寸为 auto | `flex: none;`                     |
| flex-auto               | 主轴缩放，基尺寸 auto     | `flex: auto;`                     |
| flex-1                  | 主轴缩放，基尺寸为 0      | `flex: 1;`                        |
| flex-basis-0            | 主轴基尺寸为 0            | `flex-basis: 0;`                  |
| flex-grow-0             | 主轴放大系数为 0          | `flex-grow: 0;`                   |
| flex-grow-1             | 主轴放大系数为 1          | `flex-grow: 1;`                   |
| flex-shrink-0           | 主轴缩小系数为 0          | `flex-shrink: 0;`                 |
| flex-shrink-1           | 主轴缩小系数为 1          | `flex-shrink: 1;`                 |
| justify-content-start   | 主轴头对齐                | `justify-content: flex-start;`    |
| justify-content-end     | 主轴居尾对齐              | `justify-content: flex-end;`      |
| justify-content-center  | 主轴居中对齐              | `justify-content: center;`        |
| justify-content-between | 主轴两端对齐              | `justify-content: space-between;` |
| justify-content-around  | 主轴环绕                  | `justify-content: space-around;`  |
| align-items-start       | 交叉轴元素头对齐          | `align-items: flex-start;`        |
| align-items-end         | 交叉轴元素居尾对齐        | `align-items: flex-end;`          |
| align-items-center      | 交叉轴元素居中对齐        | `align-items: center;`            |
| align-items-stretch     | 交叉轴元素拉伸            | `align-self: stretch;`            |
| align-content-start     | 交叉轴头对齐              | `align-content: flex-start;`      |
| align-content-end       | 交叉轴尾对齐              | `align-content: flex-end;`        |
| align-content-center    | 交叉轴居中对齐            | `align-content: flex-center;`     |
| align-content-between   | 交叉轴两端对齐            | `align-content: flex-between;`    |
| align-content-around    | 交叉轴环绕                | `align-content: flex-around;`     |
| align-self-start        | 交叉轴元素自身头对齐      | `align-self: flex-start;`         |
| align-self-end          | 交叉轴元素居自身尾对齐    | `align-self: flex-end;`           |
| align-self-center       | 交叉轴元素自身居中对齐    | `align-self: center;`             |
| align-self-stretch      | 交叉轴元素自身拉伸        | `align-self: stretch;`            |

### box

盒模型

---

**尺寸计算方式**

| 名称               | 含义     | CSS                        |
| ------------------ | -------- | -------------------------- |
| box-sizing-border  | 边框基准 | `box-sizing: border-box;`  |
| box-sizing-content | 内容基准 | `box-sizing: content-box;` |

---

**尺寸**

| 名称             | 含义           | CSS                            |
| ---------------- | -------------- | ------------------------------ |
| [w, h]-0         | 0 尺寸         | `[width, height]: 0;`          |
| [w, h]-[50, 100] | 比例尺寸       | `[width, height]: [50, 100]%;` |
| w-100vw          | 满视口宽度     | `width: 100vw;`                |
| h-100vh          | 满视口高度     | `height: 100vh;`               |
| w-1em            | 单字符宽度     | `width: 1em;`                  |
| h-1em            | 单字符高度     | `height: 1em;`                 |
| w-auto           | 自动宽度       | `width: auto;`                 |
| h-auto           | 自动高度       | `height: auto;`                |
| min-width-0      | 最小宽度 0     | `min-width: 0;`                |
| min-height-0     | 最小高度 0     | `min-height: 0;`               |
| min-height-100   | 最小高度 100%  | `min-height: 100%`             |
| min-height-100vh | 最小高度 100vh | `min-height: 100vh;`           |

其中，w 表示宽度 width，h 表示高度 height。

示例：w-50 表示 50%的宽度。

---

**边距**

| 名称                        | 含义             | CSS                                                                                  |
| --------------------------- | ---------------- | ------------------------------------------------------------------------------------ |
| [m, p]-0                    | 0 边距           | `[margin, padding]: 0;`                                                              |
| [m, p]-[h, v]-\<gap\>       | 双方向边距       | `[margin, padding]-[left, top]: <gap>px; [margin, padding]-[right, bottom]:<gap>px;` |
| [m, p]-[t, b, l, r]-\<gap\> | 单方向边距       | `[margin, padding]-[left, right, top, bottom]: <gap>px;`                             |
| [m, p]-[t, b, l, r]-0       | 减法             | `[margin, padding]-[left, right, top, bottom]: 0 !important;`                        |
| m-auto                      | 自动外边距       | `margin: auto;`                                                                      |
| m-[h, v]-auto               | 双方向自动外边距 | `margin-[left, top]: auto; margin-[right, bottom]: auto;`                            |
| m-[t, b, l, r]-auto         | 单方向自动外边距 | `margin-[left, right, top, bottom]: auto;`                                           |
| p-t-1                       | 上 1px 边距      | `padding-top: 1px;`                                                                  |

其中，m 表示外边距 margin，p 表示内边距 padding；l 表示左 left，r 表示右 right，t 表示顶 top，b 表示底 bottom；gap 为变量$gaps 中的值。示例：m-l-5 表示左外边距
5px。

---

**溢出**

| 名称              | 含义     | CSS                   |
| ----------------- | -------- | --------------------- |
| overflow-auto     | 自动     | `overflow: auto;`     |
| overflow-auto-x   | 水平自动 | `overflow-x: auto;`   |
| overflow-auto-y   | 垂直自动 | `overflow-y: auto;`   |
| overflow-hidden   | 隐藏     | `overflow: hidden;`   |
| overflow-hidden-x | 水平隐藏 | `overflow-x: hidden;` |
| overflow-hidden-y | 垂直隐藏 | `overflow-y: hidden;` |

### level

层级

---

**等级**

| 名称            | 含义                                       | CSS                       |
| --------------- | ------------------------------------------ | ------------------------- |
| z-\<level-key\> | 等级，可以通过定义$levels 变量以自定义键值 | `z-index: <level-value>;` |

其中，level-key 为变量$levels中元素的键名，level-value为键值。
示例：如果在$levels 中定义了元素 a: 1，则会存在类 z-a，其对应的 CSS 为 z-index: 1。

---

**可见性**

| 名称          | 含义 | CSS                    |
| ------------- | ---- | ---------------------- |
| level-visible | 显示 | `visibility: visible;` |
| level-hidden  | 隐藏 | `visibility: hidden;`  |

### font

字体

---

**字号**

| 名称     | 含义        | CSS                    |
| -------- | ----------- | ---------------------- |
| f-[8-30] | 字号 8~30px | `font-size: [8-30]px;` |

---

**颜色**

| 名称            | 含义                                       | CSS                    |
| --------------- | ------------------------------------------ | ---------------------- |
| f-\<color-key\> | 颜色，可以通过定义$colors 变量以自定义键值 | `color: <color-value>` |

其中，color-key 为变量$colors 中元素的键名，color-value 为键值。

---

**字重**

| 名称     | 含义 | CSS                               |
| -------- | ---- | --------------------------------- |
| f-thin   | 细体 | `font-weight: thin;`              |
| f-normal | 普通 | `font-weight: normal !important;` |
| f-bold   | 粗体 | `font-weight: bold;`              |
| f-w-[100-900]  | 数字型100-900 | `font-weight: [100-900];`|

### layout

排版

---

**对齐**

| 名称     | 含义         | CSS                       |
| -------- | ------------ | ------------------------- |
| t-left   | 水平左对齐   | `text-align: left;`       |
| t-center | 水平居中对齐 | `text-align: center;`     |
| t-right  | 水平右对齐   | `text-align: right;`      |
| t-top    | 垂直顶对齐   | `vertical-align: top;`    |
| t-middle | 垂直居中对齐 | `vertical-align: middle;` |
| t-bottom | 垂直底对齐   | `vertical-align: bottom;` |

---

**换行**

| 名称             | 含义             | CSS                                                                                                |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| t-nowrap         | 禁换行           | `white-space: nowrap;`                                                                             |
| t-pre            | 保留换行和空白符 | `white-space: pre;`                                                                                |
| t-break          | 截断单词         | `word-break: break-all; overflow-wrap: break-word;`                                                |
| t-ellipsis       | 单行省略号       | `overflow: hidden; white-space: nowrap; text-overflow: ellipsis;`                                  |
| t-ellipsis-[1-3] | 多行行省略号     | `overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: [1-3];` |

---

**行距**

| 名称          | 含义     | CSS               |
| ------------- | -------- | ----------------- |
| line-height-1 | 单倍行距 | `line-height: 1;` |

### border

边框

---

**颜色和位置**

| 名称                         | 含义         | CSS                                                           |
| ---------------------------- | ------------ | ------------------------------------------------------------- |
| b-\<color-key\>              | 全边框       | `border: 1px solid <color-value>;`                            |
| b-[l, r, t, b]-\<color-key\> | 单边框       | `border-[left, right, top, bottom]: 1px solid <color-value>;` |
| b-color-current              | 当前颜色边框 | `border-color: currentColor;`                                 |

其中，l 表示左 left，r 表示右 right，t 表示顶 top，b 表示底 bottom，color-key 为变量$colors 中元素的键名，color-value 为键值。

### background

背景

---

**颜色**

| 名称             | 含义         | CSS                                |
| ---------------- | ------------ | ---------------------------------- |
| bg-\<color-key\> | 颜色         | `background-color: <color-value>;` |
| bg-current       | 当前颜色背景 | `background-color: currentColor;`  |
| bg-transparent   | 透明背景     | `background-color: transparent;`   |

其中，color-key 为变量$colors 中元素的键名，color-value 为键值。

---

**布局**

| 名称       | 含义     | CSS                                                          |
| ---------- | -------- | ------------------------------------------------------------ |
| bg-100     | 100%尺寸 | `background-size: 100% 100%; background-repeat: no-repeat;`  |
| bg-contain | 包含     | `background-size: contain; background-repeat: no-repeat;`    |
| bg-cover   | 覆盖     | `background-size: cover; background-repeat: no-repeat;`      |
| bg-center  | 居中     | `background-position: center; background-repeat: no-repeat;` |

### interact

交互

---

**事件**

| 名称                | 含义         | CSS                     |
| ------------------- | ------------ | ----------------------- |
| pointer-events-all  | 全部点击事件 | `pointer-events: all;`  |
| pointer-events-none | 禁用点击事件 | `pointer-events: none;` |

---

**指针**

| 名称           | 含义 | CSS                |
| -------------- | ---- | ------------------ |
| cursor-default | 默认 | `cursor: default`  |
| cursor-pointer | 手形 | `cursor: pointer;` |

### decoration

修饰

---

**不透明度**

| 名称           | 含义     | CSS                  |
| -------------- | -------- | -------------------- |
| opacity-[0-10] | 不透明度 | `opacity: 0.[0-10];` |
