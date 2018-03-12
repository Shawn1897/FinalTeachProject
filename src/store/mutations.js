import {RECEVIE_ADDRESS,
  RECEVIE_FOODTYPES,
  RECEVIE_SHOPS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  RECEIVE_USER_INFO}
  from './mutation-types'
export default {
  [RECEVIE_ADDRESS](state,{address}){
    state.address = address
  },

  [RECEVIE_FOODTYPES](state,{foodTypes}){
    state.foodTypes = foodTypes
  },

  [RECEVIE_SHOPS](state,{shops}){
    state.shops = shops
  },

  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },

  [RECEIVE_INFO](state, {info}) {
    console.log(info)
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

}
