<template>
<div>
  <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-success="successImg"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

  </el-upload>
</div>
</template>

<script>
import base from "../../api/base";
export default {
  name: "UploadImg",
  data() {
    return {
      url: base.upload,
      fileList: []
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    successImg(response, file, fileList) {
      console.log("上传成功", response, file, fileList);
      this.$message({
        message: "上传成功",
        type: "success"
      });
      console.log(response.url.length);
      let img = base.host+"/"+response.url.slice(7);
      //遍历所有的response.url，把所有的图片地址拼接成一个字符串
      console.log(response);
      // for (var i = 0; i < response.url.length; i++) {
      //   var img = base.host + "/" + response.url.slice(7);
      //   // this.$emit("success_img", img);
      // }
      this.$emit("success_img",img);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
    },


}
</script>

<style scoped>
.hide{
  display: none;
}
</style>