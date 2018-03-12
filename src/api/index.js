// 与后台交互模块

import ajax from './ajax'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax('/api/position/'+geohash)


// 2、获取食品分类列表
export const reqFoodTypes = () => ajax('/api/index_categor')


// 3、根据经纬度获取商铺列表
export const shopList = ({latitude,longitude}) => ajax('/api/shops',{latitude,longitude})


// 4、获取一次性验证码
export const reqCaptcha = () => ajax('/api/captcha')


// 5、用户名密码登陆
export const pwdLogin = ({name,pwd,captcha}) => ajax('/api/login_pwd',{name,pwd,captcha},'post')


// 6、发送短信验证码
export const sendCode = (phone) => ajax('api/sendcode ',phone)


// 7、手机号验证码登陆
export const smsLogin = ({phone,code}) => ajax('/api/login_sms',{phone,code})


// 8、根据会话获取用户信息
export const userInfo = () => ajax('/api/userinfo')


//9、获取商家食品列表信息,9-11为何不需要api代理？因为9-11是后台存储好的数据，不需要通过api调
//从store中的action调
export const reqShopGoods = () => ajax('/goods')


//10、获取商家评论列表信息
export const reqShopRatings = () => ajax('/ratings')


//11、获取商家详细信息
export const reqShopInfo = () => ajax('/info')
