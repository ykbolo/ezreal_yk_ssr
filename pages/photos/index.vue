<template>
  <div class="container">
    <div class="row h-100">
      <div class="directory col-3">
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
      <div class="col-9 p-30">
        <div class="box" v-if="isImage">
          <img :src="imageUrl" alt="" style="object-fit: contain" width="100%" height="100%" @load="onload()" id="img" v-show="imageUrl && !loading" />
          <div v-if="loading" class="spin"><a-spin size="large" /></div>
        </div>
      </div>
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
        expandedKeys: ['./assets/pics'],
        loading: false,
        imageUrl: '',
        isImage: false
      }
    },
    components: {
      [aTreeNodeComponent.name]: aTreeNodeComponent
    },
    mounted() {
      console.log(this.directory, this.prePath)
    },

    methods: {
      onload() {
        this.loading = false
        console.log('正在加载')
      },
      onSelect(keys, event) {
        this.imageUrl = ''
        this.loading = true
        console.log('Trigger Select', keys, event)
        if (keys && keys.length) {
          this.isImage = /\.(png|jpg|gif|jpeg|webp)$/.test(keys[0])
          this.imageUrl = keys[0].replace('./assets', this.prePath + '/assets')
        }
      },
      onExpand() {
        console.log('Trigger Expand')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .directory {
    // position: fixed;
    // left: 0;
    // top: 0;
    // bottom: 0;
    // min-width: 200px;
    min-height: 100vh;
    border-right: 1px solid #e9e9e9;
  }
  .box {
    position: relative;
    width: 100%;
    height: 90%;
    border: 1px solid #eeeeee;
    .spin {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(50%, 50%);
    }
  }
</style>
