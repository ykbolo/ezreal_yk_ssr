import compressImage from './parts/compress-image'
export default {
  name: 'ui-image-upload',
  data() {
    return {
      error: false,
      src: '',
      base64: ''
    }
  },
  props: {
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    backgroundSrc: {
      type: String,
      default: ''
    },
    initSrc: {
      type: String,
      default: ''
    },
    watermark: {
      type: Boolean,
      default: false
    },
    maxsize: {
      type: Number, // 大小限制，单位：字节
      default: 5 * 1024 * 1024
    },
    imageFit: {
      type: String,
      default: 'contain'
    },
    compress: {
      type: Boolean,
      default: false
    },
    compressSize: {
      type: Number,
      default: 2 * 1024 * 1024
    },
    preview: {
      // 可放大预览
      type: Boolean,
      default: false
    },
    remove: {
      // 可删除
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    initSrc: {
      handler() {
        this.src = this.initSrc
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @name 处理变更
     * @param {Object} ev 事件
     */
    handle_change(ev) {
      let file = ev.target.files[0]

      if (file) {
        if (!/\.(png|jpeg|jpg)/i.test(file.name)) {
          this.notifyLimit('format')
          this.$refs.input.value = ''

          return
        }

        if (this.compress) {
          let quality
          // 对于compressSize以上的图片，进行图片压缩
          if (file.size > this.compressSize) {
            quality = 0.6
          }
          compressImage(file, { width: 1024, height: 1500 }, quality).then(res => {
            this.$emit('change', { base64: res, name: file.name })
          })
        } else {
          if (file.size > this.maxsize) {
            this.notifyLimit('size')
            this.$refs.input.value = ''
          } else {
            let fileReader = new FileReader()
            fileReader.onload = () => {
              this.base64 = fileReader.result
              this.$emit('change', { base64: this.base64, name: file.name })
            }
            if (file) {
              fileReader.readAsDataURL(file)
            }
          }
        }
      }
    },
    /**
     * @name 处理图片加载出错
     */
    handle_img_error() {
      this.error = true
    },
    /**
     * @name 处理删除点击
     */
    handle_remove_click() {
      this.reset()

      this.$emit('change', { base64: this.base64, name: '' })
    },
    /**
     * @name 处理预览点击
     */
    handle_preview_click() {
      let src = this.base64 || this.src

      this.$emit('preview', src)
    },

    /**
     * @name 重置
     */
    reset() {
      this.error = false
      this.src = ''
      this.base64 = ''

      this.$refs.input.value = ''
    },
    /**
     * @name 提示限制
     * @param {String} type 类型
     */
    notifyLimit(type) {
      if (type === 'size') {
        let unit
        let n = this.maxsize / (1024 * 1024)
        if (n < 1) {
          n = Math.ceil(n * 1024)
          unit = 'KB'
        } else {
          n = Math.ceil(n)
          unit = 'MB'
        }
      } else if (type === 'format') {
      }
    }
  }
}
