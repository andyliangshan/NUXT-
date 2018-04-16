<template>
  <div class="footer">
    <div class="copyright">
      <p>浙ICP备18007166号-1 </p>
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
    height: 84px;
    z-index 99
    background #fff
    border-top 1px solid #E5E5E5
    left 0 

  .bottom-holder {
    height: 84px;
  }

  .copyright {
    font-size 12px;
    text-align center
    color #afafaf
    padding-top 35px

    p {
      margin 0;
    }
  }
}

@media screen and (max-width 767px) {
  .footer {
    height 42px
    position static
    border none

    .bottom-holder {
      height 0
    }

    .copyright {
      padding-top 14px
    }
  }
}
</style>
