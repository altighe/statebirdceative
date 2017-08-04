<template lang="pug">
  #app(:class="routeName")
    nuxt
    main-footer
    mobile-nav
</template>
<script>
  import MainNav from '~components/MainNav'
  import MobileNav from '~components/MobileNav'
  import MainFooter from '~components/MainFooter'
  export default {
    components: {
      MainNav,
      MobileNav,
      MainFooter
    },

    computed: {
      routeName () {
        const name = this.$route.name || ''
        return name.toLowerCase()
      }
    }
  }
</script>
<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}
@font-face {
	font-family: 'Lato-Light';
	src: url('~static/fonts/Lato-Light.eot') format('eot'),
	     url('~static/fonts/Lato-Light.woff') format('woff'),
	     url('~static/fonts/Lato-Light.ttf')  format('truetype'),
	     url('~static/fonts/Lato-Light.svg') format('svg');
}

@font-face {
	font-family: 'Lato-LightItalic';
	src: url('~static/fonts/Lato-LightItalic.eot') format('eot'),
	     url('~static/fonts/Lato-LightItalic.woff') format('woff'),
	     url('~static/fonts/Lato-LightItalic.ttf')  format('truetype'),
	     url('~static/fonts/Lato-LightItalic.svg') format('svg');
}

@font-face {
	font-family: 'Lato-Regular';
	src: url('~static/fonts/Lato-Regular.eot') format('eot'),
	     url('~static/fonts/Lato-Regular.woff') format('woff'),
	     url('~static/fonts/Lato-Regular.ttf')  format('truetype'),
	     url('~static/fonts/Lato-Regular.svg') format('svg');
}

@font-face {
	font-family: 'Lato-Black';
	src: url('~static/fonts/Lato-Black.eot') format('eot'),
	     url('~static/fonts/Lato-Black.woff') format('woff'),
	     url('~static/fonts/Lato-Black.ttf')  format('truetype'),
	     url('~static/fonts/Lato-Black.svg') format('svg');
}

@font-face {
	font-family: 'PlayfairDisplay-Black';
	src: url('~static/fonts/PlayfairDisplay-Black.eot') format('eot'),
	     url('~static/fonts/PlayfairDisplay-Black.woff') format('woff'),
	     url('~static/fonts/PlayfairDisplay-Black.ttf')  format('truetype'),
	     url('~static/fonts/PlayfairDisplay-Black.svg') format('svg');
}

@font-face {
	font-family: 'PlayfairDisplay-BlackItalic';
	src: url('~static/fonts/PlayfairDisplay-BlackItalic.eot') format('eot'),
	     url('~static/fonts/PlayfairDisplay-BlackItalic.woff') format('woff'),
	     url('~static/fonts/PlayfairDisplay-BlackItalic.ttf')  format('truetype'),
	     url('~static/fonts/PlayfairDisplay-BlackItalic.svg') format('svg');
}

@font-face {
	font-family: 'PlayfairDisplay-Bold';
	src: url('~static/fonts/PlayfairDisplay-Bold.eot') format('eot'),
	     url('~static/fonts/PlayfairDisplay-Bold.woff') format('woff'),
	     url('~static/fonts/PlayfairDisplay-Bold.ttf')  format('truetype'),
	     url('~static/fonts/PlayfairDisplay-Bold.svg') format('svg');
}

@font-face {
	font-family: 'PlayfairDisplay-BoldItalic';
	src: url('~static/fonts/PlayfairDisplay-BoldItalic.eot') format('eot'),
	     url('~static/fonts/PlayfairDisplay-BoldItalic.woff') format('woff'),
	     url('~static/fonts/PlayfairDisplay-BoldItalic.ttf')  format('truetype'),
	     url('~static/fonts/PlayfairDisplay-BoldItalic.svg') format('svg');
}

@font-face {
	font-family: 'PlayfairDisplay-Italic';
	src: url('~static/fonts/PlayfairDisplay-Italic.eot') format('eot'),
	     url('~static/fonts/PlayfairDisplay-Italic.woff') format('woff'),
	     url('~static/fonts/PlayfairDisplay-Italic.ttf')  format('truetype'),
	     url('~static/fonts/PlayfairDisplay-Italic.svg') format('svg');
}

@font-face {
	font-family: 'PlayfairDisplay-Regular';
	src: url('~static/fonts/PlayfairDisplay-Regular.eot') format('eot'),
	     url('~static/fonts/PlayfairDisplay-Regular.woff') format('woff'),
	     url('~static/fonts/PlayfairDisplay-Regular.ttf')  format('truetype'),
	     url('~static/fonts/PlayfairDisplay-Regular.svg') format('svg');
}

</style>
