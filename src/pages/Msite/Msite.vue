<template>
  <div class="msite">
    <!--首页头部-->

    <HeaderTop :title="address.name">
      <span class="header_search" slot="search">
            <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="login">
            <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>

    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(types,index) in foodTypesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(type,index2) in types" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+type.image_url">
              </div>
              <span>{{type.title}}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>

</template>

<script>
  import Swiper from 'swiper'
  import {mapState} from 'vuex'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default{

    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },

    mounted(){
      this.$store.dispatch('getFoodTypes'),
      this.$store.dispatch('getShops')

    },
    computed:{
      //from state
      ...mapState(['address','foodTypes']),
      foodTypesArr(){
        //创建一个大数组
        const arr = []
        const {foodTypes} = this
        //创建一个小数组
        let tempArr = []
        //遍历foodTypes，将生成的n个小数组添加到
        foodTypes.forEach(type => {
          //事先将遍历出来的数据放到大数组中
          if(tempArr.length === 0){
            //将遍历出来的数据放到大数组中
            arr.push(tempArr)
          }
          //因为轮播页最多放8个数据，所以让之前在大数组中放好的数据每8个放入到一个小数组中
          if(tempArr.length < 8){
            tempArr.push(type)
          }else {
            //创造一个新的小数组
            tempArr = []
            //将剩余的数据放入到刚刚新创造的小数组里
            tempArr.push(type)
            //将小数组保存到大数组中
            arr.push(tempArr)
          }
        })
            return arr
      }
    },
     components:{
      HeaderTop,
       ShopList
    },

    watch:{
      foodTypes(){
        this.$nextTick(() => {
          var swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../static/gshop_pages/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
