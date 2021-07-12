import Webpack from 'webpack'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ezreal-yk.cn',
    htmlAttrs: {
      lang: 'en'
    },
    env: {
      NODE_ENV: process.env.NODE_ENV
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'baidu-site-verification', content: 'code-av5DMXR48f' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css',
        rel: 'stylesheet',
        integrity: 'sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x',
        crossorigin: 'anonymous'
      }
    ],
    script: [
      {
        src:
          '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>'
      },
      {
        src: '<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>'
      }
    ]
  },
  // axios: {
  //   proxy: true, // 表示开启代理
  //   prefix: '', // 表示给请求url加个前缀 /api
  //   credentials: true, // 表示跨域请求时是否需要使用凭证
  // },
  // proxy: {
  //   '/api': {
  //     target: 'http://127.0.0.1:9003', // 目标接口域名
  //     changeOrigin: true, // 表示是否跨域
  //     pathRewrite: { '/api': '/api' },
  //   },
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css', 'styles/ez-styles/index.scss', 'styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui', '@/plugins/highlight', '@/plugins/vant', '@/plugins/cookies'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.plugins.push(
        new Webpack.DefinePlugin({
          __DEV__: process.env.NODE_ENV === 'dev',
          __PROD__: process.env.NODE_ENV === 'prod'
        })
      )
    }
  }
}
