const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'start',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project22222' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  // Global env
  env: {
    __ENV: process.env.__ENV
  },
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        // 拓展 webpack 配置
        // config.entry['polyfill'] = ['babel-polyfill']
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.devtool = 'eval-source-map'
        // 添加 alias 配置
        Object.assign(config.resolve.alias, {
          'utils': path.resolve(__dirname, 'utils'),
          'assets': path.resolve(__dirname, 'assets')
        })
      }
    }
  }
}

