<template>
<div>
  <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
  >

    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/Goods">
      <i class="el-icon-document"></i>
      <span slot="title">商品管理</span>
    </el-menu-item>
    <el-menu-item index="/Parms">
      <i class="el-icon-setting"></i>
      <span slot="title">规格参数</span>
    </el-menu-item>
    <el-menu-item index="/Advert">
      <i class="el-icon-setting"></i>
      <span slot="title">广告分类</span>
    </el-menu-item>
    <el-submenu index="/Order">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Order/OrderList">
          <i class="el-icon-setting"></i>
          <span slot="title">订单列表</span>
        </el-menu-item>
        <el-menu-item index="/Order/OrderOut">
          <i class="el-icon-setting"></i>
          <span slot="title">退货管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
export default {
  name: "Mymenu",
  props:["isCollapse"],
}
</script>

<style scoped>
.el-menu{
  border-right: 0;
}
.el-menu .is-active{
  background: #054476 !important;
  color: #fff !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse){
  width: 200px;
  minheight: 400vh;
}

</style>