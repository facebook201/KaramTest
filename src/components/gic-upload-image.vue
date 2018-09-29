<template>
  <div class="gic-upload__img">
    <!-- 上传成功的图片展示 -->
    <div class="img-content"
        v-for="(item, index) in imageList"
        :key="index">
        <img class="item-img" :src="item.url">
        <!-- 预览和删除按钮 -->
        <div class="upload-icon__btn">
          <i class="el-icon-view" @click="previewImage(index)"></i>
          <i class="el-icon-delete" @click="deleteImage(index)"></i>
        </div>
    </div>
    <!-- 上传进度条 -->
    <div class="img-content img-progress" v-if="!pass && progress !== 0">
      <el-progress type="circle" :percentage="progress" :status="propStatus"></el-progress>
    </div>
    <!-- 图片上传部分 -->
    <div class="img-upload" v-if="imageList && imageList.length < maxImageLength">
      <el-upload
        class="loader"
        accept="image/*"
        :action="action"
        list-type="picture-card"
        :on-change="uploadOnChange"
        :on-success="uploadOnSuccess"
        :on-error="uploadOnError"
        :on-progress="uploadOnProgress">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

    <el-dialog
      title="图片预览"
      :visible.sync="isEnlargeImage"
      :modal-append-to-body="false"
      width="800px">
      <el-carousel trigger="click" :initial-index="initialImg" height="500px">
        <el-carousel-item v-for="(img, index) in imageList" :key="index">
          <img @click="isEnlargeImage = false" style="width: 100%" height="500px" :src="img.url">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
</div>
</template>

<script>
/**
  放大预览
  删除
  添加到循环里面
  开始上传 上传失败 上传成功三个步骤
 */

export default {
  name: 'GicUploadImg',
  props: {
    // 上传地址
    actionUrl: {
      type: String,
      default: ''
    },
    // 图片限制 不能超过 超过隐藏上传按钮
    maxImageLength: {
      type: Number,
      default: 5
    },
    imageList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  beforeMount() {
    this.action = this.actionUrl;
  },
  data() {
    return {
      initialImg: 0, // 初始索引
      progress: 0, // 上传进度
      pass: null, // 是否上传成功
      isEnlargeImage: false, // 放大图片
      enlargeImage: '' // 放大的图片的地址
    };
  },
  computed: {
    propStatus() {
      if (this.pass) {
        return 'success';
      } else if (this.pass === false) {
        return 'exception';
      } else {
        return '';
      }
    }
  },
  methods: {
    // 上传成功
    uploadOnSuccess(res, file) {
      this.pass = true;
      this.$message.success('上传成功');
      this.$emit('uploadOnSuccess', file);
    },
    // 开始上传
    uploadOnProgress(e, file) {
      this.progress = Math.floor(e.percent);
    },
    uploadOnChange(file) {
      if (file.status === 'ready') {
        this.pass = null;
        this.progress = 0;
      } else if (file.status === 'fail') {
        this.$message.error('图片上传失败，请重试！');
      }
    },
    uploadOnError() {

    },
    // 预览图片
    previewImage(i) {
      this.initialImg = i;
      this.isEnlargeImage = true;
    },
    // 删除图片
    deleteImage(i) {
      this.$emit('deleteImage', i);
      // this.imageList.splice(i, 1);
    }
  }
};
</script>

<style>
.gic-upload__img {
  display: inline-block;
}
.gic-upload__img .img-content {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  width: 160px;
  height: 140px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
}
.gic-upload__img .img-content .upload-icon__btn{
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.gic-upload__img .img-content .item-img {
  display: block;
  margin: 10px;
  height: 120px;
  width: 140px;
}

.gic-upload__img .img-content:hover::after{
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  content: '';
  display: block;
  height: 120px;
  width: 140px;
  background-color: rgba(0, 0, 0, .5);
}
.gic-upload__img .img-content:hover .upload-icon__btn{
  display: block;
  z-index: 100;
  color: #fff;
}
.gic-upload__img .img-upload{
  display: inline-block;
  vertical-align: middle;
}
.el-upload-list--picture-card{
  display: none;
}
</style>
