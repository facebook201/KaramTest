<template>
  <div>
    <span class="init-num">初始值{{InitNum}}</span>
    <span class="click-num">点击了{{clickNum}}次</span>
    <span class="result-num">最终结果为{{ResultNum}}</span>
    <button @click="add">累加{{AddNum}}</button>
  </div>
</template>

<script>
export default {
  name: 'Click',
  props: {
    AddNum: {
      type: Number,
      default: 1
    },
    InitNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      clickNum: 0,
      ResultNum: 0
    };
  },
  mounted() {
    this.ResultNum = this.InitNum;
  },
  methods: {
    add() {
      this.ResultNum += this.AddNum;
      this.clickNum++;
      this.$emit('result', {
        clickNum: this.clickNum,
        ResultNum: this.ResultNum
      });
    }
  }
};
</script>
