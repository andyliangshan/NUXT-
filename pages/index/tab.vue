<template>
  <div class="findList">
    <div class="list">
      <ul>
        <li v-for="(item, index) in result" :key="index">
          <a href="javascript:void(0)" :class="''" @click="getCategoryListData(item)">
            {{ index === 0 ? '全部' : item.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'

  export default {
    name: 'findList',
    data () {
      return {
        result: [],
        page: 1,
        limit: 10,
        initData: [],
        currentCategoryVal: ''
      }
    },
    mounted () {
      this.findTabUserData()
    },
    methods: {
      getQueryString (name) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        const r = window.location.search.substr(1).match(reg)
        if (r != null) return (r[2]); return null
      },
      async getCategoryListData (item) {
        window.location.search = '?category=' + item.name
        let categoryId
        const category = window.location.search ? window.location.search.split('?')[1] : ''
        if (category !== '' && category.indexOf('category') !== -1) {
          const sname = this.getQueryString('category')
          if (sname != null) {
            categoryId = decodeURIComponent(sname)
            console.log(category)
          }
        } else {
          categoryId = 0
        }
        const postData = {
          page: this.page,
          limit: this.limit,
          categoryId: categoryId
        }
        const bkData = await axios.post('/api/falls', postData, {
          credentials: true
        })
        console.log(bkData, '......')
        if (!bkData.success) {
          this.result = bkData.data.data
        } else {
          alert('获取分类数据列表失败')
        }
      },
      async findTabUserData () {
        if (!this.initData) {
          this.result = this.initData
          return
        }
        const bkData = await axios.get(`/api/categoryList?page=${this.page}&limit=${this.limit}`, {
          credentials: true
        })
        if (!bkData.success) {
          this.result = bkData.data.data
          this.initData = bkData.data.data
          this.currentCategoryVal = bkData.data.currentCategoryVal
        } else {
          alert('数据加载失败')
        }
      }
    }
  }
</script>
<style lang="stylus">
  .findList {
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 10px 0;
    background: #f2f2f2;

    .list {
      width: 100%;

      ul {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin: 0;
        padding: 0;

        li {
          margin-left: 10px;
          width: 60px;
          text-align: center;
          list-style: none;

          a {
            display: block;
            width: 60px;
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
</style>
