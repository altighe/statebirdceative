<template lang="pug">
  .admin
    .portfolio(v-if="user && editingId === undefined")
      nuxt-link(:to="'/admin/tags'").nav-link
        | Tags list
      nuxt-link(:to="'/admin/categories'").nav-link
        | Categories list
      nuxt-link(:to="'/admin/images'").nav-link
        | Images list
      .portfolio-title
        span 📋
        | Projects list:
      .portfolio-list
        .portfolio-item(v-for="item in portfolio")
          div(v-if="editingId !== item['.key']" @click="edit(item['.key'])") {{ item.title }}
          .portfolio-controls
            span.portfolio-edit
              | ( Sort Index: {{ item.priority }} )
            span.portfolio-edit
              a(:href="'/work/' + item._id" target="_blank")
                | 👀
            span.portfolio-edit(v-if="editingId !== item['.key']" @click="edit(item['.key'])")
              | ✏️
            span.portfolio-delete(@click="remove(item['.key'])")
              | ❌

        .buttons(v-if="editingId === undefined")
          .button.add(@click="add")
            span 🗒
            | Add new
          .button.deploy(@click="deploy")
            span(v-if="isDeploying === false && deployFailed === false") 🚀
            span(v-if="isDeploying === true").deploying 🤙
            span(v-if="deployFailed === true") 👎
            | Deploy

    .form(v-if="editingId !== undefined", :class="{'form-centered': isAllEmpties}")
      div
        .editing
          .editing-inner
            .editing-title(v-if="!editing")
              span 🗒
              | Create Project
            .editing-title(v-if="editing")
              .editing-title__inner
                span ️️️️️✏️
                | Edit Project
              a.editing-title__open(:href="'/work/' + portfolioItem._id" target="_blank")
                | open link  👀
            input(type="hidden"  v-bind:value="lastProjectId + 1" v-model="portfolioItem._id" v-if="!editing")
            .editing-field
              .editing-label Client
              input(type="text" placeholder="Client" @input="inputChange" v-model="portfolioItem.name")
            .editing-field
              .editing-label Spot
              input(type="text" placeholder="Lato-Regular" @input="inputChange" v-model="portfolioItem.title")
            .editing-field
              .editing-label Agency
              input(type="text" placeholder="Agency" @input="inputChange" v-model="portfolioItem.agency")
            .editing-field
              .editing-label Project URL
              input(type="text" placeholder="http://path/to/your/project" @input="inputChange" v-model="portfolioItem.link")
            .editing-field
              .editing-label Cover Image URL
              input(type="text" placeholder="http://path/to/image/url" v-model="portfolioItem.image")
            .editing-field
              .editing-label Show on home page
              input(type="checkbox" v-model="portfolioItem.homepage")
            .editing-field
              .editing-label Sort index
              input(type="number" placeholder="Number" v-model="portfolioItem.priority")
            .editing-field
              .editing-label Content
              .button.image-content-btn(@click="handleContentModalClick")
                span 🏞
                | add image to content field
              textarea(@input="inputChange" v-model="portfolioItem.content")
            //- .tags
            //-   .tag(v-for="tag in Object.keys(portfolioItem.tags)")
            //-     | {{ tag }}
            multiselect(
              v-model="selectedTags",
              :multiple="true",
              :hide-selected="true",
              :options="Object.values(tags)",
              :custom-label="customLabel",
              :placeholder="'tags'",
              @tag="addTag",
              @update="updateSelected"
            )
            multiselect(
              v-model="selectedCategories",
              :multiple="true",
              :hide-selected="true",
              :options="Object.values(categories)",
              :custom-label="customLabel",
              :placeholder="'categories'",
              @tag="addTag",
              @update="updateSelected"
            )
            .buttons
              .button.save(@click="save")
                span ✅
                | Save
              .button.cancel(@click="cancel")
                span ❌
                | Cancel

      transition(name="fade")
        .mark(v-if="!isAllEmpties")
          .mark__title(v-if="portfolioItem.title !== ''")
            | {{ portfolioItem.title }}
          .mark__subtitle(v-if="portfolioItem.subtitle !== ''")
            | {{ portfolioItem.name }}
          .mark__subtitle(v-if="portfolioItem.image !== ''")
            img(:src="portfolioItem.image", alt="")
          vue-markdown(:source="portfolioItem.content")

    .login(v-if="!user")
      .login-inner
        .login-title Welcome to StateBird Admin
        input(type='text' placeholder="Email" v-model="email")
        input(type='password' placeholder="Password"  v-model="password")
        .button(@click="login")
          | Log in
    transition(name='modal' v-if="showModal" @close="showModal = false")
      .modal-mask
        .modal-wrapper
          .modal-container
            .images(@click="showModal = false")
              admin-image-card( v-for="(image, index) in images"
                                v-bind:key="index"
                                v-bind:image="image"
                                v-on:on-remove-click="remove"
                                v-on:on-card-click="addImageToContent")
            image-uploader
            .button.modal-default-button(@click="showModal = false")
              | Close

</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import { db, firebase } from '~/db'
import { mapGetters } from 'vuex'
import VueMarkdown from 'vue-markdown'
import Multiselect from 'vue-multiselect'

const $portfolio = db.ref('portfolio')
const $tags = db.ref('tags')
const $categories = db.ref('categories')
const $images = db.ref('images')
// components
import AdminImageCard from '~components/AdminImageCard'
import ImageUploader from '~components/ImageUploader'

const emptyItem = {
  _id: '',
  title: '',
  link: '',
  image: '',
  content: '',
  priority: '',
  homepage: false,
  tags: []
}

export default {
  name: 'Admin',
  layout: 'admin',
  head: {
    title: 'StateBird | Admin'
  },

  components: {
    Multiselect,
    VueMarkdown,
    AdminImageCard,
    ImageUploader
  },

  fetch ({ store }) {
    store.dispatch('setTagsRef', $tags)
    store.dispatch('setCategoriesRef', $categories)
    store.dispatch('setPortfolioRef', $portfolio)
    store.dispatch('setImagesRef', $images)
  },

  data () {
    return {
      selectedTags: [],
      selectedCategories: [],
      newItemText: '',
      editingId: undefined,
      portfolioItem: emptyItem,
      email: '',
      password: '',
      editing: false,
      hasFilledField: false,
      isDeploying: false,
      deployFailed: false,
      showModal: false,
      initialSortIndex: ''
    }
  },

  computed: {
    ...mapGetters(['portfolio', 'user', 'tags', 'images', 'categories']),

    isAllEmpties () {
      return Object.keys(this.portfolioItem)
        .every(key => this.portfolioItem[key] === '')
    },

    lastProjectId () {
      return this.portfolio.slice(-1)[0] ? this.portfolio.slice(-1)[0]._id : 0
    }
  },

  methods: {
    inputChange: function (event) {
      this.hasFilledField = event.target.value !== ''
    },

    customLabel ({ type }) {
      return `${type}`
    },

    updateSelected: function (newSelected) {
      this.selected = newSelected
    },

    addTag: function (newTag) {
      this.options.push(newTag)
      this.selected.push(newTag)
    },

    edit: function (key) {
      this.editing = true
      this.editingId = key

      $portfolio.child(key).once('value')
        .then(d => {
          this.portfolioItem = d.val()
          this.initialSortIndex = this.portfolioItem.priority
        })
    },

    save: function () {
      if (this.editingId !== 'defined') {
        let res = this.formatSelectedFields(this.selectedTags)
        let cats = this.formatSelectedFields(this.selectedCategories)

        this.portfolioItem.tags = res
        this.portfolioItem.categories = cats
        $portfolio.child(this.editingId).set(this.portfolioItem)
      } else {
        let res = this.formatSelectedFields(this.selectedTags)
        let cats = this.formatSelectedFields(this.selectedCategories)

        this.portfolioItem.tags = res
        this.portfolioItem.categories = cats
        this.portfolioItem._id = this.lastProjectId + 1
        $portfolio.push(this.portfolioItem)
      }

      this.updateSortIndex(this.portfolio, this.portfolioItem)
        .then((e) => {
          this.editing = false
          this.editingId = undefined
          this.portfolioItem = emptyItem
        })
    },

    formatSelectedFields: function (data) {
      let formatedData = data.reduce(function (obj, item) {
        obj[item.type] = true
        return obj
      }, {})

      return formatedData
    },

    updateSortIndex: function (portfolioArray) {
      let prevSortIndex = 1
      const portfolioCopy = portfolioArray.slice(0)

      portfolioCopy.map((portfolioItem) => {
        let item = Object.assign({}, portfolioItem)

        item.priority = prevSortIndex
        prevSortIndex += 1

        let key = item['.key']
        delete item['.key']

        $portfolio.child(key).set(item)
      })

      return new Promise((resolve, reject) => resolve())
    },

    cancel: function () {
      this.editing = false
      this.editingId = undefined
      this.portfolioItem = emptyItem
    },

    add: function () {
      this.editingId = 'defined'
      this.portfolioItem = emptyItem
    },

    remove: function (key) {
      $portfolio.child(key).remove()
    },

    deploy: function () {
      this.deployFailed = false
      this.isDeploying = true

      fetch('https://api.netlify.com/build_hooks/5942ceca8ebdd929d962e243', {
        method: 'POST'
      })
        .then(setTimeout(() => {
          this.isDeploying = false
        }, 10000))
        .catch(() => {
          this.isDeploying = false
          this.deployFailed = true

          setTimeout(() => {
            this.deployFailed = false
          }, 1000)
        })
    },

    login: function () {
      const { email, password } = this
      firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        // TODO: Handle Errors
        // const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      })
    },

    addImageToContent: function (params) {
      this.portfolioItem.content = `${this.portfolioItem.content}<img src='${params.url}' />`
    },

    handleContentModalClick: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.showModal = !this.showModal
    }
  },

  created () {
    if (process.BROWSER_BUILD) {
      setTimeout(() => {
        this.$store.dispatch('setPortfolioRef', $portfolio)
      }, 10)
    } else {
      this.$store.dispatch('setPortfolioRef', $portfolio)
    }
  }

}
</script>

<style scoped lang="scss">
$primary-color: #EBC8B2;
  * {
    box-sizing: border-box;
  }

  .multiselect {
    margin-bottom: 10px;
  }

  .login {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .login-inner {
    width: 100%;
    max-width: 600px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .login-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  .admin {
    padding: 0 50px;
    min-height: 100vh;
    background: $primary-color;
    width: 100%;

    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
  }

  .portfolio {
    padding: 50px 0;
  }

  .portfolio-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .portfolio-item {
    margin-bottom: 20px;
    font-size: 26px;
    color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    a {
      color: #FFFFFF;
      text-decoration: none;
    }
  }

  .portfolio-controls {
    margin-left: 20px;

    span {
      cursor: pointer;
      font-size: 20px;
    }

    .portfolio-edit {
      margin-right: 10px;
    }
  }

  .form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;

    &-centered .editing {
      transform: translateX(102%);
    }
  }

  .editing {
    position: fixed;
    left: 50px;
    top: 0px;

    height: 100vh;
    width: 30%;
    display: flex;
    flex-flow: column nowrap;

    transition: transform .9s ease;
    will-change: transform;

    .save {
      margin-right: 15px;
    }

    .save, .cancel {
      cursor: pointer;
    }
  }

  .editing-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .editing-title__inner {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .editing-title__open {
    font-size: 14px;
    color: #FFFFFF;
    font-weight: normal;
    text-decoration: none;
  }

  .editing-inner {
    padding: 50px 0;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;

    padding-right: 28px; /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .editing-label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
  }

  .buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 25px;
  }

  .button {
    padding: 10px 16px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    cursor: pointer;

    transition: background .2s ease, color .2s ease;
    will-change: background, color;

    &:hover {
      background: #FFF;
      color: #000;
    }

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .add {
    margin-right: 15px;
    cursor: pointer;
  }

  .deploy {
    cursor: pointer;
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 20px;
    background: none;
    outline: none;

    padding: 10px 16px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    color: #FFFFFF;

    transition: background .2s ease, color .2s ease;
    will-change: background, color;

    &:hover,
    &:focus {
      background: #FFF;
      color: #000;

      &::-webkit-input-placeholder {color: #A3A3A3;}
      &::-moz-placeholder {color: #A3A3A3;}
      &:-moz-placeholder {color: #A3A3A3;}
      &:-ms-input-placeholder {color: #A3A3A3;}
    }

    &::-webkit-input-placeholder {color: #FFFFFF;}
    &::-moz-placeholder {color: #FFFFFF;}
    &:-moz-placeholder {color: #FFFFFF;}
    &:-ms-input-placeholder {color: #FFFFFF;}
  }

  textarea {
    min-height: 200px;
    resize: vertical;
    overflow-y: scroll
  }

  .textarea-small {
    min-height: 150px;
  }

  @keyframes deploy {
    0%, 100% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(10deg);
    }
  }

  .deploying {
    animation: deploy .3s ease infinite;
  }

  @media (max-width: 768px) {
    .admin {
      padding: 0 30px 50px;
    }

    .form {
      display: block;
    }

    .form-centered .editing {
      transform: translateX(0);
      left: 0;
    }

    .editing {
      position: initial;
      height: initial;
      width: 100%;
    }

    .editing-inner {
      width: 100%;
      padding: 50px 0;
    }

    .mark {
      width: 100%;
      margin: 0;
    }
  }
</style>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter-active {
    transition-delay: .35s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .mark {
    margin: 50px 0;
    background: #FFFFFF;
    margin-left: 40%;
    flex: 1;
    padding: 16px;
    border: 1px solid #f1f1f1;

   .video-wrapper {
      max-width: 100%;
      margin-bottom: 50px;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 30px;
      height: 0;
      overflow: hidden;
    }

    .video-container iframe,
    .video-container object,
    .video-container embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    p {
      font-size: 12px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 0;
      line-height: 18px;

      margin: 0 auto;
      margin-bottom: 50px;
      max-width: 600px;
    }

    img {
      width: 100%;
      margin-bottom: 50px;
    }

    h1, h2, h3, h4, h5 {
      font-weight: bold;
      font-size: 18px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 2.2px;

      margin: 0 auto;
      margin-bottom: 11px;
      max-width: 600px;
    }
  }

  .mark__title {
    margin-top: 5px;

    text-align: center;
    font-size: 26px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark__subtitle {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0,0.40);
    letter-spacing: 0;
    line-height: 18px;

    margin-bottom: 50px;
  }

  .mark-info {
    margin: 0 auto;
    margin-top: 50px;
    max-width: 600px;
  }

  .mark-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .mark-item__label {
    margin-bottom: 11px;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark-item__value {
    font-size: 12px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 0;
    line-height: 18px;
    text-decoration: none;

    .mark-item__value--bold {
      margin-right: 4px;
      font-weight: bold;
    }
  }

  .mark-item {
    flex: 0 0 50%;
    margin-bottom: 50px;
  }

  .project-phones {
    max-width: 760px;
    margin: 0 auto;
    margin-bottom: 100px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .project-phones__item {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
  }

  .project-phones__text {
    padding-right: 65px;
    padding-left: 65px;
    margin-top: 80px;
    margin-bottom: 80px;

    font-size: 34px;
    color: rgba(0,0,0,0.70);
  }

  .project-phone {
    width: 288px;
    height: 577.6px;
    overflow: hidden;

    position: relative;
  }

  .project-phone__image {
    width: 282px;
    height: 463px;
    overflow: hidden;
    overflow-y: scroll;

    position: absolute;
    top: 53px;
    left: 19px;

    padding-right: 28px; /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .project-phone__image img {
    display: block;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .project-phones {
      display: none;
    }
  }

  .nav-link {
    color: #fff;
    padding: 20px;
    padding-left: 0;
    display: block;
    span  {
      padding-right: 10px;
    }
  }

  .image-content-btn {
    margin: 10px 0;
    span {
      padding-right: 7px;
    }
  }

  // modal
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #EBC8B2;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;

    .images {
      display: flex;
      flex-wrap: wrap;
      max-height: 600px;
      overflow: scroll;
    }

    .button {
      display: block;
      flex: 1 1 100%;
      text-align: center;
      margin: 10px 40%;
    }

    form {
      display: flex;
      flex-direction: column;
      label {
        color: #fff;
        text-transform: capitalize;
        padding: 10px 0;
      }
    }
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
