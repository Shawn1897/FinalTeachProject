/*
用mockjs提供mock接口
 */
import Mock from 'mockjs'
import data from './data.json' //对象

Mock.mock('/goods',)

//向外提供goods数据
Mock.mock('/goods',{code:0,data:data.goods})

//向外提供ratings数据
Mock.mock('/ratings',{code:0,data:data.ratings})

//向外提供info数据
Mock.mock('/info',{code:0,data:data.info})

//export default? 这里不需要(没有要)暴露(的)文件
