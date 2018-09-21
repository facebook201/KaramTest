<template>
  <div id="app">
    <img src="./assets/logo.png">
    <click-item></click-item>
  </div>
</template>

<script>
import ClickItem from './components/Click';

export default {
  name: 'App',
  components: {
    ClickItem
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
