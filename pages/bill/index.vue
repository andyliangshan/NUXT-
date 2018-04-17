<template>
  <div class="bill" v-if="userBilldata">
    <div class="bill-top">
      <div class="backpage"><a href="javascript:history.back(-1);" class="backtoPagse"><img src="../../assets/img/back.png" alt="backWhite"/></a></div>
      <div class="myTitle">个人账单</div>
    </div>
    <div class="bill-list">
      <div class="listdata" v-for="(item, index) in userBilldata">
        <!-- <div class="date-line">2018年3月25日</div> -->
        <div class="income-bill-list">
          <div class="data">
            <div class="data-l">
              <span>{{ item.item }}</span>
              <em class="dateLine">{{ item.day }}</em>
            </div>
            <div class="data-r"><b>+</b>{{ item.sum }}<b>ZIB</b></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios';
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'bill',
  data() {
    return {
      result: [],
    };
  },
  head() {
    return {
      title: '个人账单',
    };
  },
  mounted() {
    this.GET_BILL_INFO_DATA()
  },
  computed: {
    ...mapGetters(['userBilldata'])
  },
  methods: {
    ...mapActions(['GET_BILL_INFO_DATA'])
  },
};
</script>
<style lang="stylus">
@import '../../assets/styl/myAssets.styl';
</style>



