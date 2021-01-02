<template>
  <div id="app">
    <QlockTwo msg="Welcome to Your Vue.js App"/>
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
  color: darkslategrey;
  margin-top: 60px;
  font-weight: bold;
  background-color: black;
}
</style>
