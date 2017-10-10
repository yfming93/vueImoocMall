// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router' //等同于下面一行
// import {router} from {router:router}

// import {sum,minus} from './util' //或者如下 minus和sum封装在util中
import * as util from './util'

Vue.config.productionTip = false

//切换到工作空间。 cnpm run dev
// console.log(`sum:${sum(1,7)}`); //sum:8
// console.log(`minus:${minus(8,1)}`); //minus:7  //或者如下
console.log(`sum:${util.sum(1,7)}`); //sum:8
console.log(`minus:${util.minus(8,1)}`); //minus:7

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  template: '<App/>',
  components: { App }
  // render: function (h) {
  //   return h(App);
  // }  //等同于上面两行
}).$mount("#app"); // .$mount("#app")挂载 和 el：的效果是一样的

