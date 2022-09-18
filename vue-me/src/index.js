import { initGlobalAPI } from "./globalAPI"
import { initMixin } from "./init"
import { initLiftCycle } from "./liftcycle"
import Watcher, { nextTick } from "./observe/watcher"


function Vue(options) {
  this._init(options)
}

Vue.prototype.$nextTick = nextTick
initMixin(Vue)
initLiftCycle(Vue)
initGlobalAPI(Vue)

Vue.prototype.$watch = function(exprOrFn,cb,options={}) {
  new Watcher(this,exprOrFn,{user:true},cb)
}



export default Vue