<template>
  <div class="findView">
    <div class="findList">
      <div class="list">
        <ul>
          <li>
            <a href="javascript:void(0)" :class="''" @click="getCategoryListData('')">
              全部
            </a>
          </li>
          <li v-for="(item, index) in result" :key="index">
            <a href="javascript:void(0)" :class="''" @click="getCategoryListData(item)">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <keep-alive>
      <data-list :pushDataList="categorylist"></data-list>
    </keep-alive>
    <common-footer></common-footer>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import DataList from '../../components/DataList.vue';
import commonFooter from '../HomeFooter.vue';

export default {
  name: 'findView',
  data() {
    return {
      showSharePop: false,
      result: [],
      page: 1,
      limit: 10,
      currentCategoryVal: '',
      initData: [],
      categorylist: [],
    };
  },
  head() {
    return {
      title: '发现',
    };
  },
  components: {
    DataList,
    commonFooter,
  },
  mounted() {
    this.findTabUserData();
    this.getCategoryListData('');
  },
  methods: {
    async getCategoryListData(item) {
      let categoryId;
      if (item.name !== '全部 ') {
        categoryId = item.id;
      } else {
        categoryId = '';
      }
      const postData = {
        page: this.page,
        limit: this.limit,
        categoryId: categoryId,
      };
      const bkData = await axios.post('/api/falls', postData, {
        credentials: true,
      });
      if (!bkData.success) {
        this.categorylist = bkData.data.data;
      } else {
        alert('获取分类数据列表失败');
      }
    },
    async findTabUserData() {
      try {
        if (!this.initData) {
          this.result = this.initData;
          return;
        }
        const bkData = await axios.get(`/api/categoryList?page=${this.page}&limit=${this.limit}`, {
          credentials: true,
        });
        if (!bkData.success) {
          this.result = bkData.data.data;
          this.initData = bkData.data.data;
          this.currentCategoryVal = bkData.data.currentCategoryVal;
        } else {
          alert('数据加载失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/home.styl';

.findView {
  width 100%
  max-width 750px
  margin 0 auto
  background #fff
  margin-top 91px
}

.findList {
  width: 100%;
  padding: 10px 0;
  background: #f2f2f2;

  .list {
    width: 100%;
    height 30px
    overflow-x: auto;
    padding 0

    ul {
      width: 750px;
      margin: 0;
      padding: 0;
      overflow hidden
      height 30px

      li {
        margin-left: 10px;
        text-align: center;
        list-style: none;
        float left

        a {
          display: block;
          padding 0 5px
          height: 30px;
          line-height: 30px;
          background: #939393;
          color: #fff;
          border-radius: 4px;
        }

        a.active {
          background: #138FF2;
        }
      }
    }
  }
}

@media screen and (min-width:768px) {
  .findView {
    padding-bottom 100px
  }
}

@media screen and (max-width:767px) {
  .findView {
    padding-bottom 0
  }
}
</style>
