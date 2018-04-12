<template>
  <div>
    <div class="attenPop col-1">...</div>
    <div :class="'attentPop ' + customClass">
      <span class="rangle">&nbsp;</span>
      <div class="attentBox">
        <div class="poplist">
          <a href="javascript:void(0);" class="cancelAttention">取消关注</a>
          <a href="javascript:void(0);" class="report">举报</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'attentPop',
    data () {
      return {
        msg: ''
      }
    },
    props: {
      customClass: {
        type: String,
        default: ''
      }
    },
    methods: {
    }
  }
</script>
<style lang="stylus">
  .attentPop {
    width: 186px;
    position: absolute;
    right: 0;
    top: 30px;
    z-index: 9;
    display: none;

  .attentBox {
    width: 100%;
    background: #0d0d0d;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 10px;
    border-radius: 4px;
  }

  span {
    display: block;
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #0d0d0d;
    border-left: 10px solid transparent;
    position: absolute;
    right: 10px;
    top: 0;
  }

  .poplist {
    clear: both;
    padding-top: 10px;
    width: 100%;

  a {
    display: block;
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: #fff;
  }

  a.cancelAttention {
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #fff;
  }

  a.report {
    border-radius: 0 0 4px 4px;
  }
  }
  }
</style>
