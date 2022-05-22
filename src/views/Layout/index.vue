<template>
<div class="layout">
<!--  左侧导航-->
  <Mymenu class="menu" :isCollapse="isCollapse"/>
<!--  右侧导航-->
  <Content class="content" :class="{isActive:isCollapse}" @changeCollapse="changeCollapse" :isCollapse="isCollapse"/>
</div>
</template>

<script>
import Mymenu from "./Mymenu";
import Content from "./Content";
export default {
  components: {
    Mymenu,
    Content
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods:{
    changeCollapse(){
      this.isCollapse = !this.isCollapse;
    }
  },
  name: "index"
}
</script>

<style  scoped>
.layout{
  display: flex;
  }
.menu{
  /*width: 200px;*/
  min-height: 500px;
  background-color: #666;
  position: fixed;
  top: 0;
  bottom: 0;
  }
  .content{
    width: 100%;
    transition: all 0.7s;
    margin-left: 200px;
  }
  .isActive{
    margin-left: 64px;
    transition: all 0.3s;
  }

</style>