<template>
  <section class="container">
    <nv-header></nv-header>
    <nuxt-child/>
    <nv-footer></nv-footer>
  </section>
</template>

<script>
import nvHeader from './Header.vue'
import nvFooter from './HomeFooter.vue'

export default {
  asyncData: ({ req }) => ({
    userAgent: (req ? req.headers['user-agent'] : (typeof navigator !== 'undefined' ? navigator.userAgent : 'No user agent (generated)'))
  }),
  head () {
    return {
      title: '首页'
    }
  },
  components: {
    nvHeader,
    nvFooter
  }
}
</script>

<style scoped>
  .container {
    padding: 0;
    text-align: left;
  }
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
