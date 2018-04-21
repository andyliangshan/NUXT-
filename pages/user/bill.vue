<template>
  <div class="bill" v-if="userBilldata">
    <div class="bill-top">
      <div class="backpage"><a href="/user/myAssets" class="backtoPagse"><img src="../../assets/img/back.png" alt="backWhite"/></a></div>
      <div class="myTitle">个人账单</div>
    </div>
    <div class="bill-list">
      <div class="listdata" v-for="(item, index) in userBilldata" :key="index">
        <!-- <div class="date-line">2018年3月25日</div> -->
        <div class="income-bill-list">
          <div class="data">
            <div class="data-l">
              <span>{{ item.item }}</span>
              <em class="dateLine">{{ item.day }}</em>
            </div>
            <div :class="[item.sum < 0 ? 'data-r red' : 'data-r']">{{ item.sum }}<b>ZIB</b></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from '~/plugins/axios';
import { mapActions, mapGetters } from 'vuex'
import { toast } from '../../components/toast';
export default {
  name: 'bill',
  middleware: 'authenticated',
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
  async mounted() {
    const flag = await this.GET_BILL_INFO_DATA()
    if (!flag) {
      toast('网络异常，请稍后再试！');
      this.$router.push({ path: '/user/myAssets' })
    }
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



