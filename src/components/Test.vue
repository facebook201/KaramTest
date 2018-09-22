<template>
  <div class="test">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    message: String,
    default: ''
  },
  data() {
    return {
      msg: 'Test'
    };
  },
  filters: {
    upperCase(str) {
      return str.toUpperCase();
    }
  },
  methods: {
    setMessage(str) {
      this.msg = str;
    }
  },
  mounted() {
    this.msg = 'hello';
  }
};
</script>
