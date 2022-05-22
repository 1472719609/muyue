<template>
<div>
  <el-tree
      :props="props"
      :load="loadNode"
      lazy
      accordion
      show-checkbox
      @node-click="NodeClick"
  >
  </el-tree>
</div>
</template>

<script>
export default {
  name: "Tree",
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
    };
  },
  methods: {
    NodeClick(data,node){
      this.$emit('node-click',data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getGoods().then(res=>{
          console.log(res.data)
          return resolve(res.data.result);
        })
      }
      if (node.level >= 1) {
        this.$api.getGoods({id: node.data.cid}).then(res=>{
          if (res.data.status == 200){
            return resolve(res.data.result);
          }else{
            return resolve([]);
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>