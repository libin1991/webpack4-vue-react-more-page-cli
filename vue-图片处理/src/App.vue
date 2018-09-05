<template>
<a-layout>
  <a-layout-header class="header">
    <span>IMG FILTER</span>
    <a class="link" href="https://github.com/xrr2016/vue-img-filter" target="_blank"><a-icon type="github" /></a>
  </a-layout-header>
  <a-layout-content class="content">
    <a-col :span="11" class="content-left">
      <div class="spin-container" v-if="isLoadingImg">
        <a-spin>
          <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        </a-spin>
      </div>

      <div class="img-holder">
        <img  class="filter-image" ref="img" :style="{ filter: `blur(${filter.blur}px) brightness(${filter.brightness}) contrast(${filter.contrast}%) grayscale(${filter.grayscale}%) hue-rotate(${filter.hueRotate}deg) invert(${filter.invert}%) opacity(${filter.opacity}%) saturate(${filter.saturate}%) sepia(${filter.sepia}%) drop-shadow(${filter.offsetX}px ${filter.offsetY}px ${filter.blurRadius}px ${filter.color})`}">
      </div>

      <a-textarea class="filter-text" :rows="4" :value="filterStr" />
      <a-col :span="24" class="filter-buttons">
        <a-button-group>
          <a-button type="default" icon="upload" @click="upload">上传</a-button>
          <a-button type="primary" icon="download" @click="download">下载</a-button>
          <a-button type="danger" icon="sync" @click="reset">重置</a-button>
        </a-button-group>
      </a-col>
    </a-col>
    <a-col :span="11">
      <a-form class="filter-form">
        <a-form-item label='模糊' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="20" :step="0.1" v-model="filter.blur" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="20" :step="0.1" v-model="filter.blur" />
          </a-col>
        </a-form-item>
        <a-form-item label='亮度' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="1" :step="0.1" v-model="filter.brightness" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="1" :step="0.1" v-model="filter.brightness" />
          </a-col>
        </a-form-item>
        <a-form-item label='对比度' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="1000" :step="1" v-model="filter.contrast" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="1000" :step="1" v-model="filter.contrast" />
          </a-col>
        </a-form-item>
        <a-form-item label='灰度' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="100" :step="1" v-model="filter.grayscale" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="100" :step="1" v-model="filter.grayscale" />
          </a-col>
        </a-form-item>

        <a-form-item label='色相旋转' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="360" :step="1" v-model="filter.hueRotate" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="360" :step="1" v-model="filter.hueRotate" />
          </a-col>
        </a-form-item>

        <a-form-item label='反转' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="100" :step="1" v-model="filter.invert" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="100" :step="1" v-model="filter.invert" />
          </a-col>
        </a-form-item>

        <a-form-item label='透明度' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="100" :step="1" v-model="filter.opacity" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="100" :step="1" v-model="filter.opacity" />
          </a-col>
        </a-form-item>

        <a-form-item label='饱和度' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="100" :step="1" v-model="filter.saturate" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="100" :step="1" v-model="filter.saturate" />
          </a-col>
        </a-form-item>

        <a-form-item label='深褐色' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :min="0" :max="100" :step="1" v-model="filter.sepia" />
          </a-col>
          <a-col :span="4">
            <a-input-number :min="0" :max="100" :step="1" v-model="filter.sepia" />
          </a-col>
        </a-form-item>
        <a-form-item label='阴影效果' :colon="false" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" />
        <a-form-item label='水平偏移' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :defaultValue="0" :min="-100" :max="100" :step="1" v-model="filter.offsetX" />
          </a-col>
          <a-col :span="4">
            <a-input-number :defaultValue="0" :min="-100" :max="100" :step="1" v-model="filter.offsetX" />
          </a-col>
        </a-form-item>
        <a-form-item label='垂直偏移' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :defaultValue="0" :min="-100" :max="100" :step="1" v-model="filter.offsetY" />
          </a-col>
          <a-col :span="4">
            <a-input-number :defaultValue="0" :min="-100" :max="100" :step="1" v-model="filter.offsetY" />
          </a-col>
        </a-form-item>
        <a-form-item label='模糊半径' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <a-col class="m-r-12px" :span="19">
            <a-slider :defaultValue="0" :min="0" :max="100" :step="1" v-model="filter.blurRadius" />
          </a-col>
          <a-col :span="4">
            <a-input-number :defaultValue="0" :min="0" :max="100" :step="1" v-model="filter.blurRadius" />
          </a-col>
        </a-form-item>
        <a-form-item label='阴影颜色' :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
          <chrome-picker :value="filter.color" @input="updateFilterColor" />
        </a-form-item>
      </a-form>
    </a-col>
  </a-layout-content>
</a-layout>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'app',
  components: {
    'chrome-picker': Chrome
  },
  data() {
    return {
      quality: 1,
      isLoadingImg: false,
      imgName: '',
      filter: {
        blur: 0,
        brightness: 1,
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0,
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: '#000000'
      }
    }
  },
  computed: {
    filterStr() {
      return `.filter-image { 
        filter: blur(${this.filter.blur}px) brightness(${this.filter.brightness}) contrast(${
        this.filter.contrast
      }%) grayscale(${this.filter.grayscale}%) hue-rotate(${this.filter.hueRotate}deg) 
      invert(${this.filter.invert}%) opacity(${this.filter.opacity}%) saturate(${
        this.filter.saturate
      }%) sepia(${this.filter.sepia}%) drop-shadow(${this.filter.offsetX}px ${
        this.filter.offsetY
      }px ${this.filter.blurRadius}px ${this.filter.color}); 
    }`
    }
  },
  methods: {
    upload(info) {
      const self = this
      const filterImg = this.$refs.img
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = false
      input.accept = '.png, .jpg, .jpeg'
      input.addEventListener('abort', () => (this.isLoadingImg = false))
      input.addEventListener(
        'change',
        function(event) {
          self.isLoadingImg = true
          const file = this.files[0]
          const imgSrc = window.URL.createObjectURL(file)
          self.imgName = file.name

          filterImg.src = imgSrc
          filterImg.addEventListener('load', function() {
            self.isLoadingImg = false
            window.URL.revokeObjectURL(this.src)
          })
        },
        false
      )
      input.click()
    },
    updateFilterColor(event) {
      this.filter.color = event.hex8
    },
    reset() {
      this.filter = {
        blur: 0,
        brightness: 1,
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0,
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        spreadRadius: 0,
        color: '#000000'
      }
    },
    download() {
      if (!this.imgName) {
        return
      }

      const maxWidth = 1080
      const maxHeight = 960

      let targetWidth = 0
      let targetHeight = 0

      const filterImg = this.$refs.img
      const { naturalWidth, naturalHeight } = filterImg
      const canvas = document.createElement('canvas')

      if (naturalWidth >= maxWidth || naturalHeight >= maxHeight) {
        if (naturalWidth / naturalHeight > maxWidth / maxHeight) {
          targetWidth = maxWidth
          targetHeight = Math.round(maxWidth * (naturalHeight / naturalWidth))
        } else {
          targetHeight = maxHeight
          targetWidth = Math.round(maxHeight * (naturalWidth / naturalHeight))
        }
      }

      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext('2d')

      const filterStr = `blur(${this.filter.blur}px) brightness(${
        this.filter.brightness
      }) contrast(${this.filter.contrast}%) grayscale(${this.filter.grayscale}%) hue-rotate(${
        this.filter.hueRotate
      }deg) 
      invert(${this.filter.invert}%) opacity(${this.filter.opacity}%) saturate(${
        this.filter.saturate
      }%) sepia(${this.filter.sepia}%) drop-shadow(${this.filter.offsetX}px ${
        this.filter.offsetY
      }px ${this.filter.blurRadius}px ${this.filter.color})
    `
      ctx.filter = filterStr.trim()
      ctx.drawImage(this.$refs.img, 0, 0, canvas.width, canvas.height)

      const link = document.createElement('a')
      link.href = canvas.toDataURL('', this.quality)
      link.download = this.imgName
      link.click()
    }
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  height: 40px;
}

.link {
  color: #fff;
}

.content {
  min-height: calc(100vh - 40px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.spin-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.15);
}

.img-holder {
  width: 100%;
  min-height: 400px;
  border: 1px solid #eee;
  line-height: 0;
  margin: 24px;
  margin-top: 12px;
  background-color: #fff;
}

.filter-image {
  width: 100%;
  max-height: 640px;
  border-radius: 4px;
  border: none;
}

.filter-text {
  width: 100%;
  margin: 24px;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-form {
  margin: 12px;
  padding: 12px;
  background-color: #fff;
}

.ant-form-item {
  margin-bottom: 4px;
}

.m-r-12px {
  margin-right: 12px;
}
</style>
