<template>
  <div class="nav-container">
    <div class="menu">
      <div class="zhiB-msg">
        <a href="/notice" class="message" >
          <img src="../assets/img/Info.png" alt="Group"/>
          <em ref="showFlagIcon">3</em>
        </a>
      </div>
      <div class="zhiB-list">
        <nuxt-link :to="{path: 'follow'}" class="active"><em>关注</em><span class="underline"></span></nuxt-link>
        <nuxt-link :to="{path: 'recommend'}"><em>推荐</em><span class="underline"></span></nuxt-link>
        <nuxt-link :to="{path: 'find'}"><em>发现</em><span class="underline"></span></nuxt-link>
      </div>
      <div class="zhiB-search">
        <a href="/search" id="search" class="search" ><img src="../assets/img/search-b.png" alt="search"/></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        results: {}
      }
    },
    props: {
      customClass: {
        type: String,
        default: ''
      }
    },
    mounted () { },
    methods: {}
  }
</script>

<style lang="stylus">
  .nav-container {
    background: #FAFAFA;
    padding: 11px 15px 5px;

    .menu {
      margin: 0;
      width: 100%;
      height: 28px;
      display: flex;

      .zhiB-list {
        padding: 0;
        width: 24px;
        height: 24px;
        flex: 1;
        text-align: center;

        a {
          display: inline-block;
          font-size: 16px;
          color: #939393;
          font-weight: normal;
          line-height: 10px;
          margin-top: 7px;

          em {
            font-style: normal;
            display: inline-block;
            width: 100%;
          }

          span {
            display: inline-block;
            width: 14px;
            height: 4px;
            background: none;
            border-radius: 2px;
          }
        }

        a.nuxt-link-active {
          color: #138FF2;
          font-weight: bolder;
          font-size: 18px;

          span {
            background: #138FF2;
          }
        }
      }

      .zhiB-search {
        height: 24px;
        text-align: center;
        padding: 0;
        width: 24px;

        a {
          display: block;
          width: 100%;
          height: 100%;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }

      .zhiB-msg {
        padding: 0;
        height: 28px;
        width: 24px;

        a {
          display: block;
          width: 100%;
          position: relative;
          text-align: right;

          img {
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: super;
          }

          em {
            position: absolute;
            top: -4px;
            right: 0;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            text-align: center;
            font-size: 9px;
            line-height: 14px;
            background: #E14123;
            font-style: normal;
            display: block;
            color: #fff;
          }
        }
      }
    }
  }
</style>
