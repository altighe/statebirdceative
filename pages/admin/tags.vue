<template lang="pug">
  .admin
    nuxt-link(:to="'/admin/'").back-link
      span ⬅️
      | back to projects list
    h1.portfolio-title tags
    .tag-list
      .tag-item(v-for="tag in tags" v-if="tags")
        |  {{ tag.type }}
        span.portfolio-delete(@click="remove(tag['.key'])")
          | ❌
    .form
      div
        .editing
          .editing-inner
            .editing-field
              .editing-label Name
              input(type="text" placeholder="Tag Name" @input="inputChange" v-model="tagItem.type")
            .buttons
              .button.save(@click="save")
                span ✅
                | Add
</template>

<script>
import { db } from '~/db'
import { mapGetters } from 'vuex'
const $tags = db.ref('tags')

export default {
  layout: 'admin',

  fetch ({ store }) {
    return store.dispatch('setTagsRef', $tags)
  },

  data () {
    return {
      tagItem: {}
    }
  },

  methods: {
    inputChange: function (e) {
      e.target.value = e.target.value.toLowerCase()
    },

    remove: function (key) {
      $tags.child(key).remove()
    },

    save: function () {
      this.tagItem.type.toLowerCase()
      this.tagItem.created_at = +(new Date) // eslint-disable-line  new-parens
      $tags.push(this.tagItem)
    }
  },

  computed: {
    ...mapGetters(['tags'])
  }
}
</script>

<style lang="scss">
$primary-color: #EBC8B2;
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

.buttons {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
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

.tag-item {
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

  .portfolio-delete {
    cursor: pointer;
    padding-left: 10px;

  }
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

.back-link {
  color: #fff;
  padding: 20px;
  padding-left: 0;
  display: block;
  span  {
    padding-right: 10px;
  }
}
</style>
