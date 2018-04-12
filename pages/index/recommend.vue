<template>
  <div class="index-view">
    <pel-list></pel-list>
    <data-list :recommedList="result"></data-list>
    <home-footer></home-footer>
  </div>
</template>

<script>
  /* eslint-disable */
  import axios from '~/plugins/axios'
  import DataList from '../../components/DataList/DataList.vue'
  import PelList from './pelList.vue'
  import HomeFooter from '../HomeFooter.vue'

  export default {
    name: 'index-view',
    data () {
      return {
        showSharePop: false,
        page: 1,
        limit: 10,
        result: {},
        recommedList: {}
      }
    },
    head () {
      return {
        title: '推荐'
      }
    },
    async asyncData () {
      try {
        let res = await axios.post('/api/tweet/rcd')
        return { result: res.data.rcdData.data }
      }
      catch(err) {
        console.log(err);
      }
    },
    components: {
      DataList,
      PelList,
      HomeFooter
    },
    methods: { }
  }
</script>

<style lang="stylus">
  @import '../../assets/styl/home.styl';

</style>
