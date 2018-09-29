<template>
  <div class="tree-com">
    {{msg}}
    <tree-com v-if="sublist && sublist.length" :data="sublist"></tree-com>
  </div>
</template>

<script>
export default {
  name: 'TreeCom',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      msg: 'treecom',
      sublist: []
    };
  },
  methods: {
    getListData(item) {
      if (item.children && item.children.length) {
        this.sublist = item.children;
      }
    }
  },
  mounted() {
    this.getListData(this.data[0]);
  }
};
</script>

<style scoped>

</style>
