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

4.服务器端运行 npm run syncAssets，同步静态资源

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
