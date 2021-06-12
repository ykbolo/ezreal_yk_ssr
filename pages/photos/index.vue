<template>
  <div class="container">
    <div class="directory p-h-20">
      <a-directory-tree multiple default-expand-all @select="onSelect" @expand="onExpand" :treeData="directory.children" :replace-fields="replaceFields">
        <!-- <a-tree-node :key="0 - 0" title="parent 0"></a-tree-node> -->
        <!-- <div v-for="item in directory.children" :key="item.path" :title="item.name">
          <a-tree-node-component :children="item.children"></a-tree-node-component>
        </div> -->
        <!-- <a-tree-node key="0-0" title="parent 0">
          <a-tree-node key="0-0-0" title="leaf 0-0" is-leaf>
            <a-tree-node key="0-0-0-0" title="leaf 0-0-1" is-leaf />
          </a-tree-node>
          <a-tree-node key="0-0-1" title="leaf 0-1" is-leaf />
        </a-tree-node>
        <a-tree-node key="0-1" title="parent 1">
          <a-tree-node key="0-1-0" title="leaf 1-0" is-leaf />
          <a-tree-node key="0-1-1" title="leaf 1-1" is-leaf />
        </a-tree-node> -->
      </a-directory-tree>
    </div>
  </div>
</template>
<script>
  import service from '@/services/index'
  import aTreeNodeComponent from './components/a-tree-node-component'
  export default {
    async asyncData() {
      let res = await service.getPicJson({})
      return {
        directory: res.dir,
        prePath: res.prePath
      }
    },
    data() {
      return {
        replaceFields: {
          key: 'path',
          title: 'name'
        },
        expandedKeys: ['./assets/pics']
      }
    },
    components: {
      [aTreeNodeComponent.name]: aTreeNodeComponent
    },
    mounted() {
      console.log(this.directory, this.prePath)
    },
    methods: {
      onSelect(keys, event) {
        console.log('Trigger Select', keys, event)
      },
      onExpand() {
        console.log('Trigger Expand')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .directory {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    min-width: 200px;
    border-right: 1px solid #e9e9e9;
  }
</style>
