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
          <li v-for="(item, index) in categoryData" :key="index">
            <a href="javascript:void(0)" :class="''" @click="getCategoryListData(item)">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <keep-alive>
      <data-list :pushDataList="categoryListData"></data-list>
    </keep-alive>
    <common-footer></common-footer>
    <h2>{{ categoryData }}</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DataList from '../../components/DataList.vue';
import commonFooter from '../HomeFooter.vue';

export default {
  name: 'findView',
  data() {
    return {
      showSharePop: false,
      page: 1,
      limit: 10,
      currentCategoryVal: '',
      newCategoryData: [],
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
    this.CATEGORY_ALL_DATA({ page: 1, limit: 10 });
    this.GET_CATEGORY_ALL_DATA({ page: 1, limit: 10, categoryId: '' });
    this.newCategoryDataConcat();
    console.log(this.newCategoryData, this.$store.state.categoryData, '------')
  },
  computed: {
    ...mapGetters(['categoryData', 'categoryListData']),
  },
  methods: {
    ...mapActions(['CATEGORY_ALL_DATA', 'GET_CATEGORY_ALL_DATA']),
    async getCategoryListData(item) {
      let categoryId;
      if (item.name !== '全部 ') {
        categoryId = item.id;
      } else {
        categoryId = '';
      }
      this.GET_CATEGORY_ALL_DATA({ page: 1, limit: 10, categoryId: categoryId });
    },
    newCategoryDataConcat() {
      for (let i = 0; i < this.categoryData.length; i++) {
        const base = this.newCategoryData.push(this.categoryData[i].name);
        this.newCategoryData = ['全部'].concat(this.base);
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../../assets/styl/home.styl';

.findView {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  background: #fff;
  margin-top: 91px;
}

.findList {
  width: 100%;
  padding: 10px 0;
  background: #f2f2f2;

  .list {
    width: 100%;
    height: 30px;
    overflow-x: auto;
    padding: 0;

    ul {
      width: 750px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      height: 30px;

      li {
        margin-left: 10px;
        text-align: center;
        list-style: none;
        float: left;

        a {
          display: block;
          padding: 0 5px;
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

@media screen and (min-width: 768px) {
  .findView {
    padding-bottom: 100px;
  }
}

@media screen and (max-width: 767px) {
  .findView {
    padding-bottom: 0;
  }
}
</style>
