
import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'

//引入加载mockServer,注意，mockjs的引入方式与引入css(html中的link标签)相似
import './mock/MockServer'  //后面就可以访问内部定义好的接口



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,               //所有组件多了两个属性 $route/$router
  render: h => h(App), //将App映射成标签
store                 //所有组件都多了一个属性,$store
})
