import Vue from 'vue'

if (process.BROWSER_BUILD) {
  const googleMaps = require('vue2-google-maps')
  Vue.use(googleMaps, {
    load: {
      key: 'AIzaSyCMVgSaVgaPm_h7FdwwMZBd-mnXQuUKte0'
    }
  })
}
