<template lang="pug">
  .home-grid(:class="['grid-' + portfolio.length]")
    div(v-for="(item, index) in reversedPortfolio"  class="home-project" v-bind:class=`
      [ index >  10 ? 'home-project_' + (index - (index > 20 ? 20 : 10)) :
          'home-project_' + index
      ]
    ` )
      router-link(:to="'/work/' + item.link")
        .overlay.active-on-mobile
          .client
            | {{item.name}}
          .spot
            | {{item.title}}
          .agency
            | {{item.agency}}
        .image(:style="{backgroundImage: 'url(' + item.image + ')' }")
</template>
<script>
export default {
  props: ['portfolio'],
  computed: {
    reversedPortfolio () {
      let reversedPortfolio = this.portfolio.slice(-10).reverse()
      return reversedPortfolio
    }
  }
}
</script>
<style lang="scss">
$screen-small:   640px;
$screen-medium:  768px;
$screen-large:   1200px;

.home-grid {
  max-width: 1380px;
  margin: 0 auto;

  @media screen and (max-width: 1370px) {
    padding: 0;
  }

  @media screen and (max-width: $screen-large) {
    padding: 0 30px;
  }

  @media screen and (max-width: $screen-medium) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }

  &.grid-6 {
    .home-project_5 {
      min-width: 100%;
      min-height: 500px;

      @media screen and (max-width: $screen-medium) {
        min-width: auto;
        min-height: auto;
      }
    }
  }

  &.grid-7 {
    .home-project_6 {
      min-width: 49.5%;
      max-width: 49.5% !important;
      min-height: 400px;
      float: right;

      @media screen and (max-width: $screen-medium) {
        min-width: auto;
        max-width: 90% !important;
        min-height: auto;
      }
    }
    .home-project_5 {
      margin-top: 3px;
      min-width: 49.5%;
      max-width: 49.5% !important;
      min-height: 400px;
      @media screen and (max-width: $screen-medium) {
        max-width: 90% !important;
      }
    }
  }

  &.grid-8 {
    .home-project_6 {
      height: 539px;
      min-height: 539px;

      @media screen and (max-width: $screen-medium) {
        height: auto;
        min-height: auto;
      }
    }
  }

  &.grid-9 {
    .home-project_7 {
      float: left !important;
    }
    .home-project_8 {
      float: right !important;
    }
    .home-project_5,
    .home-project_6,
    .home-project_7,
    .home-project_8 {
      min-width: 49.5%;
      max-width: 49.5% !important;
      height: 400px;
      min-height: 400px;
      @media screen and (max-width: $screen-medium) {
        height: auto;
        min-height: auto;
        max-width: 90% !important;
      }
    }
  }

  .home-project {
    color: red;
    display: inline;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    float: left;
    margin-bottom: 10px;

    &:hover {
      .overlay {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media screen and (max-width: $screen-medium) {
      margin: 0;
      margin-top: 0 !important;
      margin-left: 0 !important;
      margin-bottom: 20px !important;
      height: auto !important;
      max-width: 90% !important;
    }

    > a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    img {
      height: 100%;
      @media screen and (max-width: $screen-medium) {
        width: 100%;
      }
    }

    .image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      @media screen and (max-width: $screen-medium) {
        min-height: 300px;
      }
    }

    .overlay {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      flex-direction: column;
      transition: all 0.3s ease;
      transform: translateY(0%);
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(66, 66, 66, .4);

      &.active-on-mobile {
        @media screen and (max-width: $screen-medium) {
          opacity: 1;
        }
      }

      .agency,
      .client,
      .spot {
        position: relative;
        width: 100%;
        text-align: left;
        color: rgba(255,255,255,0.70);
        padding-left: 20px;

        @media screen and (max-width: 890px) {
          font-size:  30px;
          line-height: 30px;
        }
        @media screen and (max-width: $screen-medium) {
          font-size: 30px;
          line-height: 30px;
        }
      }

      .client {
        font-size: 16px;
        letter-spacing: 0.75px;
        font-family: 'Lato-Regular';
        text-transform: uppercase;
      }

      .spot {
        font-family: "PlayfairDisplay-Regular";
        margin-bottom: 24px;
        font-size: 34px;
        letter-spacing: 3px;
      }
    }

    &.big {
      height: 400px;
      max-width: 66.3%;
      width: 100%;
    }

    &.small {
      height: 264px;
      width: 100%;
      max-width: 33%;
    }

    &.home-project_0 {
      @extend .big;
      float: left
    }

    &.home-project_1 {
      @extend .small;
      left: auto;
      float: right;
    }

    &.home-project_2 {
      @extend .small;
      float: right;
    }

    &.home-project_3 {
      @extend .big;
      width: 100%;
      float: left;
    }

    &.home-project_4 {
      @extend .small;
      float: right;
    }

    &.home-project_5 {
      @extend .small;
      float: left;
    }

    &.home-project_6 {
      @extend .big;
      float: right;
    }

    &.home-project_7 {
      @extend .small;
      float: left;
    }

    &.home-project_8 {
      @extend .big;
      float: right;
    }

    &.home-project_9 {
      @extend .small;
      float: left;
    }

    &.home-project_10 {
      @extend .small;
      float: left;
    }


  }
}
</style>
