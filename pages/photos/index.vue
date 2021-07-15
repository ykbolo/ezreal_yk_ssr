<template>
  <div class="container">
    <div class="row h-100">
      <div class="directory col-xs-12">
        <a-directory-tree multiple default-expand-all @select="onSelect" @expand="onExpand" :treeData="directory.children" :replace-fields="replaceFields">
        </a-directory-tree>
      </div>
      <div class="p-30 col-xs-12 p-relative" style="min-height: 100px" v-show="imageUrl && !loading">
        <div class="box" v-if="isImage">
          <img :src="imageUrl" alt="" style="object-fit: contain" width="100%" height="100%" @load="onload()" id="img" />
        </div>
      </div>
      <div v-if="isImage && loading" class="spin"><a-spin size="large" /></div>
    </div>
  </div>
</template>
<script>
  import service from '@/services/index'
  import aTreeNodeComponent from './components/a-tree-node-component'
  export default {
    layout: 'blog',
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
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    max-height: 40vh;
    overflow: auto;
  }
  .box {
    position: relative;
    width: 100%;
    height: 90%;
    border: 1px solid #eeeeee;
    .spin {
      display: inline-block;
      width: 100px;
      height: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(50%, 50%);
    }
  }
</style>
