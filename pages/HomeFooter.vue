<template>
  <div class="footer">
    <div class="bottomBar row" style="margin: 0!important;">
      <div class="b-term col">
        <nuxt-link to="/" class="index">
          <div class="gps"></div>
          <div class="underline"></div>
        </nuxt-link>
      </div>
      <div class="b-term col">
        <nuxt-link to="/publishTweet" class="consulting">
          <div class="chat"></div>
        </nuxt-link>
      </div>
      <div class="b-term col">
        <nuxt-link to="/login" class="login">
          <div class="tel"></div>
          <div class="underline underline7"></div>
        </nuxt-link>
      </div>
    </div>
    <div class="bottom-holder"></div>
  </div>
</template>
<script>
</script>
<style lang="stylus">
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 44px;
    z-index 99

  .bottom-holder {
    height: 44px;
  }

  .bottomBar {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    color: #7b838e;
    z-index: 999;
    margin: 0 !important;
    background: #000;
    opacity: 0.95;
    height: 44px;

  .b-term {
    height: 44px;
    display: inline-block;
    text-align: center;
    position: relative;
    width: 33.3%;

    a {
      color: #7b838e;
      text-decoration: none;
      display: inline-block;
      width: 100%;
      height: 44px;

      .underline {
        display: none;
        width: 10px;
        height: 2px;
        background: #fff;
        position: absolute;
        left: 50%;
        margin-left: -5px;
        bottom: 0;
      }

      .underline7 {
        margin-left: -7px;
      }
    }

    a.nuxt-link-exact-active {
       .underline {
         display: block;
       }

      .gps {
        background: url(../assets/img/icon1.png) no-repeat;
        background-size: contain;
      }

      .tel {
        background: url(../assets/img/icon3-white.png) no-repeat;
        background-size: contain;
      }
    }

    .gps {
      margin: 0 auto;
      width: 24px;
      height: 24px;
      background: url(../assets/img/icon1-black.png) no-repeat;
      position: relative;
      bottom: 10px;
      top: 10px;
      background-size: contain;
    }

      .chat {
        margin: 0 auto;
        width: 28px;
        height: 28px;
        background: url(../assets/img/icon2.png) no-repeat;
        position: relative;
        bottom: 8px;
        top: 8px;
        background-size: contain;
      }

      .tel {
        margin: 0 auto;
        width: 24px;
        height: 24px;
        background: url(../assets/img/icon3.png) no-repeat;
        background-size: contain;
        position: relative;
        bottom: 10px;
        top: 10px;
      }
    }

    .b-term:last-child {
      border: none;
    }
    }
  }
</style>
