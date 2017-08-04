<template lang="pug">
  .nav-container
    .main-nav-content
      .main-nav-item-wrapper(v-on:mouseover="handleNavItemHover" v-on:mouseleave="handleNavItemLeave")
        nuxt-link(:to="'/about'"  v-bind:class="{ inactive: inactive, activeMobileFirst: menuState}").main-nav-item
          span.nav-item-name about
      .main-nav-item-wrapper(v-on:mouseover="handleNavItemHover" v-on:mouseleave="handleNavItemLeave")
        nuxt-link(:to="'/work'" v-bind:class="{ inactive: inactive, activeMobileSecond: menuState}").main-nav-item
          span.nav-item-name work
      .main-nav-item-wrapper(v-on:mouseover="handleNavItemHover" v-on:mouseleave="handleNavItemLeave")
        nuxt-link(:to="'/contact'" v-bind:class="{ inactive: inactive, activeMobileThird: menuState}").main-nav-item
          span.nav-item-name contact

    .burger-nav
      .mobile-overlay(@click="handleMobileClick")
      .nav-item-wrapper(v-on:mouseover="handleNavItemHover" v-on:mouseleave="handleNavItemLeave")
        nuxt-link(:to="'/about'"  v-bind:class="{ inactive: inactive, activeMobileFirst: menuState}").nav-item.first
          .nav-item-name about
      .nav-item-wrapper(v-on:mouseover="handleNavItemHover" v-on:mouseleave="handleNavItemLeave")
        nuxt-link(:to="'/work'" v-bind:class="{ inactive: inactive, activeMobileSecond: menuState}").nav-item.second
          .nav-item-name work
      .nav-item-wrapper(v-on:mouseover="handleNavItemHover" v-on:mouseleave="handleNavItemLeave")
        nuxt-link(:to="'/contact'" v-bind:class="{ inactive: inactive, activeMobileThird: menuState}").nav-item.third
          .nav-item-name contact

</template>
<script>
export default {
  data () {
    return {
      inactive: false
    }
  },

  methods: {
    handleNavItemHover: function (e) {
      this.inactive = true
    },

    handleNavItemLeave: function (e) {
      this.inactive = false
    },

    handleMobileClick: function (e) {
      this.menuState = !this.menuState
      this.$store.dispatch('toggleMenu', true)
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
$navItemWidth: 40px;
$navItemWidthActive: 70px;

$screen-medium:  768px;

$primary-color: #EBC8B2;

.mobile-overlay {
  display: none;

  @media screen and (max-width: $screen-medium) {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
    cursor: pointer;
  }
}

.work-link,
.work,
.about,
.contact {
  .main-nav-content {
    .main-nav-item {

      .nav-item-name {
        color: #616161;
      }

      &.nuxt-link-active {
        span {
          color: #ebc8b2;
        }
      }

      &:hover {

        .nav-item-name {
          color: $primary-color;
        }
      }
    }

  }
}

.work {

  .tagsActive .nav-container.white .main-nav-content {
    top: -265px;
  }

  .nav-container.white .main-nav-content {
    top: -165px;

    .main-nav-item {
      .nav-item-name {
        color: #fff;
        text-shadow: 1px 1px #616161;
      }
      &:hover {
        .nav-item-name {
          color: $primary-color;
          text-shadow: 0 0 #616161;
        }
      }
    }
  }
}

.main-nav-content {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  right: 60px;
  top: 95px;
  z-index: 100;

  .main-nav-item {
    text-decoration: none;
    padding: 0 25px;
    cursor: pointer;

    &:hover {
      .nav-item-name {
        color: #8a8a8a;
      }
    }

    .nav-item-name {
      color: #fff;
      font-family: "PlayfairDisplay-Black";
      font-size: 36px;
      letter-spacing: 0;
    }
  }

  @media screen and (max-width: $screen-medium) {
    display: none;
  }
}


.burger-nav {
  position: fixed;
  display: none;
  flex-direction: column;
  right: 40px;
  top: 70px;
  z-index: 100;

  @media screen and (max-width: $screen-medium) {
    display: flex;
    right: 10px;
    top: 30px;
  }
}


.nav-container {
  background-color: transparent;
  width: 100%;
  max-width: 1380px;
  left: 50%;
  position: fixed;
  z-index: 100;
  transform: translateX(-50%);

  &.white {
    .nav-item.activeMobileFirst,
    .nav-item.activeMobileSecond,
    .nav-item.activeMobileThird,
    .nav-item {
      &:before {
        background-color: #fff;
        box-shadow: 0px 0px 0px 1px rgba(255,255,255,1);
      }
      .nav-item-name {
        color: #fff;
        text-shadow: none;
      }
      &.third::before {
        box-shadow: 0px 1px 0px 0px rgba(255,255,255,1), 0px 0px 0px 1px rgba(255,255,255,1);
      }
    }

    .main-nav-content {
      top: -110px;
    }
  }

  .nav-item.second::before {
    min-height: 5px;
    height: 5px;
  }
  .nav-item.third::before {
    min-height: 2px;
    height: 2px;
    box-shadow: 0px 1px 0px 0px #616161;
  }
  .nav-item {
    position: relative;
    padding-right: 80px;
    text-decoration: none;
    height: 15px;
    display: flex;
    align-items: center;
    transition: transform 0.2s ease, opacity 0.1s ease;;

    &:before {
      content: '';
      cursor: pointer;
      transition: all 0.3s ease;
      position: absolute;
      top: 60%;
      transform: translateY(-50%);
      right: 0;
      width: $navItemWidth;
      min-width: $navItemWidth;
      height: 7px;
      background-color: #616161;
    }

    &.inactive {
      .nav-item-name {
        transform: scale(0) !important;
      }

      &:before {
        width: $navItemWidth !important;
      }
    }

    &:hover.inactive {
      .nav-item-name{
        transform: scale(1) !important;
      }

      &:before {
        width: $navItemWidthActive !important;
      }
    }

    &:hover,
    &.nuxt-link-active {
      &.activeMobileFirst,
      &.activeMobileSecond,
      &.activeMobileThird {
        &:before {
          width: $navItemWidth;
        }
      }
      .nav-item-name{
        transform: scale(1);
        @media screen and (max-width: $screen-medium) {
          transform: scale(0);
        }
      }
      &:before {
        width: $navItemWidthActive;
      }
    }

    &.activeMobileFirst {
      transform: rotate(45deg);
      top: -28px;

      &:before {
        height: 3px;
        box-shadow: none;
      }
    }

    &.activeMobileThird {
      transform: rotate(-45deg);
      top: 20px;
      left: -2px;

      &:before {
        height: 3px;
        box-shadow: none;
      }
    }

    &.activeMobileSecond {
      opacity: 0;
    }

  }

  .nav-item-name {
    transform: scale(0);
    transition: all 0.3s ease;
    transform-origin: right;
    text-transform: capitalize;
    font-family: "Lato-Black";
    font-size: 18px;
    letter-spacing: 1px;
    color: #616161;
  }
}


</style>
