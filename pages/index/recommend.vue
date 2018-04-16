<template>
  <div class="homeView">
    <pel-list></pel-list>
    <data-list :recommedList="result"></data-list>
    <common-footer></common-footer>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import DataList from '../../components/DataList/DataList.vue';
import PelList from './pelList.vue';
import commonFooter from '../HomeFooter.vue';

export default {
  name: 'homeView',
  data() {
    return {
      showSharePop: false,
      page: 1,
      limit: 10,
      result: {},
      recommedList: {},
    };
  },
  head() {
    return {
      title: '推荐',
    };
  },
  async asyncData() {
    try {
      let res = await axios.post('/api/tweet/rcd');
      return { result: res.data.rcdData.data };
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    DataList,
    PelList,
    commonFooter,
  },
  methods: {},
};
</script>

<style lang="stylus">
@import '../../assets/styl/home.styl';
</style>
