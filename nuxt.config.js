export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'y',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
  css: ['ant-design-vue/dist/antd.css', 'ez-styles/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui'],

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
  build: {}
}
