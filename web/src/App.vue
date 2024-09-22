<template>
  <GraphVisualisation/>
</template>

<script>
import GraphVisualisation from './components/GraphVisualisation.vue';

export default {
  name: 'App',
  components: {
    GraphVisualisation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 90vh;
  width: 90vw;
}
</style>
