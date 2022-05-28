import App from './App';

// #ifndef VUE3
import Vue from 'vue';
Vue.config.productionTip = false;
import uView from '@/uni_modules/uview-ui';
import store from './store/index';
let vuexStore = require('./store/$u.mixin');
Vue.use(uView);
Vue.mixin(vuexStore);
App.mpType = 'app';
const app = new Vue({
  store,
  ...App,
});
require('./request/config')(app);
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
