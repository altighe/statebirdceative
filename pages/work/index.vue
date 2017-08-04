<template lang="pug">
  section(
    :style="'height:' + worksContentHeight + 'px'"
    v-bind:class="{tagsActive: showTags == true}" ).page
    .black-nav
      main-nav
    logo.active
    project-nav( v-on:on-nav-click="setProjectsByCategory" v-bind:tags="tags" v-bind:categories="categories" ).work-project-nav
    .works-wrapper(ref='worksContent')
      tags-nav(
        v-on:on-nav-click="setProjectsByTag"
        v-bind:tags="tags"
        v-if='selectedCategory && selectedCategory == "branded content"').work-tags-nav
      main-nav.white
      .works.on-menu
        project-card(
          v-if='taggedPortfolio.length == 0 && !showNothing'
          v-for="(item, index) in portfolio"
          v-bind:key="item.id"
          v-bind:data-index="index"
          v-bind:project="item"
          v-bind:class=`
            [
              ((( index ) % 3) == 0      ? 'first' : '')  ||
              ((( index - 1 ) % 3) == 0  ? 'mid' : '') ||
              ((( index + 1 ) % 3) == 0  ? 'third' : '' ),
              {
                moveLeft: prevIndex == index,
                moveRight: nextIndex == index
              },
              {
                moveLeft: prevPrevIndex == index,
                moveRight: nextNextIndex == index
              }
            ]
          `
          v-on:on-card-leave="handleCardLeave"
          v-on:on-card-hover="handleCardHover"
          )

        project-card(
          v-if='taggedPortfolio.length > 0 && !showNothing'
          v-for="(item, index) in taggedPortfolio"
          v-bind:key="item.id"
          v-bind:data-index="index"
          v-bind:project="item"
          v-bind:class=`
            [
              ((( index ) % 3) == 0      ? 'first' : '')  ||
              ((( index - 1 ) % 3) == 0  ? 'mid' : '') ||
              ((( index + 1 ) % 3) == 0  ? 'third' : '' ),
              {
                moveLeft: prevIndex == index,
                moveRight: nextIndex == index
              },
              {
                moveLeft: prevPrevIndex == index,
                moveRight: nextNextIndex == index
              }
            ]
          `
          v-on:on-card-leave="handleCardLeave"
          v-on:on-card-hover="handleCardHover"
          )
</template>
<script>
import { db } from '~/db'
import { mapGetters } from 'vuex'
const $portfolio = db.ref('portfolio')
const $tags = db.ref('tags')
const $categories = db.ref('categories')
// components
import Logo from '~components/Logo.vue'
import ProjectCard from '~components/ProjectCard.vue'
import ProjectNav from '~components/ProjectNav.vue'
import TagsNav from '~components/TagsNav.vue'
import MainNav from '~components/MainNav'

export default {
  name: 'Work',
  head: {
    title: 'StateBird | Work'
  },

  fetch ({ store }) {
    store.dispatch('setTagsRef', $tags)
    store.dispatch('setCategoriesRef', $categories)
    store.dispatch('setPortfolioRef', $portfolio)
  },

  data () {
    return {
      nextIndex: null,
      nextNextIndex: null,
      prevIndex: null,
      prevPrevIndex: null,
      worksContentHeight: 1000,
      selectedCategory: '',
      showNothing: false,
      showTags: false,
      taggedPortfolio: []
    }
  },

  methods: {
    setProjectsByTag: function (childEvent) {
      const elem = childEvent.target
      const elemType = elem.type
      this.taggedPortfolio.length = 0
      let counter = 0

      $portfolio.orderByChild(`categories/${this.selectedCategory}`).equalTo(true)
        .on('child_added', (snapshot) => {
          let res = snapshot.val()

          if (res && res.tags && res.tags[elemType]) {
            counter += 1
            this.taggedPortfolio.push(res)
          }
        })

      if (counter === 0) {
        this.taggedPortfolio = []
        this.showNothing = true
      } else {
        this.showNothing = false
      }
    },

    setProjectsByCategory: function (childEvent) {
      this.taggedPortfolio.length = 0
      this.showNothing = false
      this.showTags = true
      const elem = childEvent.target
      const elemType = elem.type
      if (elemType !== 'all') {
        this.selectedCategory = elem.type
      } else {
        this.showTags = false
        this.selectedCategory = ''
      }
      const $portfolioCategories = $portfolio.orderByChild(`categories/${elemType}`).equalTo(true)
      return elemType !== 'all' ? this.$store.dispatch('setPortfolioRef', $portfolioCategories) : this.$store.dispatch('setPortfolioRef', $portfolio)
    },

    handleCardHover: function (e) {
      const cardIndex = e.$el.dataset.index
      const nextIndex = +(cardIndex) + 1
      const nextNextIndex = +(cardIndex) + 2

      const prevIndex = cardIndex - 1
      const prevPrevIndex = cardIndex - 2

      if (e.$el.classList.contains('first')) {
        this.nextIndex = nextIndex
        this.nextNextIndex = nextNextIndex
        this.prevIndex = null
        this.prevPrevIndex = null
      } else if (e.$el.classList.contains('mid')) {
        this.nextIndex = nextIndex
        this.nextNextIndex = null
        this.prevIndex = prevIndex
        this.prevPrevIndex = null
      } else if (e.$el.classList.contains('third')) {
        this.nextIndex = null
        this.nextNextIndex = null
        this.prevIndex = prevIndex
        this.prevPrevIndex = prevPrevIndex
      }
    },

    handleCardLeave: function (e) {
      this.prevIndex = null
      this.prevPrevIndex = null
      this.nextIndex = null
      this.nextNextIndex = null
    }
  },
  computed: {
    ...mapGetters(['portfolio', 'tags', 'toggleMenu', 'categories'])
  },

  updated: function () {
    this.worksContentHeight = this.$refs.worksContent ? +(this.$refs.worksContent.offsetHeight + 200) : this.worksContentHeight
  },

  mounted () {
    this.worksContentHeight = this.$refs.worksContent ? +(this.$refs.worksContent.offsetHeight + 200) : this.worksContentHeight
  },

  components: {
    ProjectCard,
    ProjectNav,
    Logo,
    MainNav,
    TagsNav
  }
}
</script>
<style lang="scss" scoped>
$primary-color: #EBC8B2;

$screen-small:   640px;
$screen-medium: 768px;

.nothing {
  max-width: 1190px;
  margin: 0 auto;
  text-align: center;
}

.work-project-nav.project-nav {
  position: absolute;
  width: 100%;
  top: 190px;
  margin-top: 0px;
  margin-bottom: 0;
  padding-bottom: 40px;
  //padding-top: 40px;
  background-color: #fff;

  @media screen and (max-width: $screen-medium) {
    display: none;
  }

}
.work-tags-nav.tags-nav {
  width: 100%;
  margin-top: 0px;
  margin-bottom: 0;
  max-width: 850px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding-bottom: 40px;
  padding-top: 30px;
  //padding-top: 40px;
  background-color: #fff;

  @media screen and (max-width: $screen-medium) {
    display: none;
  }

}

.content-logo.active {
  @media screen and (max-width: $screen-medium) {
    display: block;
  }
}


.tagsActive .black-nav {
  height: 380px;
}

.black-nav {
  width: 100%;
  height: 280px;
  position: absolute;
  clip: rect(auto, auto, auto, auto);
  top: 0px;
  @media screen and (max-width: $screen-medium) {
    height: 90px;
  }
}


.works {
  display: flex;
  flex-wrap: wrap;
  max-width: 1190px;
  margin: 0 auto;
  min-height: 400px;


  &.on-menu {
    position: relative;
    margin-bottom: 180px;

    @media screen and (max-width: $screen-medium) {
      margin-bottom: 100px;
    }
  }

  .project-card {
    padding: 0 0px;
    flex: 1 1 33%;
    transition: all .2s ease;
    position: relative;
    margin-bottom: 20px;
    padding-bottom: 25px;
    max-width: 396px;

    &:hover {
      box-shadow: 0px 0px 0px 20px rgba(235,200,178,0.45);
      background-color: rgba(235,200,178,0.45);
      position: relative;
      z-index: 1;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      padding-top: 20px;
    }

    @media screen and (max-width: $screen-medium) {
      flex: 1 1 100%;
      max-width: 396px;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 0px;
      padding-bottom: 0;
      padding-top: 20px;
      box-shadow: none;
    }

    @media screen and (max-width: $screen-small) {
      flex: 1 1 100%;
      max-width: 100%;
      margin-left: 10px;
      margin-right: 10px;
      margin-bottom: 0px;
      padding-bottom: 0;
      padding-top: 20px;
      box-shadow: none;
    }

    &.moveRight {
      @media screen and (min-width: $screen-medium) {
        transform: translateX(20px)
      }
    }

    &.moveLeft {
      @media screen and (min-width: $screen-medium) {
        transform: translateX(-20px)
      }
    }
  }

}
</style>

<style lang="scss" >
$screen-medium: 768px;
$screen-large:   1200px;

.works-wrapper {
  clip: rect(auto, auto, auto, auto);
  position: absolute;
  width: 100%;
  top: 260px;
  background-color: #fff;

  @media screen and (max-width: $screen-large) {
    padding: 0 40px;
  }

  @media screen and (max-width: $screen-medium) {
    padding: 0;
    top: 70px;
  }

  .nav-container {
    z-index: 10;

    .burger-nav {
      top: -232px;

      @media screen and (max-width: $screen-medium) {
        top: -40px
      }
    }
  }
}
</style>
