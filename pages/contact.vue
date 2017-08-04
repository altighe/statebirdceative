<template lang="pug">
section.page
  main-nav
  logo.active
  .contact-content-wrapper
    .contact-content
      .contact-col.map-col
        .address
          a(href="https://goo.gl/maps/N51MXrXLb5E2" target="_blank")
            | 7000 Santa Monica Blvd
            br
            | Los Angeles, CA 90038
        //.map
          iframe(src="https://snazzymaps.com/embed/4394" width="356px" height="216px" style="border:none;")

        .conatact-data
          a(href="mailto:hello@statebirdcreative.com" target="_blank")
            | hello@statebirdcreative.com
          a(href="tel:+13234504777")
            | +1 323 450 4777
      .contact-col
        .team-member
          .name
            | Megan Huber
          .position
            | Executive Producer
          a(href="mailto:megan@statebirdcreative.com" target="_blank").mail
            | megan@statebirdcreative.com
        .team-member
          .name
            | Hannah Kallaoun
          .position
            | Head of Production
          a(href="mailto:hannah@statebirdcreative.com" target="_blank").mail
            | hannah@statebirdcreative.com
        .team-member
          .name
            | Anna Triggs
          .position
            | EP of New Business
          a(href="mailto:anna@statebirdcreative.com" target="_blank").mail
            | anna@statebirdcreative.com
      .contact-col
        .team-member
          .name
            | Kevin Batten
          .position
            | West Coast
          a(href="mailto:kevin@wearepoparts.com" target="_blank").mail
            | kevin@wearepoparts.com
        .team-member
          .name
            | Renee & Melissa
          .position
            | Midwest
          a(href="mailto:hello@reneeandmelissa.com" target="_blank").mail
            | hello@reneeandmelissa.com
        .team-member
          .name
            | Meredith Bergman
          .position
            | East Coast
          a(href="mailto:meredith@mercuryrising.tv" target="_blank").mail
            | meredith@mercuryrising.tv
        .team-member
          .name
            | Tommy Labuda
          .position
            | Music Video Rep
          a(href="mailto:tommylabuda@me.com" target="_blank").mail
            | tommylabuda@me.com

</template>

<script>
import Logo from '~components/Logo'
import MainNav from '~components/MainNav'

export default {
  name: 'Contact',
  head: {
    title: 'StateBird | Contact'
  },

  components: {
    Logo,
    MainNav
  },

  methods: {
    initMap: function () {
      // this.map = new window.google.maps.Map(document.getElementById('map'), {
      //   zoom: 16,
      //   center: this.center,
      //   styles: this.styles
      // })
    }
  },

  mounted () {
    this.initMap()
  },

  data () {
    return {
      map: null,
      center: {lat: 34.090569, lng: -118.341843},
      styles: [{
        'featureType': 'administrative',
        'elementType': 'all',
        'stylers': [{
          'saturation': '-100'
        }]
      }, {
        'featureType': 'administrative.province',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [{
          'saturation': -100
        }, {
          'lightness': 65
        }, {
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [{
          'saturation': -100
        }, {
          'lightness': '50'
        }, {
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [{
          'saturation': '-100'
        }]
      }, {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'road.arterial',
        'elementType': 'all',
        'stylers': [{
          'lightness': '30'
        }]
      }, {
        'featureType': 'road.local',
        'elementType': 'all',
        'stylers': [{
          'lightness': '40'
        }]
      }, {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [{
          'saturation': -100
        }, {
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{
          'hue': '#ffff00'
        }, {
          'lightness': -25
        }, {
          'saturation': -97
        }]
      }, {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers': [{
          'lightness': -25
        }, {
          'saturation': -100
        }]
      }]
    }
  }
}
</script>
<style lang="scss">

$font-color-main: rgba(0,0,0,0.87);

$screen-xsmall: 360px;
$screen-medium: 768px;
$screen-large:   1200px;

#map {
  width: 356px;
  height: 216px;
}

.nav-container {
  z-index: 10;
}

.contact-content-wrapper {
  background-color: #fff;
  position: relative;
  top: 186px;
  margin-bottom: 326px;
  padding-top: 40px;

  @media screen and (max-width: $screen-medium) {
    padding-top: 0;
    top: 117px;
    margin-bottom: 180px;
  }
}
.contact-content {
  display: flex;
  max-width: 1160px;
  margin: 0 auto;

  @media screen and (max-width: $screen-large) {
    padding: 0 40px;
  }


  @media screen and (max-width: $screen-medium) {
    flex-wrap: wrap;
    padding: 20px;

  }
}
.contact-col {
  flex: 1 1 25%;

  &.map-col {
    flex: 1 1 40%;
  }

  @media screen and (max-width: $screen-medium) {
    flex: 1 1 50%;
    max-width: 360px;
    margin: 0 auto;
    max-width: 50%;

    &.map-col {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
  @media screen and (max-width: $screen-xsmall) {
    flex: 1 1 100%;
    max-width: 360px;
    margin: 0 auto;
    max-width: 100%;

    &.map-col {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }

  .heading {
    font-family: "PlayfairDisplay-Black";
    font-size: 40px;
    color: $font-color-main;
    letter-spacing: 0;
    text-transform: capitalize;
    margin-bottom: 30px;
  }

  .address {
    font-family: "Lato-Light";
    font-size: 16px;
    color: $font-color-main;
    letter-spacing: 0.5px;
    margin-bottom: 20px;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .map {
    margin-bottom: 32px;

    img {
      @media screen and (max-width: $screen-medium) {
        width: 100%;
      }
    }
  }

  .conatact-data {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    a {
      font-family: "Lato-Light";
      font-size: 16px;
      color: $font-color-main;
      letter-spacing: 0.5px;
      text-decoration: none;
      display: block;
      padding-bottom: 7px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .team-member {
    margin-bottom: 25px;

    .name {
      font-family: "PlayfairDisplay-Regular";
      font-size: 22px;
      color: $font-color-main;
      letter-spacing: 0.56px;
      //margin-bottom: 8px;

      @media screen and (max-width: $screen-medium) {
        font-size: 16px;
      }
    }
    .position {
      font-family: "Lato-LightItalic";
      font-size: 16px;
      color: $font-color-main;
      letter-spacing: 0.5px;

      @media screen and (max-width: $screen-medium) {
        font-size: 11px;
      }
    }
    .mail {
      font-family: "Lato-Light";
      font-size: 16px;
      color: $font-color-main;
      letter-spacing: 0.5px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      @media screen and (max-width: $screen-medium) {
        font-size: 11px;
      }
    }
  }
}

.gmnoprint {
    display: none;
}

</style>
