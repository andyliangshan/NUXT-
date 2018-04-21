<template>
  <div class="fans">
    <div class="fansTitle row">
      <div class="backtoPage col-1"><a href="javascript:history.back(-1);" class="backtoPages"><img src="../../assets/img/back.png" alt="back"/></a></div>
      <div class="searchForm col-11">
        <form @submit.stop.prevent="submitSearchResult">
          <div class="inputKey">
            <input type="text" placeholder="请输入关键字" class="keySearch" v-model="locating"/>
          </div>
          <div class="hiddenInput"><input type="submit"/></div>
        </form>
      </div>
    </div>
    <search-list :attent-flag="attentFlag" :result-list="result" :showstate="showRcdFlag"></search-list>
  </div>
</template>
<script>
import axios from '~/plugins/axios';
import searchList from './search-list.vue';
import { toast } from '../../components/toast';

export default {
  name: '',
  head() {
    return {
      title: '搜索',
      meta: [{ hid: 'description', name: 'description', content: '搜索' }],
    };
  },
  data() {
    return {
      locating: '',
      attentFlag: false,
      showRcdFlag: false,
      errTips: '',
      result: [],
      initData: [],
      validate: {
        locatingContent: '搜索内容不能为空',
      },
      page: 1,
      limit: 10,
    };
  },
  components: {
    searchList,
  },
  async mounted() {
    const bkData = await axios.get('/api/rcd', {
      credentials: true,
    });
    if (!bkData.success) {
      this.initial = bkData.data.data;
      this.result = bkData.data.data;
    } else {
      toast('数据加载失败');
    }
  },
  methods: {
    setErrTips(msg) {
      this.errTips = msg;
      setTimeout(() => {
        this.errTips = '';
      }, 2000);
    },
    async submitSearchResult() {
      if (!this.locating) {
        this.result = this.initial;
        this.setErrTips(this.validate.locatingContent);
        return;
      }
      const bkData = await axios.get(`/api/locating?locating=${this.locating}&page=${this.page}&limit=${this.limit}`, { credentials: true });
      if (!bkData.success) {
        this.errTips = '';
        this.result = bkData.data.data;
      } else {
        this.setErrTips(bkData.msg);
      }
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
html, body {
  background: #fff;
}

body {
  width: 100%;
}

.fans {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;

  .fansTitle {
    height: 44px;
    background: #fafafa;
    line-height: 44px;
    padding-bottom: 5px;
    margin: 0;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 750px;
    z-index: 99;

    .backtoPage {
      width: 23px;
      height: 44px;
      padding: 0 0 0 15px;
      float: left;

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

    .searchForm {
      height: 44px;
      margin-left: 30px;
      padding-right: 15px;

      form {
        overflow: hidden;
      }

      .inputKey {
        height: 44px;

        input {
          width: 97%;
          border: 1px solid #e6e6e6;
          border-radius: 4px;
          height: 28px;
          line-height: 28px;
          padding-left: 5px;
          font-size: 12px;
          color: #0d0d0d;
        }
      }
    }
  }

  .InterestList {
    padding: 45px 15px 0;

    .list-r {
      .list-r-title {
        span {
          color: #FF6400;
        }
      }
    }
  }
}

.inputKey:-moz-placeholder {
  color: #0d0d0d;
}

.inputKey:-ms-input-placeholder {
  color: #0d0d0d;
}

.inputKey::-webkit-input-placeholder {
  color: #0d0d0d;
}

.hiddenInput {
  display: none;
}
</style>
