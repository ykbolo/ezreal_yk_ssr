# WebC-SDK

WebC 组开发代码片段。

Rollup 构建。

## 命令

**开发**

npm run dev

**构建**

npm run build

## 开发

为了兼容 node 环境，在`utils/fit.js`中，将 window 模拟为一个空对象。开发时需要注意处理 window 对象对 node 环境的影响。

## 使用

使用 npm 安装：

```sh
npm i --save-dev webc-sdk
```

使用 ESM 或 CommonJs 方式导入模块：

```js
import { qxbBridge } from 'webc-sdk'
```

## 模块

- [qxbAppInfo](#qxbappinfo)
- [qxbBridge](#qxbbridge)
- [bodyScrollLock](#bodyscrolllock)
- [broadcast](#broadcast)
- [judgePlatform](#judgeplatform)
- [queryString](#querystring)
- [searchHistory](#searchhistory)
- [storage](#storage)
- [validate](#validate)
- [cache](#cache)
- [tracker](#tracker)
- [apiAgent](#apiagent)

### qxbAppInfo

启信宝 APP 用户基础信息。

用法：

```js
let info = qxbAppInfo(window.navigator.userAgent)
```

info 包含属性：

- version：应用版本。
- client：操作系统。android、ios。
- vip：用户 VIP 状态。Boolean。
- deviceId：设备标识。
- type：业务类型。

### qxbBridge

启信宝 APP 桥。

用法：

```js
let { config, data, ready, call, register, methods } = qxbBridge

ready() // 预先初始化，可选

let path = 'search/all'
call('QXB.Router', { router: encodeURIComponent(`qxb://${path}`) }) // 直接使用call方法
methods.route(path) // 使用封装好的方法
```

- config：全局配置
- data：桥准备好后的数据
- ready：准备桥
- call：方法用于主动调用桥。
- register：用于注册一个桥，以供客户端调用。
- methods：封装了具体桥，适配了 android 和 ios。具体方法见[qxbBridge.methods](./src/modules/qxb-bridge/index.js)

config 选项有：

- log：打印控制台日志

### bodyScrollLock

\<body\>锁定，用于解决滚动穿透问题。

用法：

```js
bodyScrollLock.fixedBody() // 锁定body
bodyScrollLock.looseBody() // 释放body
```

**注意**：body 锁定时 position 属性变为 fixed，`window.scrollTo`方法无效。

### broadcast

广播订阅。

用法：

```js
import { broadcast as Broadcast } from 'webc-sdk'

let broadcast = new Broadcast()

broadcast.on('event', data => {}) // 监听事件
broadcast.emit('event', 'ok') // 触发事件
```

### judgePlatform

判断平台。

用法：

```js
let platform = judgePlatform(window.navigator.userAgent)
```

platform 可能值有：

- browser：浏览器
- qxb：启信宝
- cc：名片全能王
- wx：微信

### queryString

参数序列化。

用法：

```js
let o = queryString.parse('a=1&b=2')
let s = queryString.stringify({ a: '1', b: '2' })
let q = queryString.query() // URL query
```

### searchHistory

搜索历史记录器。

用法：

```js
let searchHistory = new SearchHistory('test', 4)
searchHistory.add('2')
searchHistory.remove('1')
searchHistory.clear()
```

成员：

- list: [String]。历史列表

方法：

```js
/**
 * @name 构造方法
 * @param {String} name 存储名
 * @param {Number} max 最大长度
 */
constructor(name, (max = 10))
/**
 * @name 添加
 * @param {Any} value 值
 */
add(value)
/**
 * @name 删除
 * @param {Any} value 值
 */
remove(value)
/**
 * @name 清空
 */
clear()
```

### storage

前端本地存储。

用法：

```js
let { LocalStorage, SessionStorage } = storage

let localStorage = new LocalStorage()
let sessionStorage = new SessionStorage()
```

两个存储方式拥有相同的 api：

```js
/**
 * @name 保存
 * @param {String} key 键名
 * @param {Any} value 键值
 */
set(key, value)
/**
 * @name 读取
 * @param {String} key 键名
 */
get(key)
/**
 * @name 保存对象
 * @param {String} key 键名
 * @param {Any} value 键值
 */
setObject(key, object)
/**
 * @name 读取对象
 * @param {String} key 键名
 */
getObject(key)
/**
 * @name 删除
 * @param {String} key 键名
 */
clear(key)
/**
 * @name 判断是否包含
 * @param {String} key 键名
 */
contains(key)
```

## validate

字符串验证。

用法：

```js
let methods = validate.methods
let result = methods.website('https://www.qixin.com')
```

目前可以使用的规则有：

- required：非空
- number：数字
- integer：整数
- mobile：手机号（中国）
- tele：座机号（中国）
- phone：电话号（手机号或座机号，中国）
- email：电子邮件地址
- website：网站地址（https 或 https 协议）

可以链式调用：

```js
let result = validate('https://www.qixin.com').required().website().result
```

### cache

前端缓存。

可以选择内存、localStorage 和 sessionStorage 方式。

用法：

```js
let cache = new Cache('test')

let va = { a: 0 }
cache.set('a', va, 10)
let ca = cache.get('a')
```

方法：

```js
/**
 * @name 构造方法
 * @param {String} name 缓存名
 * @param {String} type 类型。memory，local，session
 * @param {Number} ttl 生存时间。单位：s
 */
constructor(name, (type = 'memory'), (ttl = 60 * 60 * 24))
/**
 * @name 设置
 * @param {String} key 键名
 * @param {Any} value 键值
 * @param {Number} ttl 生存时间。单位：s
 */
set(key, value, (ttl = undefined))
/**
 * @name 获取
 * @param {String} key 键名
 * @return {Any} 键值
 */
get(key)
/**
 * @name 清除
 * @param {String} key 键名
 */
clear(key)
```

set 方法的参数 ttl 的优先级高于 constructor 的参数 ttl。

### tracker

埋点。

用法示例可见[vue-template-hybrid](http://git.qixin007.com/web/vue-template-hybrid/blob/master/src/core/tracker/index.js)。

## apiAgent

1. 支持直接导出适配 axios 的用于代理请求的 adapter
2. 简易 axios，将 app 中 H5 中的请求通过客户端转发。

### Axios adapter:

https://github.com/axios/axios/tree/master/lib/adapters

```js
import axios from 'axios'
import { apiAgent } from 'webc-sdk'
const clientRequest = axios.create({
  adapter: apiAgent.adapter
})
```

### API：

apiAgent.get(api, config)

```js
// GET request
apiAgent
  .get('/api', {
    params: { from: 'web' },
    timeout: 10000
  })
  .then(res => {
    console.log(res.data)
  })
```

apiAgent.post(api, data, config)

```js
// POST request
apiAgent.post('/api', { name: 'web' }, { timeout: 10000 }).then(res => {
  console.log(res.data)
})
```

### Creating an instance:

You can create a new instance of axios with a custom config.The specified config will be merged with the instance config.

apiAgent.create(config)

```js
// common request config
const instance = apiAgent.create({ timeout: 10000, customConfig: '' })
instance
  .get('/api', {
    params: { from: 'web' },
    timeout: 10000
  })
  .then(res => {
    console.log(res.data)
  })
instance.post('/api', { name: 'web' }, { params: { from: 'web' }, timeout: 10000 }).then(res => {
  console.log(res.data)
})
```

### Request Config:

These are the available config options for making requests.

```js
{
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },
   // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 10000, // default is `10000` (no timeout)
}
```
