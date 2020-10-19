import { initState } from './state'
import { complieToFunction } from './compiler/index'
import { mountComponent } from './lifecycle'

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(vm)
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) {
    el = document.querySelector(el)
    const vm = this
    vm.$options.el = el
    const options = vm.$options
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
      }
      const render = complieToFunction(template)
      options.render = render
    }
    mountComponent(vm, el)
  }
}
