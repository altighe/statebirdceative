var getPortfolioRoutes = require('./db.js').getPortfolioRoutes

module.exports = {
  /*
  ** Headers of the page
  */
  transition: 'page',
  head: {
    title: 'StateBird | Loading',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'assets/main.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#EBC8B2' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  generate: {
    routes: getPortfolioRoutes
  }
}
