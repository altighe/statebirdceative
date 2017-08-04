<template lang="pug">
section.home-page.page
  .header-nav-wrapper
    main-nav
  header(ref='headerBlock')
    .logo-wrapper
      logo(ref='headerLogo').logo-light
  .content-wrapper(:style="'height:' + homeContentHeight + 'px'" )
    .content(ref='homeContent')
      main-nav.white
      home-grid(
        v-bind:class="{ unscrollable: photosStateUnscrollable, scrollable: photosStateTop }"
        v-bind:portfolio="sortedPortfolio"
        ref='photosGrid'
      )
</template>
<script>
import { db } from '~/db'
import { mapGetters } from 'vuex'
const $portfolio = db.ref('portfolio')
import { sortBy } from 'lodash'
// components
import HomeGrid from '~components/HomeGrid'
import Logo from '~components/Logo'
import MainNav from '~components/MainNav'

export default {
  name: 'Home',
  head: {
    title: 'StateBird | Home'
  },

  fetch ({ store }) {
    return store.dispatch('setPortfolioRef', $portfolio)
  },

  components: {
    HomeGrid,
    Logo,
    MainNav
  },

  data () {
    return {
      logoStateFixed: false,
      photosStateUnscrollable: false,
      photosStateTop: false,
      homeContentHeight: 1000
    }
  },

  methods: {
    handleScroll () {
      let headerLogoOffsetHeight = this.$refs.headerLogo ? this.$refs.headerLogo.$el.offsetHeight : 0
      this.logoStateFixed = window.scrollY > headerLogoOffsetHeight
    }
  },

  computed: {
    ...mapGetters(['portfolio', 'homepagePortfolio']),
    sortedPortfolio () {
      return sortBy(this.homepagePortfolio, 'priority')
    }
  },

  created () {
    typeof window !== 'undefined' ? window.addEventListener('scroll', this.handleScroll) : false
  },

  mounted () {
    this.homeContentHeight = this.$refs.homeContent ? this.$refs.homeContent.offsetHeight : this.homeContentHeight
  },

  destroyed () {
    typeof window !== 'undefined' ? window.addEventListener('scroll', this.handleScroll) : false
  },

  updated: function () {
    this.homeContentHeight = this.$refs.homeContent ? this.$refs.homeContent.offsetHeight : this.homeContentHeight
  }
}

</script>


<style lang="scss" scoped>
$primary-color: #EBC8B2;
$screen-medium: 768px;

.header-nav-wrapper {
  position: absolute;
  clip: rect(auto, auto, auto, auto);
  width: 100%;
  height: 206px;
  @media screen and (max-width: $screen-medium) {
    height: 100px;
  }
}

.nav-container {
  z-index: 10;
}

.home-page > .nav-container {
  z-index: 10;
  height: 178px;

  @media screen and (max-width: $screen-medium) {
    height: 100px;
  }
}

header {
  background-color: $primary-color;
  max-height: 178px;
  margin-bottom: 30px;

  @media screen and (max-width: $screen-medium) {
    max-height: 100px;
    overflow: hidden;
  }

  .logo-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .logo-light {
    height: 100%;
    color: #fff;
    font-family: "PlayfairDisplay-Black";
    font-size: 40px;
    letter-spacing: 0;
    background-image: url(~assets/images/logo.svg );
    background-repeat: no-repeat;
    background-position: 0px 140px;
    background-attachment: fixed;
    max-width: 1360px;
    margin: 0 auto;

    @media screen and (max-width: $screen-medium) {
      background-size: 225px;
      background-position: 20px 35px !important;
    }
  }
}

.content {
  min-height: 100vh;
  // position: relative;
  position: absolute;
  margin: 0 auto;
  margin-bottom: 200px;
  clip: rect(auto, auto, auto, auto);
  width: 100%;
}

.content-logo {

  &.active {
    position: fixed;
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  @media screen and (max-width: $screen-medium) {
    margin: 0 auto;
    margin: 0 20px !important;
  }
}

.home-grid {
  margin-top: 0px;
}

</style>

<style lang="scss" >
$screen-medium: 768px;

.home-page .burger-nav {
  right: 40px;
  @media screen and (max-width: $screen-medium) {
    right: 10px;
  }
}

.content .burger-nav {
  top: -138px;
  right: 40px;
  @media screen and (max-width: $screen-medium) {
    right: 10px;
    top: -100px;
  }

}
</style>
