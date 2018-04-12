<template>
  <div class="index-view">
    <tab-vue></tab-vue>
    <data-list></data-list>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import DataList from '../../components/DataList.vue'
  import TabVue from './tab.vue'
  import HomeFooter from '../HomeFooter.vue'

  export default {
    name: 'index-view',
    data () {
      return {
        showSharePop: false
      }
    },
    head () {
      return {
        title: '发现'
      }
    },
    components: {
      DataList,
      TabVue,
      HomeFooter
    }
  }
</script>

<style lang="stylus">
  @import '../../assets/styl/home.styl';

</style>
