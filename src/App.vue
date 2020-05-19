<template>
  <div id="app">
    <router-view />
    <Navigation v-if="isAuth"></Navigation>

  </div>
</template>

<script>
import Navigation from './components/Nav'
export default {
  name: 'app',
  components: {
    'Navigation': Navigation
  },
  computed: {
    isAuth: function() {
      return this.$store.getters.getAuthenticated
    }
  }
}
</script>
<style lang="scss">
  nav {
    width: 100vw;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .wrapper {
    margin-bottom: 5rem;
  }
</style>