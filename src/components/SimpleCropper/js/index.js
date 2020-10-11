import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

export default {
  name: 'v-simple-cropper',
  props: {
    initParam: Object,
    successCallback: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      cropper: {},
      filename: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化裁剪插件
    init () {
      let cropperImg = this.$refs['cropperImg']
      this.cropper = new Cropper(cropperImg, {
        aspectRatio:1/1,
        dragMode: 'move'
      })
    },
    // 点击上传按钮
    upload () {
      this.$refs['file'].click()
    },
    // 选择上传文件
    uploadChange (e) {
      let file = e.target.files[0]
      this.filename = file['name']
      let URL = window.URL || window.webkitURL
      this.$refs['layer'].style.display = 'block'
      this.cropper.replace(URL.createObjectURL(file))
    },
    // 取消上传
    cancelHandle () {
      this.cropper.reset()
      this.$refs['layer'].style.display = 'none'
      this.$refs['file'].value = ''
    },
    // 确定上传
    confirmHandle () {
      this.$toast.loading("正在上传")
      let cropBox = this.cropper.getCropBoxData()
      let scale = this.initParam['scale'] || 1
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: cropBox.width * scale,
        height: cropBox.height * scale
      })
      let imgData = cropCanvas.toDataURL('image/jpeg')
      let formData = new window.FormData()
      formData.append('fileType', this.initParam['fileType'])
      formData.append('img', imgData)
      //formData.append('signId', this.$localStorage('signId'))
      formData.append('originalFilename', this.filename)
      this.$http({
        method: 'post',
        url: '/common/image/upload',
        data: this.$qs.stringify({'imageName':'1907142000d4852896fe0a253b','imageSuffix':'jpg','imageData':imgData.split("data:image/jpeg;base64,")[1]}),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == "ERR_0000") {

              this.$emit('func',res.data.data)
              this.$refs['layer'].style.display = 'none'
            }
          }
        }).catch(e => {

      })
    }
  }
}
