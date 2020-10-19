import Watcher from './observer/watcher'
import { patch } from './vdom/patch'
export function lifecycleMinxin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    vm.$el = patch(vm.$options.el, vnode)
  }
}
export function mountComponent(vm, el) {
  let updateComponent = () => {
    vm._update(vm._render())
  }
  new Watcher(vm, updateComponent, () => {}, true)
}
