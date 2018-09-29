<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <tree-com :data="data"></tree-com> -->

    <div class="upload-img">
      <gic-upload-image
        :actionUrl="actionUrl"
        :imageList="imageList"
        :maxImageLength="maxlength"
        @uploadOnSuccess="uploadOnSuccess"
        @deleteImage="deleteImage">
      </gic-upload-image>
    </div>
  </div>
</template>

<script>
// import TreeCom from '@/components/TreeCom';
import GicUploadImage from '@/components/gic-upload-image';

export default {
  name: 'App',
  components: {
    // TreeCom
    GicUploadImage
  },
  data() {
    return {
      actionUrl: 'http://gicdev.demogic.com/api-marketing/upload-game-image',
      dialogVisible: false,
      maxlength: 5,
      dialogImageUrl: '',
      // 保存的图片集合 负责回显和上传
      imageList: [{
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537965482912&di=a6fc96e35e75b37ef01afa6e2dde925b&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F2cf5e0fe9925bc316045679855df8db1cb137091.jpg'
      }, {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537965522381&di=f259f5996e42a9abfac2d0f12798440c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F04%2F20141204221313_uWxYi.jpeg'
      }],
      data: [
        {
          name: 'shiyao',
          age: 24,
          children: [{
            name: 'lisi',
            age: 23,
            children: [{
              name: 'zhaoliu',
              age: 22
            }]
          }]
        }
      ]
    };
  },
  methods: {
    uploadOnSuccess(file) {
      this.imageList.push(file);
    },
    deleteImage(i) {
      this.imageList.splice(i, 1);
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
