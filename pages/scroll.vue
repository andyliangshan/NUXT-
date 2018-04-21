<template>
    <div ref="wrapper" class="list-wrapper">
        <ul class="list-content">
            <li @click="clickItem($event,item)" class="list-item" v-for="(item, index) in data" :key="index">{{item.aa}}</li>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
const options = {
  scrollY: true, // 因为scrollY默认为true，其实可以省略
  scrollbar: {
    fade: false
  },
  pullDownRefresh: {
    threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
    stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
  },
  pullUpLoad: {
    threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
  }
};
export default {
  name: 'list-wrapper',
  data() {
    return {
      data: [
        { aa: '1' },
        { aa: '2' },
        { aa: '3' },
        { aa: '4' },
        { aa: '5' },
        { aa: '6' },
        { aa: '7' },
        { aa: '1' },
        { aa: '2' },
        { aa: '3' },
        { aa: '4' },
        { aa: '5' },
        { aa: '6' },
        { aa: '7' },
        { aa: '1' },
        { aa: '2' },
        { aa: '3' },
        { aa: '4' },
        { aa: '5' },
        { aa: '6' },
        { aa: '7' },
        { aa: '1' },
        { aa: '2' },
        { aa: '3' },
        { aa: '4' },
        { aa: '5' },
        { aa: '6' },
        { aa: '7' },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, options);
    }, 20);
  },
};
</script>
<style lang="stylus">
.list-wrapper {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 16px;
    color: #202020;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>


