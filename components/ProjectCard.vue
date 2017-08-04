<template lang="pug">
  .project-card(v-if="project" v-on:mouseover="handleCardHover" v-on:mouseleave="handleCardLeave")
    .card-image
      nuxt-link(:to="'/work/' + project.link")
        img(:src="project.image", alt="")
    .card-meta
      nuxt-link(:to="'/work/' + project.link").client
        | {{project.name}}
      br
      nuxt-link(:to="'/work/' + project.link").title
        | {{project.title}}

</template>
<script>
export default {
  props: ['project'],
  methods: {
    handleCardHover (e) {
      e.preventDefault()
      this.$emit('on-card-hover', this)
    },
    handleCardLeave (e) {
      e.preventDefault()
      this.$emit('on-card-leave', this)
    }
  }
}
</script>
<style lang="scss">
$screen-medium:  768px;

.project-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;

  .card-image {
    width: 100%;
    position: relative;
    max-height: 356px;
    overflow: hidden;

    a {
      position: relative;
      min-height: 223px;
      display: block;
    }

    img {
      height: 100%;
      width: auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .card-meta {
    display: block;
    width: 100%;
    padding: 10px 10px 0 10px;

    a {
      color: rgba(0,0,0,0.87);
      text-decoration: none;
    }

    @media screen and (max-width: $screen-medium) {
      padding-top: 10px;
      max-width: 396px;
      padding-left: 0;
    }

    .client {
      font-family: "Lato-Regular";
      font-size: 14px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }

    .title {
      font-family: 'PlayfairDisplay-Regular';
      font-size: 24px;
      letter-spacing: 2px;
    }
  }
}
</style>
