let config = {
  host: ''
}
if (__DEV__) {
  config.host = 'http://localhost:9003'
} else if (__PROD__) {
  config.host = 'http://ezreal-yk.cn/backend'
}
export default config
