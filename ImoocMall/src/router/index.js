import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:GoodsList
    },
    {
      path: '/cart',
      name:'Cart',
      component:Cart
    }
  ]
})


