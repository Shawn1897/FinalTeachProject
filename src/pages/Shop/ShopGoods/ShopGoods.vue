<template>
  <div class="goods">
    <!--这是左侧分类栏-->
    <div class="goods">
      <div class="menu-wrapper">
        <!--current-->
        <ul>
          <!--遍历出的每一个li-->
          <li class="menu-item" v-for="(good,index) in goods" :key="index">
            <span class="text bottom-border-1px"><!---->
              <span class="icon" v-if="good.type >=0" :class="supportClasses[good.type]"></span>
            {{good.name}}
          </span></li>

        </ul>
      </div>
    </div>

    <!--这是右侧食品-->
    <div class="foods-wrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">

          <!--折扣-->
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods"
                :key="index">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>

              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <!--月售91份-->
                  <span class="count">月售{{food.sellCount}}份</span>
                  <!--好评率100%-->
                  <span>好评率{{food.rating}}%</span>
                </div>

                <!--价格9元-->
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <!--有肯能出现的原价-->
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>

                <div class="cartcontrol-wrapper">
                  这是CartControl组件
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default{
    data(){
      return{
        supportClasses: ['decrease', 'discount', 'special', 'invoice', 'guarantee']

        }
      }
    ,

    //从后台‘获取’数据(这样一来我的vuex里的state里就有goods了)
    mounted(){
      this.$store.dispatch('getShopGoods')
    },

    //从state读取数据
    computed: {
      ...mapState(['goods'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../static/gshop_pages/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 66px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        margin-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


