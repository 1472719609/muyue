<template>
<div>
  <div class="header">
  <i v-if="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent"></i>
    <i v-else @click="changeMenu" class="iconfont icon-left-indent"></i>
    顶部
  </div>
  <div class="content">
    <router-view/>
  </div>
</div>
</template>

<script>
export default {
  name: "Content",
  props:["isCollapse"],
  methods:{
    changeMenu(){
      this.$emit("changeCollapse")
    }
  }
}
</script>

<style scoped>
.header{
  height: 50px;
  line-height: 50px;
  color:  #fff;
  background-color: skyblue;
}
.iconfont{
  line-height: 50px;
  font-size: 20px;
  color: #fff;
}

</style>