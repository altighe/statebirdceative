<template lang="pug">
  section.page
    main-nav
    logo.active
    .content
      .content-block
        .content-wrapper
          p
            | STATE BiRD is a fully integrated creative production studio, with roots in commercial production and a focus on branded content in all its forms. We are a collection of producers and creatives with diverse backgrounds that we draw upon and apply to every project we take on.<br/><br/>
          p
            | Our aim is to build longterm relationships with our clients to better understand their needs and adapt accordingly. We’re not everything to everyone and we don’t take on all projects, but the ones we do are guided by one very important principle: we must be proud of everything we create.
          .lists-wrapper
            ul.capabilities-list
              li
                | Creative Direction
              li
                | Post
            ul.capabilities-list
              li
                | Production Services
              li
                | VFX/Animation
            ul.capabilities-list
              li
                | Photography
              li
                | Sound Design
            ul.capabilities-list
              li
                | Social
              li
                | Music

</template>
<script>
import Logo from '~components/Logo'
import ProjectCard from '~components/ProjectCard'
import MainNav from '~components/MainNav'

export default {
  name: 'About',
  head: {
    title: 'StateBird | About'
  },
  components: {
    Logo,
    ProjectCard,
    MainNav
  }
}
</script>

<style lang="scss" scoped>
$font-color-main: rgba(0,0,0,0.87);

$screen-small: 480px;
$screen-medium: 768px;

.content {
  position: relative;
  top: 186px;
  padding-top: 40px;
  margin: 0 auto;
  margin-bottom: 226px;
  background-color: #fff;
  padding: 0 20px;

  @media screen and (max-width: $screen-medium) {
    top: 127px;
  }
}

.content-block {
  display: flex;
  max-width: 790px;
  margin: 0 auto;
  position: relative;

  &.capabilities {
    justify-content: flex-end;
    margin-top: 70px;
  }

  h2 {
    font-family: "PlayfairDisplay-Black";
    font-size: 40px;
    color: $font-color-main;
    letter-spacing: 0;
    margin-bottom: 35px;
  }

  p {
    font-family: "Lato-Light";
    font-size: 20px;
    color: #616161;
    letter-spacing: 0.5px;
    line-height: 28px;
    text-align: justify;
    @media screen and (max-width: $screen-medium) {
      font-size: 16px;
      letter-spacing: 0.5px;
      line-height: 20px;
      padding-right: 20px;
    }
  }

  a {
    margin-top: 20px;
  }
}

.lists-wrapper {
  display: flex;
  margin-top: 120px;
  margin-bottom: 120px;
  justify-content: space-between;

  @media screen and (max-width: $screen-small) {
    flex-wrap: wrap;
    flex: 1 1 100%;
    margin-bottom: 20px;
  }

  @media screen and (max-width: $screen-small) {
    display: block;
  }

  .capabilities-list {
    list-style: none;
    padding-left: 0;
    padding-right: 40px;

    &:last-child {
      padding-right: 0 !important;
    }

    @media screen and (max-width: $screen-medium) {
      //min-width: 30%;
    }

    li {
      margin-bottom: 4px;
      font-family: "Lato-Black";
      font-size: 15px;
      color: #616161;
      letter-spacing: 0.9px;
      line-height: 18px;
      padding-bottom: 10px;
      text-transform: uppercase;
    }

  }
}

.link-w-underline {
  font-family: "PlayfairDisplay-Italic";
  font-size: 16px;
  color: $font-color-main;
  letter-spacing: 1.5px;
  padding-bottom: 3px;
  position: relative;
  text-decoration: none;
  display: table;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 120%;
    height: 2px;
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 1);
  }
}

.projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1030px;
  margin: 0 auto;
  margin-top: 68px;

  @media screen and (max-width: $screen-medium) {
    margin-bottom: 50px;
  }

  .content-block {
    max-width: 950px;
    margin: 0 auto;
    margin-left: 40px;
    margin-bottom: 33px;

    @media screen and (max-width: $screen-medium) {
      margin-left: 0;
    }
  }

  .project-card {
    flex: 1 1 50%;
    padding: 0 40px;

    @media screen and (max-width: $screen-medium) {
      flex: 1 1 100%;
      padding: 0;
    }
  }
}
</style>
