<template>
    <div class="notFound">
        <div class="notFound-main">
            <img src="/public/404.png">
            <p>抱歉，没有找到你请求的页面</p>
            <p>Sorry,don't find the page you request</p>

            <router-link to="/" tag="a">回到主页</router-link>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .notFound
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        max-width 750px
        background-color #074f66
    .notFound-main
        padding 160px 0
        img 
            display block
            margin 0 auto 24px

        p 
            line-height 26px
            font-size size3 
            color #fff
            text-align center

        a 
            display block
            margin 24px auto 
            width 120px
            height 32px 
            line-height 30px
            border 1px solid #1db1d0
            text-align center 
            font-size size3 
            border-radius 5px
            box-sizing border-box
            color #1db1d0
</style>
