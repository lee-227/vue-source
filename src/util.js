let callbacks = []
let waiting = false
function flushCallbacks() {
  callbacks.forEach((cb) => cb())
  waiting = false
  callbacks = []
}
export function nextTick(cb) {
  callbacks.push(cb)
  if (!waiting) {
    waiting = true
    Promise.resolve().then(flushCallbacks)
  }
}
