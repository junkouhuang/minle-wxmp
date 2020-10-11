
<template>
  <div class="v-simple-cropper">
    <slot>
      <button @click="upload">上传图片</button>
    </slot>
    <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange">
    <div class="v-cropper-layer" ref="layer">
      <div class="layer-header">
        <button class="cancel" @click="cancelHandle">取消</button>
        <button class="confirm" @click="confirmHandle">裁剪</button>
      </div>
      <img ref="cropperImg">
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>




