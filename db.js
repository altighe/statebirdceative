var firebase = require('firebase')
var _ = require('lodash')

var firebaseConfig = {
  apiKey: 'AIzaSyCBMOJvQsRqB58Ma3r4iTysC4mglOgNPFg',
  authDomain: 'statebird-eee91.firebaseapp.com',
  databaseURL: 'https://statebird-eee91.firebaseio.com',
  projectId: 'statebird-eee91',
  storageBucket: 'statebird-eee91.appspot.com',
  messagingSenderId: '179131700744'
}

var firebaseApp = firebase.apps.length === 0
  ? firebase.initializeApp(firebaseConfig) : firebase.apps[0]

var db = firebaseApp.database()

var getPortfolioRoutes = function () {
  return firebase.database()
    .ref('portfolio')
    .once('value')
    .then(i => i.val())
    .then(_.values)
    .then(items => _.sortBy(items, 'priority'))
    .then(items => items.map((item, index) => {
      return '/work/' + item.link
    }))
}

module.exports = {
  db: db,
  firebase: firebase,
  getPortfolioRoutes: getPortfolioRoutes
}
