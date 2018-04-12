<template>
  <div class="privateLetter">
    <div class="submitBox row">
      <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-11">私信</div>
    </div>
    <div class="privateLetterList">
      <div class="list row">
        <div class="letter-profile col-2">
          <img src="../../assets/img/profile-ho.png" alt="profile"/>
          <em>3</em>
        </div>
        <div class="letter-info col-10">
          <div class="letter-title">路人丁</div>
          <div class="letter-desc">管家丁建国发起了接机及入住</div>
          <div class="letter-publish-time">18:50</div>
        </div>
      </div>
      <div class="list row">
        <div class="letter-profile col-2">
          <img src="../../assets/img/profile-ho.png" alt="profile"/>
          <!--<em>3</em>-->
        </div>
        <div class="letter-info col-10">
          <div class="letter-title">路人丁</div>
          <div class="letter-desc">管家丁建国发起了接机及入住</div>
          <div class="letter-publish-time">18:50</div>
        </div>
      </div>
      <div class="list row">
        <div class="letter-profile col-2">
          <img src="../../assets/img/profile-ho.png" alt="profile"/>
          <!--<em>3</em>-->
        </div>
        <div class="letter-info col-10">
          <div class="letter-title">路人丁</div>
          <div class="letter-desc">管家丁建国发起了接机及入住</div>
          <div class="letter-publish-time">18:50</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'privateLetter',
    data () {
      return {}
    }
  }
</script>

<style lang="stylus">
  @import "../../assets/styl/privateLetter.styl";
</style>
