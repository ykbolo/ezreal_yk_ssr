let config = {
  host: ''
}
if (__DEV__) {
  config.host = 'http://127.0.0.1:9003'
} else if (__PROD__) {
  config.host = 'http://112.124.56.144:9003'
}
export default config
