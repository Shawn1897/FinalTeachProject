// vuex的核心管理对象store对象模块
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import action from './action'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions:action, //注：这里必须按规定好的类名使用、否则绝对无法运行（或是如左处这样重新定义）
  mutations,
  getters
})
