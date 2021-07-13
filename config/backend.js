let config = {
  host: ''
}
if (__DEV__) {
  config.host = 'http://127.0.0.1:8080/backend'
} else if (__PROD__) {
  config.host = 'http://112.124.56.144:8080/backend'
}
export default config
