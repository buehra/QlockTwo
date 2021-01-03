<template>
  <div id="app">
    <QlockTwo/>
  </div>
</template>

<script>
import QlockTwo from './components/QlockTwo.vue'

export default {
  name: 'App',
  components: {
    QlockTwo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
  margin-top: 60px;
  font-weight: bold;
  background-color: black;
}
</style>
