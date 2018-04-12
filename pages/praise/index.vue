<template>
  <div class="zan">
    <div class="fansTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-11">赞同的内容</div>
    </div>
    <data-list-box ref="datalist"></data-list-box>
  </div>
</template>
<script>
  import DataListBox from '../../components/DataList.vue'

  export default {
    name: 'zan',
    data () {
      return {}
    },
    components: {
      DataListBox
    },
    mounted () {},
    methods: {}
  }
</script>

<style lang="stylus">
@import "../../assets/styl/praise.styl";
 </style>
