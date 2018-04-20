<template>
  <div>
    <!-- <share :config="config"></share> -->
  </div>
</template>
<script>
// import Vue from 'vue';
// import Share from 'vue-social-share';
// Vue.use(Share);

export default {
  name: 'attentPop',
  data() {
    return {
      msg: '',
    };
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {},
};
</script>
<style lang="stylus">
</style>
