<template lang="pug">
  section.page
    main-nav
    logo.active
    .project.on-logo
      .project-title
        | {{project.title}}
        .subtitle
          | {{project.name}}
      .slide-arrow.left(
        v-on:mouseover="renderProjectPreview"
        v-on:mouseleave="hideProjectPreview"
        @click="hideAllProjectPreview"
        v-if="nextProject")
        project-card(
          v-bind:class="{active: showNextProject}"
          v-bind:project="nextProject").left
        nuxt-link(
          :to="'/work/' + nextProject.link"
          v-if=" nextProject && typeof nextProject.link != 'undefined'")
          svg(width='17px', height='17px', viewbox='0 0 17 17', version='1.1', xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink')
            g#Desktop(stroke='none', stroke-width='1', fill='none', fill-rule='evenodd', font-weight='normal', font-family='FontAwesome', font-size='30', fill-opacity='0.87')
              g#Project-single(transform='translate(-54.000000, -378.000000)', fill='#000000')
                g#Left(transform='translate(40.000000, 362.000000)')
                  text(id='')
                    tspan(x='14', y='34') 



      .slide-arrow.right(
        v-on:mouseover="renderProjectPreview('prev')"
        v-on:mouseleave="hideProjectPreview('prev')"
        @click="hideAllProjectPreview"
        v-if="project._id !== 1 && prevProject")
        project-card(
          v-bind:class="{active: showPrevProject}"
          v-bind:project="prevProject" ).right
        nuxt-link(
          :to="'/work/' + prevProject.link"
          v-if="typeof prevProject.link != 'undefined'")
          svg(width='17px', height='17px', viewbox='0 0 17 17', version='1.1', xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink')
              g#Desktop(stroke='none', stroke-width='1', fill='none', fill-rule='evenodd', font-size='30', font-family='FontAwesome', font-weight='normal')
                g#Project-single(transform='translate(-1368.000000, -378.000000)', fill='#000000')
                  g#Right-hover(transform='translate(974.000000, 263.000000)')
                    g(transform='translate(376.000000, 99.000000)', id='')
                      text
                        tspan(x='18', y='34') 


      .content
        .text-block
          vue-markdown(:source="project.content" v-if="project.content")
</template>
<script>

import { db } from '~/db'
import { mapGetters } from 'vuex'
const $portfolio = db.ref('portfolio')
import VueMarkdown from 'vue-markdown'
// components
import Logo from '~components/Logo'
import ProjectCard from '~components/ProjectCard'
import MainNav from '~components/MainNav'

export default {
  name: 'Project',
  head: {
    title: 'StateBird | Project'
  },
  components: {
    Logo,
    ProjectCard,
    VueMarkdown,
    MainNav
  },
  fetch ({ store }) {
    return store.dispatch('setPortfolioRef', $portfolio)
  },
  data () {
    return {
      showNextProject: false,
      showPrevProject: false
    }
  },

  methods: {
    renderProjectPreview: function (direction) {
      direction === 'prev' ? this.showPrevProject = true : this.showNextProject = true
    },

    hideProjectPreview: function (direction) {
      direction === 'prev' ? this.showPrevProject = false : this.showNextProject = false
    },

    hideAllProjectPreview: function () {
      this.showPrevProject = false
      this.showNextProject = false
    }
  },

  computed: {
    ...mapGetters(['portfolio']),

    project () {
      let project = this.portfolio.filter((project) => project.link === this.$route.params.link)
      return project[0] ? project[0] : {title: ' ', name: ' ', link: ''}
    },

    nextProject () {
      const currentProject = this.project
      let nextProj = {}

      this.portfolio.forEach(function (element, index, array) {
        element._id === currentProject._id ? nextProj = array[+(index) + 1] : {}
      })
      return nextProj
    },

    prevProject () {
      const currentProject = this.project
      let prevProj = {}

      this.portfolio.forEach(function (element, index, array) {
        element._id === currentProject._id ? prevProj = array[+(index) - 1] : {}
      })
      return prevProj
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #EBC8B2;
$font-color-main: rgba(0,0,0,0.87);

$screen-medium: 768px;

.content-logo {
  &.active {
    position: fixed;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: block;

    @media screen and (max-width: $screen-medium) {
      left: 0;
      transform: none;
    }
  }
}

.project-title {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: "PlayfairDisplay";
  font-size: 24px;
  color: $font-color-main;
  letter-spacing: 2px;
  line-height: 30px;
  margin-bottom: -20px;

  @media screen and (max-width: $screen-medium) {
    margin-bottom: 14px;
    font-size: 32px;
  }

  .subtitle {
    font-family: "Lato-Regular";
    font-size: 14px;
    color: $font-color-main;
    letter-spacing: 0.75px;
    text-transform: uppercase;

    @media screen and (max-width: $screen-medium) {
      font-size: 15px;
    }
  }
}

.project {
  max-width: 1360px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;

  @media screen and (max-width: $screen-medium) {
    margin: 0 20px;
  }

  &.on-logo {
    top: 180px;
    padding-bottom: 210px;
    //padding-top: 30px;

    @media screen and (max-width: $screen-medium) {
      top: 100px;
      padding-bottom: 0px;
      margin-bottom: 150px;
    }
  }

  .content {
    max-width: 762px;
    margin: 0 auto;
    min-height: 80vh;

    .text-block {
      margin-bottom: 60px;
      margin-top: 50px;
      font-family: "Lato-Light";
      font-size: 18px;
      color: $font-color-main;
      letter-spacing: 0.5px;

      @media screen and (max-width: $screen-medium) {
        margin-top: 20px;
      }
    }

    .video-block,
    .image-block {
      margin-bottom: 60px;
      width: 100%;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }
}

.slide-arrow {
  width: 50px;
  height: 50px;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  top: 50vh;
  z-index: 1;

  @media screen and (max-width: $screen-medium) {
    display: none;
  }

  &:hover {
    background-color: $primary-color;

    #Project-single {
      fill: #FFFFFF;
    }
  }

  > a {
    padding: 20px;
  }

  .project-card {
    // display: none;
    transition: all .2s ease-in-out;
    transform: scale(0);
    min-width: 356px;
    padding: 10px;
    background-color: #fff;
    position: absolute;
    z-index: 2;

    &.active {
      // display: flex;
      transform: scale(1);
    }

    &.left {
      left: 50px;
      transform-origin: left;
    }

    &.right {
      right: 50px;
      transform-origin: right;
    }
  }

  a {
    left: 50%;
    top: 53%;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
}
</style>

<style lang="scss">
$screen-medium: 768px;

.project .text-block {

  img {
    width: 100%;
    margin-bottom: 50px;
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
    margin-bottom: 50px;

    embed,
    object,
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  p {
    font-family: "Lato-Light";
    font-size: 20px;
    color: rgba(0,0,0,.87);
    letter-spacing: 0.5px;
    line-height: 28px;

    margin: 0 auto;
    margin-bottom: 30px;

    @media screen and (max-width: $screen-medium) {
      font-size: 16px;
      letter-spacing: 0.5px;
      line-height: 20px;
    }
  }

  h1, h2, h3, h4, h5 {
    font-size: 18px;
    font-family: "Lato-Regular";
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;

    margin: 0 auto;
    margin-bottom: 11px;
  }
}
</style>
