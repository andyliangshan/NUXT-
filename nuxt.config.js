const path = require('path')
const isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
  /*
  ** Router config
  */
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'start',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project22222'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
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
    publicPath: isDebug ? '/_nuxt/' : 'https://cdn.zhib.net',
    vendor: ['axios'],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        // 拓展 webpack 配置
        // config.entry['polyfill'] = ['babel-polyfill']
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.devtool = '#cheap-module-eval-source-map'
        // 添加 alias 配置
        Object.assign(config.resolve.alias, {
          'utils': path.resolve(__dirname, 'utils'),
          'assets': path.resolve(__dirname, 'assets')
        })
      }
    }
  }
}