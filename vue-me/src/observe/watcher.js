import Dep, { popTarget, pushTarget } from "./dep"

let id = 0

class Watcher {
  constructor(vm, exprOrFn, options, cb) { // 不同的组件有不同的watcher
    this.id = id++
    this.renderWatcher = options // 是一个渲染watcher
    if (typeof exprOrFn === 'string') {
      this.getter = function () {
        return vm[exprOrFn]
      }
    } else {
      this.getter = exprOrFn
    }
    this.deps = []
    this.depIds = new Set()
    this.lazy = options.lazy
    this.cb = cb
    this.dirty = this.lazy
    this.value = this.lazy ? undefined : this.get()
    this.vm = vm
    this.user = options.user //标识是否用用户自己的watcher
  }
  evaluate() {
    this.value = this.get()
    this.dirty = false
  }
  get() {
    pushTarget(this)// 当前的watcher
    let value = this.getter.call(this.vm) //调用函数，去vm上取值取值
    popTarget()
    return value
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depIds.has(id)) {
      this.deps.push(dep)
      this.depIds.add(id)
      dep.addSub(this)
    }
  }
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true
    } else {
      queueWatcher(this)
    }
    // this.get() //重新渲染
  }
  run() {
    let oldValue = this.value
    let newValue = this.get()
    if (this.user) {
      this.cb.call(this.vm, newValue, oldValue)
    }
  }
}

let queue = []
let has = {}
let pending = false

function flushSchedulerQueue() {
  let flushQueue = queue.slice(0)
  queue = []
  has = {}
  pending = false
  flushQueue.forEach(watcher => watcher.run())
}

function queueWatcher(watcher) {
  const id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
    has[id] = true
    if (!pending) {
      nextTick(flushSchedulerQueue);
      pending = true
    }
  }
}

let callbacks = []
let waiting = false

function flushCallbacks() {
  let cbs = callbacks.slice(0)
  waiting = false
  callbacks = []
  cbs.forEach(cb => cb())
}

let timeFunc
if (Promise) {
  timeFunc = () => {
    Promise.resolve().then(flushCallbacks)
  }
} else if (MutationObserver) {
  let observer = new MutationObserver(flushCallbacks)
  let textNode = document.createTextNode(1)
  observer.observe(textNode, {
    characterData: true
  })
  timeFunc = () => {
    textNode.textContent = 2
  }
} else if (setImmediate) {
  timeFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timeFunc = () => {
    setTimeout(flushCallbacks);
  }
}

export function nextTick(cb) {
  callbacks.push(cb)
  if (!waiting) {
    timeFunc()
    waiting = true
  }
}

// 一个组件有多个属性(多个dep)，一个属性可能在多个组件中使用(多个watcher)
export default Watcher