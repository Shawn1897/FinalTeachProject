import {reqAddress,reqFoodTypes,shopList} from '../api'
import {RECEVIE_ADDRESS,RECEVIE_FOODTYPES,RECEVIE_SHOPS} from './mutation-types'


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
  }
}

