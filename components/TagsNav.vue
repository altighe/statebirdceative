<template lang="pug">
  nav.tags-nav
    li(v-for="tag in tags")
      a(href="" v-bind:type="tag.type" @click="handleNavClick($event)").tag-nav-link
        span.close(v-if='')
          | x
        | {{tag.type}}
</template>
<script>
export default {
  props: {
    'tags': {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      open: false
    }
  },

  methods: {
    handleDropNav (e) {
      e.preventDefault()
      this.open = !this.open
    },
    handleNavClick (e) {
      e.preventDefault()
      Array.prototype.map.call(document.getElementsByClassName('tag-nav-link'), (item) => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
      this.open = false
      this.$emit('on-nav-click', e)
    }
  },

  computed: {
    showedTags () {
      return this.tags.slice(0, 4)
    },

    dropdownTags () {
      let tags = this.tags.slice(4)
      return tags
    }
  }
}
</script>
<style lang="scss" scoped>
$font-color-main: rgba(0,0,0,0.87);
$link-box-shadow: 0px 6px 0px 0px rgba(235,200,178,1);

.tags-nav {
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  z-index: 1;

  > li > a {
    display: block;
    text-decoration: none;
    font-family: "Lato-Regular";
    font-size: 16px;
    color: $font-color-main;
    letter-spacing: 1.5px;
    padding: 5px 10px;
    margin: 0 17px;
    transition: all 0.2s ease;
    text-transform: uppercase;

    .close {
      display: none;
      text-transform: lowercase;
      padding-right: 8px;
      top: -1px;
      position: relative;
    }

    &.active .close {
      display: inline;
    }

    &.active,
    &:hover {
      background-color: #5F5F5F;
      border-radius: 3px;
      color: #fff;
    }
  }

  .dd-nav-item {
    position: relative;
    >a {
      &:before {
        content: '';
        width: 12px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background-image: url(~assets/images/dd-arrow.svg);
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: 50%;
        transition: all 0.3s ease;
        transform: rotate(180deg);
      }
      &.active {
        &:before {
          background-position-y: 50%;
          transform: rotate(0deg);
        }
      }
    }
  }

  .dd-menu {
    display: none;
    list-style: none;
    padding: 0;
    position: absolute;
    background-color: #fff;
    z-index: 20;

    &.active {
      display: block;
    }

    a {
      display: block;
      text-decoration: none;
      font-family: "PlayfairDisplay-Regular";
      font-size: 16px;
      color: $font-color-main;
      letter-spacing: 1.5px;
      padding: 10px 3px;
      margin: 0 17px;
      transition: all 0.2s ease;
      text-transform: capitalize;
      &:hover {
        box-shadow: none;
        text-decoration: underline;
      }
    }
  }
}
</style>

