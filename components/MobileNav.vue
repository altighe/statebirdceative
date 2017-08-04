<template lang="pug">
.mobile-nav(v-bind:class="{ show: menuState}")
  .mobile-nav-wrapper(@click="handleNavClick")
    main-nav.white
  nuxt-link(:to="'/about'" )
    span(@click="handleNavClick") about
  nuxt-link(:to="'/work'" )
    span(@click="handleNavClick") work
  nuxt-link(:to="'/contact'" )
    span(@click="handleNavClick") contact
</template>
<script>
import MainNav from '~components/MainNav'

export default {
  data () {
    return {
    }
  },

  components: {
    MainNav
  },

  methods: {
    handleNavClick: function () {
      this.$store.dispatch('toggleMenu', false)
    }
  },

  computed: {
    menuState () {
      return this.$store.getters.menuState
    }
  }
}
</script>
<style lang="scss">
$bg-color: rgba(235, 200, 178, .7);

.mobile-nav {
  display: none;
  background-color: $bg-color;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 60px;

  &.show {
    display: flex;
  }

  > a {
    font-family: "PlayfairDisplay-Black";
    color: #FFF;
    font-size: 50px;
    text-decoration: none;
    text-transform: capitalize;
    display: block;
    padding: 30px 0 0;
    position: relative;
    z-index: 100;
  }

  .burger-nav {
    top: -30px;
  }
}
</style>
