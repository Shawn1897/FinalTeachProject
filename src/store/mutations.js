import {RECEVIE_ADDRESS,
  RECEVIE_FOODTYPES,
  RECEVIE_SHOPS}
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
  }
}
