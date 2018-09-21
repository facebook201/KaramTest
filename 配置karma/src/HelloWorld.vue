<template>
  <div class="sy-con hello">
    <h1>{{ msg }}</h1>  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to vue test'
    };
  }
};
</script>

<style scoped>
.sy-con {
  font-size: 16px;
}
</style>
