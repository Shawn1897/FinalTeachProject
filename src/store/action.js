import {
  reqAddress,
  reqFoodTypes,
  shopList,
reqShopGoods,
reqShopRatings,
reqShopInfo} from '../api'

import {
  RECEVIE_ADDRESS,
  RECEVIE_FOODTYPES,
  RECEVIE_SHOPS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  RECEIVE_USER_INFO} from './mutation-types'


export default {
  //异步获取地址
  async getAddress({commit,state}){
    const geohash = state.latitude + ',' + state.longitude
    console.log('address','foodTypes')
    // 发ajax请求获取数据
    const result = await reqAddress(geohash)

    // commit 到 mutation接收数据
    commit(RECEVIE_ADDRESS,{address: result.data})
  },

  //异步获取食品分类信息
  async getFoodTypes({commit},callback){
    // 发ajax请求获取数据
    const result = await reqFoodTypes()

    // commit 到 mutation接收数据
    commit(RECEVIE_FOODTYPES,{foodTypes:result.data})
    callback && callback()
  },

  //异步获取店铺列表信息
  async getShops({commit,state}) {

    const {latitude,longitude} = state

    // 发ajax请求获取数据
    const result = await shopList({latitude,longitude})

    // commit 到 mutation接收数据
    commit(RECEVIE_SHOPS,{shops:result.data})
  },

  //将成功登录的用户数据保存到state中
  recordUserInfo({commit},userInfo){

    // commit 到 mutation接收数据
    commit(RECEIVE_USER_INFO,{userInfo})
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})

    }
  },

// 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

// 异步获取商家商品列表
  async getShopGoods({commit}) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },
}

