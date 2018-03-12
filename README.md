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


*  临时想到在WebStorm里经常可用到的快捷键，选中字体整体变大写，"ctrl + shift +　y"。与之对应的
变成小写即"ctrl + shift +　x"

JSON有两个部分属于结构，"类型和名称"

day04
第三方上下滑动UI库下载指令:npm install better-scroll --save

写template中的样式的时候，记住有时要设置class。否则页面会蹦
在编写登录语句时，要注意细节。比如提交请求时提交的是什么类型的以及参数是不是对象
  在ajax里编写get或是post请求时，如果先前对请求方式设置过，那么，在设置ajax与后台交互模块
这个文件上，在路径上添加post或get时就必须加''(单引号)
