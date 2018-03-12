<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <span :class="{on:loginWay}" @click="setLoginWay(true)">短信登录</span>
          <span :class="{on:!loginWay}" @click="setLoginWay(false)" >密码登录</span>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">

          <!--手机验证码登录-->
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button class="get_verification" :class="{right_phone:rightPhone}"
                      v-show="!computeTime" @click="getCode">获取验证码</button>
              <button disabled="disabled" class="get_verification" :class="{right_phone:rightPhone}"
                      v-show="computeTime">{{computeTime}}s</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>

          <!--用户名密码登录-->
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" v-if="showPassword" v-model="pwd" placeholder="密码">
                <input type="password" maxlength="8" v-if="!showPassword" v-model="pwd" placeholder="密码">
                <div class="switch_button" :class="showPassword?'on':'off'" @click="switchShowPassword">
                  <div class="switch_circle" :class="{on:showPassword}"></div>
                  <span class="switch_text" v-show="showPassword">abc</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha" @click="changeCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  <alert-tip v-if="alertShow" :alertText="alertText" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {sendCode,smsLogin,pwdLogin} from '../../api'
  export default{
    components:{
      AlertTip
    },
    data(){
      return {
        loginWay:true, //true代表短信登录，false代表用户名密码登录
        phone:'',  //手机号
        code:'', //短信验证码
        name:'', //用户名
        pwd:'',  //密码
        captcha:'', //图片验证码
        computeTime:0,  //在没有点击"获取验证码"时最初默认时间是0
        showPassword:false,  //密码默认不显示

        alertText:'', //登录页提示框文本
        alertShow:false,  //是否弹出提示框
      }
    },
    methods:{

      //关闭提示框
      closeTip(){
        //关闭提示框
        this.alertShow= false
        console.log('closeTip')
      },

      //登录页左上角返回键
      go_back(){
        this.$router.back()
      },


      setLoginWay(loginWay){
        this.loginWay = loginWay
      },



      //因为引入了api,所以这里用异步的方式编写
      async getCode(){
        if(this.rightPhone){ //1、rightPhone,即输入了合法的手机号
          //2、开始倒计时
          this.computeTime = 60

          //3、启动循环定时器
          const intervalId = setInterval(() =>{
            this.computeTime--

            //4、到时间(0),停止计时
            if(this.computeTime === 0){
              clearInterval(intervalId)
            }
          },1000)

          //发送ajax请求，向手机发送验证码,异步的
          const result = await sendCode(this.phone)
          //console.log(result)

          //当输入的短信验证码错误时
          if(result.code === 1){
            //弹框弹出
            this.alertShow = true

            //显示错误信息
            this.alertText = result.msg
          }

        }
      },

      //用来设置是否显示密码的
      switchShowPassword(){
        this.showPassword = !this.showPassword
      },

      //用来刷新验证码的
      changeCaptcha(event){
        event.target.src = 'http://localhost:3000/captcha?time'+ new Date()
      },

//      //登录
      async login(){
        let result
        //表单验证
        if(this.loginWay){//true短信登录
          const {rightPhone,phone,code} = this
          if(!rightPhone){
            this.alertShow = true
            this.alertText = '请输入正确格式的手机号'
            return
          }else if(!/^\d{6}$/.test(code)){
            this.alertShow = true
            this.alertText = '请输入正确的验证码'
            return
          }
           result = await smsLogin({phone,code})
        }else{  //用户名密码登录
          const {name,pwd,captcha} = this
          if(!name){
            this.alertShow = true
            this.alertText = '必须输入用户名'
            return
          }else if(!pwd){
            this.alertShow = true
            this.alertText = '必须输入密码'
            return
          }else if(!captcha && captcha.length<4 && captcha.length>5){
            this.alertShow = true
            this.alertText = '请输入正确的验证码'
            return
        }
        //提交登录请求
           result = await pwdLogin({name,pwd,captcha})
        }
        //处理返回
        if(result.code === 0){
          //得到用户信息
          const userInfo = result.data

          //将用户信息保存到state中，算是保存到内存中吗？
          this.$store.dispatch('recordUserInfo',userInfo)

          //回退到个人信息页面
          this.$router.back()
        }else {
          this.alertShow = true
          this.alertText = result.msg
        }
      }
      },


    //用来处理输入框中的数字规范，即第一位必须是1，然后必须输入够11位数字
    computed:{
      rightPhone(){
        return /^1\d{10}$/.test(this.phone)
      },

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../static/gshop_pages/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >span
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color #666666
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.on
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
