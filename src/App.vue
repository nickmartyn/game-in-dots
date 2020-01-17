<template>
  <div id="app">
    <h1 class="is-size-1">Game In Dots</h1>
      <Game />
  </div>
</template>

<script>
import Game from './components/Game.vue';

export default {
  name: 'app',
  components: {
    Game,
  },
};
</script>

<style lang="scss">
#app {
  text-align: center;
}
</style>
