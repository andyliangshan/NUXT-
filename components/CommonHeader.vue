<template>
  <div :class="['common-header', customClass]">
      <div v-if="!hideBack">
          <button class="btn-back" @click="goBack"></button>
      </div>
      <div class="title">
          <h1>{{title}}</h1>
      </div>
      <div>
          <button @click="toolpress" class="btn-tool">{{buttonLabel}}</button>
      </div>
  </div>
</template>

<script>
export default {
  props: ['hideBack', 'title', 'buttonLabel', 'customClass'],
  methods: {
    goBack: function() {
      history.go(-1);
      this.$emit('back');
    },
    toolpress: function() {
      this.$emit('tool');
    },
  },
};
</script>

<style lang="stylus">
.common-header {
    display: flex;
    background-color: #fafafa;
    border-bottom: 1px solid #eee;

    .title {
        flex: auto;

        h1 {
            font-size: 1.1rem;
            text-align: center;
            margin: 0;
            padding: 0;
            line-height: 45px;
            font-font-weight: normal;
        }
    }

    button {
        outline: none;
        display: block;
        border: none;
        padding: 0;
        width: 45px;
        height: 45px;
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: center;
    }

    button:active {
        background-color: rgba(0, 0, 0, 0.2);
        
    }

    .btn-back {
        background-image: url("data:image/svg+xml, %3Csvg width='23px' height='40px' viewBox='0 0 23 40' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='arrow' transform='translate%28-31.000000, -64.000000%29' fill='%23202020'%3E%3Cg id='Group-4' transform='translate%2848.000000, 84.000000%29 scale%28-1, 1%29 translate%28-48.000000, -84.000000%29 translate%2824.000000, 60.000000%29'%3E%3Cpath d='M40.1594703,24.0489372 C40.110391,24.4866216 39.9167887,24.9116384 39.5801105,25.2483166 L22.2275014,42.6009258 C21.4340721,43.394355 20.1744469,43.3876503 19.3933983,42.6066017 C18.6069044,41.8201078 18.6148909,40.556682 19.3990742,39.7724986 L35.3578644,23.8137085 L19.7806054,8.23644948 C19.0029761,7.45882021 19.0003027,6.20070747 19.7867966,5.41421356 C20.5678451,4.63316498 21.8373338,4.63632364 22.6090325,5.40802235 L39.5919776,22.3909675 C40.0444736,22.8434635 40.2345712,23.45865 40.1594703,24.0489372 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-size: 18px 18px;
    }

    .btn-tool {
        background-image: url("data:image/svg+xml,%0A%3Csvg width='36px' height='8px' viewBox='0 0 36 8' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 49.1 %2851147%29 - http://www.bohemiancoding.com/sketch --%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='正文页' transform='translate%28-684.000000, -80.000000%29' fill='%230D0D0D'%3E%3Cg id='Group-Copy' transform='translate%28678.000000, 60.000000%29'%3E%3Cpath d='M10,28 C7.790861,28 6,26.209139 6,24 C6,21.790861 7.790861,20 10,20 C12.209139,20 14,21.790861 14,24 C14,26.209139 12.209139,28 10,28 Z M24,28 C21.790861,28 20,26.209139 20,24 C20,21.790861 21.790861,20 24,20 C26.209139,20 28,21.790861 28,24 C28,26.209139 26.209139,28 24,28 Z M38,28 C35.790861,28 34,26.209139 34,24 C34,21.790861 35.790861,20 38,20 C40.209139,20 42,21.790861 42,24 C42,26.209139 40.209139,28 38,28 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-size: 18px 18px;
    }
}
</style>
