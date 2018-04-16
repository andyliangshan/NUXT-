<template>
  <section class="container">
    <nv-header></nv-header>
    <nuxt-child/>
  </section>
</template>

<script>
import nvHeader from './Header.vue';

export default {
  head() {
    return {
      title: '首页',
    };
  },
  components: {
    nvHeader,
  },
};
</script>

<style scoped>
.container {
  padding: 0;
  text-align: left;
}
.title {
  margin: 30px 0;
}
.users {
  list-style: none;
  margin: 0;
  padding: 0;
}
.user {
  margin: 10px 0;
}
</style>
