<template lang="pug">

  .content-logo(:style="'background-position:' + leftMargin + 'px 76px'" ref="logo" v-bind:class="{show: show}")
    nuxt-link(:to="'/'" v-if="routeName !== 'index'")

</template>
<script>
export default {
  data () {
    return {
      leftMargin: 0,
      show: false
    }
  },
  methods: {
    setLogoPosition () {
      this.leftMargin = this.$refs.logo ? this.$refs.logo.offsetLeft : 0
    }
  },
  created () {
    typeof window !== 'undefined' ? window.addEventListener('resize', this.setLogoPosition) : false
  },
  mounted: function () {
    this.leftMargin = this.$refs.logo ? this.$refs.logo.offsetLeft : 0
    this.show = true
  },
  updated: function () {
    this.leftMargin = this.$refs.logo ? this.$refs.logo.offsetLeft : 0
    this.show = true
  },
  computed: {
    routeName () {
      const name = this.$route.name || ''
      return name.toLowerCase()
    }
  }
}
</script>

<style lang="scss">
$screen-medium:  768px;

.content-logo {
  min-height: 178px;
  background-image: url(~assets/images/logo-color.svg );
  background-repeat: no-repeat;
  background-position: 0px 76px;
  background-attachment: fixed;
  background-size: 350px 52px;
  max-width: 1360px;
  margin: 0 auto;
  visibility: hidden;

  &.show {
    visibility: visible;
  }

  &.active {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background-attachment: scroll;
    background-position: 20px 76px !important;

    @media screen and (max-width: $screen-medium) {
      background-size: 225px;
      background-position: 0px 35px !important;
    }
  }

  @media screen and (max-width: $screen-medium) {
    background-size: 90%;
    margin: 0 20px;
    min-height: 210px;
    width: 90%;
  }

  a {
    min-width: 100%;
    min-height: 178px;
    content: '';
    display: block;
    @media screen and (max-width: $screen-medium) {
      min-width: 50%;
      max-width: 50%;
    }
  }
}

</style>
