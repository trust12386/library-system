import { newArrayProto } from "./array"
import Dep from "./dep"

class Observe {
  constructor(data) {
    this.dep = new Dep()
    // Object.defineProperty只能劫持已经存在的属性(vue因此单独写了一些功能 $set $delete)
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })
    if (Array.isArray(data)) {
      // 需要重写数组的七个方法
      data.__proto__ = newArrayProto
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }

  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  
  observeArray(data) {
    data.forEach(item => observe(item))
  }
}

function dependArray(value) {
  for(let i =0;i<value.length;i++){
    let current = value[i]
    current.__ob__ && current.__ob__.dep.depend()
    if(Array.isArray(current)) {
      dependArray(current)
    }
  }
}

function defineReactive(target, key, value) {
  let childOb = observe(value)
  let dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      if(Dep.target){
        dep.depend()
        if(childOb) {
          childOb.dep.depend()
          if(Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set(newValue) {
      if (value === newValue) return
      observe(newValue)
      value = newValue
      dep.notify() //通知更新
    }
  })
}

export function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return
  }
  if(data.__ob__ instanceof Observe) {
    return data.__ob__
  }

  return new Observe(data)
}