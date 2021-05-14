import Agent from './core/agent'
import adapter from './core/dispatchRequest'

export default {
  create(config) {
    return new Agent(config)
  },
  post(url, data, config) {
    return new Agent().post(url, data, config)
  },
  get(url, config) {
    return new Agent().get(url, config)
  },
  adapter
}
