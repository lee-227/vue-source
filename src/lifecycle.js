import Watcher from "./observer/watcher";
import { patch } from "./vdom/patch";
export function lifecycleMinxin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}
export function mountComponent(vm, el) {
  let updateComponent = () => {
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent, () => {}, true);
}
export function callHook(vm, hook) {
  let handlers = vm.$options[hook];
  if (handlers) {
    handlers.forEach((handler) => handler.call(vm));
  }
}
