字体图表链接：//at.alicdn.com/t/font_518606_rijg2hi5xj2it3xr.css

能用到的技术:
  前台数据处理:
              vue全家桶/技术栈
              vue
              vue-router
              vuex

              滑动库
              mint-ui
              vue-lazyload
              vue-scroller
              better-scroll
              swiper

              日期处理
              moment
              date-fns

  前后台交互:
              mock数据:mock.js
              接口测试:postman
              ajax请求：
                      vue-resource
                      axios

  模块化：
              ES6
              babel
遇到的问题：
    11位电话号码如何设置？利用正则表达式
    computed:{
          rightPhone(){
            return /^1\d{10}$/.test(this.phone)
          },

        }
    right_phone:rightPhone
    其中，right_phone用来设置样式（就本次练习来说是设置当输入框11位数字且第一位数字必须是1）
    &.right_phone
                      color #666666
                      将此样式放到当前div的css样式中

        在处理获取短信验证码等待时间时，记得将不显示倒计时那一栏不要设置disabled = disabled
     否则你就算敲烂键盘也不会看到倒计时的效果
