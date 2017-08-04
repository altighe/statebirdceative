import Vuex from 'vuex'
import { firebase } from '~/db'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { sortBy, filter } from 'lodash'

// const createStore = () => {
function store () {
  const vuexStore = new Vuex.Store({
    strict: true,
    state: {
      portfolio: [],
      tags: [],
      categories: [],
      images: [],
      user: !!firebase.auth().currentUser,
      menuState: false
    },

    getters: {
      portfolio: state => sortBy(state.portfolio, 'priority'),
      homepagePortfolio: state => filter(state.portfolio, (key) => key.homepage === true),
      user: state => state.user,
      tags: state => sortBy(state.tags, 'created_at'),
      categories: state => sortBy(state.categories, 'created_at'),
      images: state => state.images,
      menuState: state => state.menuState
    },

    mutations: {
      ...firebaseMutations,
      login (state, user) {
        state.user = !!user
      },

      logout (state) {
        state.user = null
      },

      toggleMenu (state, menuState) {
        state.menuState = menuState
      }
    },

    actions: {
      setPortfolioRef: firebaseAction(({
          bindFirebaseRef
        }, ref) => {
        return new Promise((resolve, reject) => {
          bindFirebaseRef('portfolio', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      setTagsRef: firebaseAction(({
          bindFirebaseRef
        }, ref) => {
        return new Promise((resolve, reject) => {
          bindFirebaseRef('tags', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      setCategoriesRef: firebaseAction(({
          bindFirebaseRef
        }, ref) => {
        return new Promise((resolve, reject) => {
          bindFirebaseRef('categories', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      setImagesRef: firebaseAction(({
          bindFirebaseRef
        }, ref) => {
        return new Promise((resolve, reject) => {
          bindFirebaseRef('images', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      login ({ commit }, user) {
        commit('login', user)
      },

      logout ({ commit }) {
        commit('logout')
      },

      toggleMenu ({ commit }, menuState) {
        commit('toggleMenu', menuState)
      }
    }
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      vuexStore.dispatch('login', { user })
    } else {
      vuexStore.dispatch('logout')
    }
  })

  return vuexStore
}

export default store
