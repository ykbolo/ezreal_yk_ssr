<template>
  <div>
    <div v-for="item in children">
      <a-tree-node :key="item.path" :title="item.name"> </a-tree-node>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'a-tree-node-component',
    props: {
      children: {
        type: Array,
        default: []
      }
    }
  }
</script>
