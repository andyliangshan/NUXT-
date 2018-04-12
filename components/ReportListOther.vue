<template>
  <div>
    <div class="reportList" v-show="listPop">
      <div class="incomeInfo">
        <div class="incomeList">
          <div class="list">
            <div class="listInfo" @click="showSuccessPop">
              <a href="javascript:void(0)">删除</a>
              <a href="javascript:void(0)" class="active">举报</a>
            </div>
          </div>
          <div class="queryDetail" @click="listTopHide"><a href="javascript:void(0)">取消</a></div>
        </div>
      </div>
    </div>
    <report-success-pop v-show="successPop"></report-success-pop>
  </div>

</template>

<script>
  import ReportSuccessPop from './ReportSuccessPop.vue'
  export default {
    name: 'reportList',
    data () {
      return {
        successPop: false,
        listPop: false
      }
    },
    components: {
      ReportSuccessPop
    },
    methods: {
      listTopHide () {
        this.listPop = false
      },
      showSuccessPop () {
        this.successPop = true
      }
    }
  }
</script>

<style lang="stylus">
.reportList {
  width: 100%;
  position: fixed;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  z-index: 1000;

  .incomeInfo {
    width: 94%;
    margin: 0 auto;
    padding: 10px;
    position: fixed;
    bottom: 0;

    .incomeList {
      overflow: hidden;

      .list {
        clear: both;
        overflow: hidden;
        background: #fff;
        border-radius: 6px;

        .listInfo {
          clear: both;
          padding: 0 15px;

          a {
            display: block;
            width: 100%;
            text-align: center;
            color: #138FF2;
            font-size: 18px;
            border-bottom: 1px solid #e6e6e6;
            padding: 10px 0;

            &:last-child {
                border-bottom: none;
             }
          }

          a.active {
            color: #E14123;
          }
        }
      }

      .queryDetail {
        clear: both;
        overflow: hidden;
        margin-top: 10px;
        text-align: center;
        background: #fff;
        border-radius: 6px;

        a {
          display: block;
          width: 100%;
          color: #138FF2;
          font-size: 16px;
          font-weight: bolder;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
