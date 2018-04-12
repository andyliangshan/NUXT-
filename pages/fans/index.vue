<template>
  <div class="fans">
    <div class="fansTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-11">我的粉丝</div>
    </div>
    <div class="InterestList" ref="listData">
      <div class="showlist row">
        <div class="list-l col-3"><img src="../../assets/img/profile-ho.png" alt="userProfile"/></div>
        <div class="list-r col-9">
          <div class="list-r-title">@<span>NUmuxi</span></div>
          <div class="list-r-etc">
            <span>粉丝<em>12</em></span><span>获赞<em>30</em></span>
          </div>
          <div class="list-r-desc">[动]	praise; help; assist; laud;[名]	a literary eulogy; a surname; [例句]我认为此时喝杯咖啡是最赞的了。 I think coffee is probably the best thing at this point</div>
          <!--关注前-->
          <div class="list-r-attention">
            <a href="javascript:void(0);" class="attention active" ref="attentBtn">已关注</a>
          </div>
          <!--关注后 给a标签添加 active的class-->
        </div>
        <div class="list-links"><a href="/user/" class="links"></a></div>
      </div>
      <div class="showlist row">
        <div class="list-l col-3"><img src="../../assets/img/profile-ho.png" alt="userProfile"/></div>
        <div class="list-r col-9">
          <div class="list-r-title">@<span>NUmuxi</span></div>
          <div class="list-r-etc">
            <span>粉丝<em>12</em></span><span>获赞<em>30</em></span>
          </div>
          <div class="list-r-desc">[动]	praise; help; assist; laud;[名]	a literary eulogy; a surname; [例句]我认为此时喝杯咖啡是最赞的了。 I think coffee is probably the best thing at this point</div>
          <!--关注前-->
          <div class="list-r-attention">
            <a href="javascript:void(0);" class="attention active" ref="attentBtn">已关注</a>
          </div>
          <!--关注后 给a标签添加 active的class-->
        </div>
        <div class="list-links"><a href="/user/" class="links"></a></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'fans',
    data () {
      return {}
    },
    mounted () {},
    methods: {}
  }
</script>

<style lang="stylus">
@import "../../assets/styl/fans.styl";
</style>
