<template>
  <div class="homeView">
    <pel-list></pel-list>
    <data-list :recommedList="tweetRcdData"></data-list>
    <common-footer></common-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DataList from '../../components/DataList/DataList';
import PelList from './pelList';
import commonFooter from '../HomeFooter';

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
  components: {
    DataList,
    PelList,
    commonFooter,
  },
  mounted() {
    this.RECOMMEND_ATICLE_SPECAL_DATA()
  },
  computed: {
    ...mapGetters(['tweetRcdData'])
  },
  methods: {
    ...mapActions(['RECOMMEND_ATICLE_SPECAL_DATA'])
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/home.styl';
</style>
