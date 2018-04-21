<template>
  <div class="moreReplay">
    <div class="detailTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.go(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="title col-10">123条回复</div>
      <div class="report" @click="showReportList=!showReportList">···</div>
    </div>
    <div class="tabCon">
      <replay-list></replay-list>
    </div>
    <div class="bottombar">
      <div class="bottombat-height"></div>
      <div class="comment">
        <form @submit.stop.prevent="commentCont">
          <input type="text" placeholder="回复评论…" v-model="comment" contenteditable="true" class="commentText" />
        </form>
      </div>
    </div>
    <report-list v-show="showReportList"></report-list>
  </div>
</template>
<script>
  import ReplayList from '../../components/ReplayList.vue'
  import ReportList from '../../components/ReportList.vue'
  import { toast } from '../../components/toast';

  export default {
    name: 'moreReplay',
    data () {
      return {
        showReportList: false,
        flagShare: false,
        comment: ''
      }
    },
    head() {
      return {
        title: '回复列表'
      }
    },
    components: {
      ReplayList,
      ReportList
    },
    mounted () {
    },
    methods: {}
  }
</script>
<style lang="stylus">
.moreReplay {
  width: 100%;
  margin:0 auto;
  max-width: 750px;

  .detailTitle {
    margin: 0;
    padding: 10px 15px;
    background: #fafafa;
    display: flex;

    .backtoPage {
      width: 12px;
      height: 20px;
      margin-top: 2px;
      padding: 0;

      a {
        display: block;
        width: 100%;
        height: 100%;

        img {
          width: 12px;
          height: 20px;
          vertical-align: middle;
        }
      }
    }

    .title {
      padding: 0;
      text-align: center;
      font-size 18px
      color: #000;
      font-weight: bolder;
      flex 1
    }

    .report {
      line-height 25px;
      color: #0d0d0d;
      font-weight: bolder;
      font-size: 22px;
      letter-spacing: -5px;
    }
  }
}

.bottombar {
  position: fixed;
  bottom: 0;
  height: 54px;
  width: 100%;
  background: #fafafa;

  .bottombat-height {
    height: 54px;
  }

  .comment {
    width: 94%;
    margin: 13px 10px 0;
    position: absolute;
    top: 0;
    height: 40px;

    form {
      overflow: hidden;

      .commentText {
        width: 100%;
        padding: 5px;
        color: #0d0d0d;
        font-size: 14px;
        background: #fff;
        border-radius: 3px;
        box-sizing: border-box;
        border: none;
        height: 30px;
        resize: none;

        &:focus {
         outline: none;
        }
      }
    }
  }
}

.tabCon {
  clear: both;
  overflow: hidden;
  padding-bottom: 60px;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #939393;
  opacity 0.5
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #939393;
  opacity 0.5
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #939393;
  opacity 0.5
}
</style>
