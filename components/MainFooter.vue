<template lang="pug">
.footer
  .footer-content
    .footer-col
      .col-heading
        | Find Us
      .col-content
        a(href="https://goo.gl/maps/N51MXrXLb5E2" target="_blank")
          |7000 Santa Monica Blvd
          br
          |Los Angeles, CA 90038
    .footer-col
      .col-heading
        | Get In Touch
      .col-content
        a(href="tel:+13234504777")  +1 323 450 4777
        a(href="mailto:hello@statebirdcreative.com" target="_blank") hello@statebirdcreative.com
    .footer-col
      .col-heading
        | Connect
      .col-content
        .col-socmedia-block
          a(href="https://twitter.com/_statebird" target="_blank")
            img(src="~assets/images/twitter-icon.svg", alt="")
          a(href="https://www.instagram.com/statebirdcreative/" target="_blank")
            img(src="~assets/images/insta-icon.svg", alt="")
          a(href="https://www.facebook.com/State-Bird-Creative-1660337487327032/" target="_blank")
            img(src="~assets/images/fb-icon.svg", alt="")
    .site-by
      a(href="http://sunroof.io" target="_blank")
        span.text
          | Site by
        span.logo
          | Sunroof
      //- a(href="http://sunroof.io" target="_blank")
      //-   .logo
</template>
<style lang="scss">
$primary-color: #EBC8B2;

$screen-medium:  768px;
.footer {
  background-color: $primary-color;
  color: #fff;
  min-height: 288px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 70px;
  margin-top: 20px;
  position: relative;

  @media screen and (max-width: $screen-medium) {
    padding: 70px;
  }
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 764px;
  margin: 0 auto;

  @media screen and (max-width: $screen-medium) {
    flex-direction: column;
    margin-top: 10px;
    padding-top: 70px;
  }
}

.site-by {
  flex: 1 1 100%;
  margin-top: 80px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: "Lato-Light";

  a {
    text-decoration: none;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }

  .text {
    font-size: 12px;
    font-family: "Lato-Light";
    margin-right: 3px;
    text-decoration: none;
  }

  span.logo {
    font-family: "PlayfairDisplay-Regular";
    font-size: 16px;
    text-decoration: none;
    display: inline-block;
    margin-left: 4px;
    position: relative;
    letter-spacing: 1px;

    &:before {
      content: "";
      position: absolute;
      height: 2px;
      width: 54px;
      bottom: -5px;
      background-color: rgba(255,255,255,0.7);
    }
  }

  div.logo {
    background-image: url(~assets/images/sunroof-logo.svg );
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 130px;
    height: 40px;
  }
}
.footer-col {
  flex: 1 1 33%;
  min-width: 204px;
  &:nth-child(2) {
    padding-left: 17px;
    @media screen and (max-width: $screen-medium) {
      padding-left: 0;
    }
  }
  &:nth-child(3) {
    flex: 1 1 20%;
    padding-left: 37px;
    @media screen and (max-width: $screen-medium) {
      padding-left: 0;
    }
  }
  @media screen and (max-width: $screen-medium) {
    margin-top: 50px;
  }
}
.col-heading {
  font-family: "PlayfairDisplay-Regular";
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0;
  margin-bottom: 20px;
}
.col-content {
  font-family: "Lato-Light";
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0.5px;
  line-height: 22px;
  a {
    font-family: "Lato-Light";
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0.5px;
    line-height: 22px;
    text-decoration: none;
    transition: all 0.3s ease;
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }
}

.col-socmedia-block {
  display: flex;
  margin-top: 28px;
  a {
    margin-right: 20px;
  }
}
</style>
