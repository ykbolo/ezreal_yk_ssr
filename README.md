# ezreal_yk_ssr

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build[dev:prod]
$ npm run start[dev:prod]

# generate static project
$ npm run generate
# 更新文章
$ npm run updateMds
# 同步静态资源
$ npm run syncAssets
```

## 如何发布一篇文章？

1.在 assets 下的 techs 目录中编写 md 文件，将所需的静态资源（图片）写在 assets 目录下，如 assets/techs-images，通过 vscode 插件预览文章

2.将相对路径替换为绝对路径`../techs-images` -> `[../techs-images](http://112.124.56.144/assets/techs-images)`

3.将改动 commit、push 上去

4.npm run updateMds 更新文章数据库

5.服务器端运行 npm run syncAssets，同步静态资源

_/styles_

用于存放公用样式的其中 ez-styles 结合了一些对 bootstrap 类的参考，集成了了一些对于样式语义化的封装。如 text-align:center 可以直接写成 t-center 等

_/server_

为项目的后台，基于 express 的，与 nuxt 项目是独立开来的。存放了一些接口的实现代码。采用 es6 语法，没有经过 webpack 编译，直接用 babel-node 启动运行。

_/config_

用于存放一些配置，mysql，host 等，有 cross-env 的概念

_/plugins_

存放一些第三方插件，如 antd，vant，highlight 等，在 nuxt-config 中配置

_/static_

存放 host+port/xxx/根目录下的文件。如本项目采用 8080 端口启动，用于经过 nginx 反向代理，可以直接在项目的/目录下访问到相应的静态资源。

如 robots.txt，可以直接访问拿到

_/tools_

存放基于 node 实现的一些脚本，如 mysql 数据同步，静态资源同步等。可以手动执行，也可以集成在发布脚本里面

如将文章入库 `"updateMds": "babel-node ./tools/fileDisplay.js",`
