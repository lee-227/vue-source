import arrayMethods from './array'

class Observer {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false,
      configurable: false,
    })
    if (Array.isArray(data)) {
      Object.setPrototypeOf(data, arrayMethods)
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  observeArray(data) {
    data.forEach((item) => {
      observe(item)
    })
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key])
    })
  }
}
export function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue)
      value = newValue
    },
  })
}
export function observe(data) {
  if (typeof data !== 'object' || data === null) return
  if (data.__ob__) return
  return new Observer(data)
}
