import { initMixin } from './init'
import { lifecycleMinxin } from './lifecycle'
import { renderMixin } from './render'

function Vue(options) {
  this._init(options)
}
initMixin(Vue)
lifecycleMinxin(Vue)
renderMixin(Vue)
export default Vue
