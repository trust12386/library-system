import Watcher from "./observe/watcher"
import { createElementVNode, createTextVNode } from "./vnode/index"

function createElm(vnode) {
  let { tag, data, children, text } = vnode
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    patchProps(vnode.el, data)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}
function patchProps(el, attrs) {
  for (let key in attrs) {
    if (key === 'style') {
      for (let styleName in attrs.style) {
        el.style[styleName] = attrs.style[styleName]
      }
    } else {
      el.setAttribute(key, attrs[key])
    }
  }
}

function patch(oldVNode, vnode) {
  const isRealElement = oldVNode.nodeType
  if (isRealElement) {
    const elm = oldVNode
    const parentElm = elm.parentNode
    let newElm = createElm(vnode)
    parentElm.insertBefore(newElm, elm.nextSibling)
    parentElm.removeChild(elm)
    return newElm
  } else {
    // diff算法
  }
}

export function initLiftCycle(Vue) {
  Vue.prototype._update = function (vnode) { //将vnode转化为真实dom
    const vm = this, el = vm.$el
    // patch既有初始化的功能，又有更新的功能
    vm.$el = patch(el, vnode)
  }
  Vue.prototype._render = function () {
    return this.$options.render.call(this)
  }
  Vue.prototype._c = function () {
    return createElementVNode(this, ...arguments)
  }
  Vue.prototype._v = function () {
    return createTextVNode(this, ...arguments)
  }
  Vue.prototype._s = function (value) {
    if (typeof value !== 'object') return value
    return JSON.stringify(value)
  }
}

export function mountComponent(vm, el) {
  vm.$el = el
  const updateComponent = () => {
    vm._update(vm._render())
  }
  new Watcher(vm, updateComponent, true)
  // 1.调用render方法产生虚拟节点 虚拟DOM
  // 2.根据虚拟DOM产生真实DOM

  // 3.插入到el元素中
}

export function callHook(vm,hook) {
  const handlers = vm.$options[hook]
  if(handlers) {
    handlers.forEach(handler => handler.call(vm))
  }
}