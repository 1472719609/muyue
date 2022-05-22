<template>
<div id="main">
<!--  <p>文本编辑器</p>-->
</div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: "wangedtior",
  data() {
    return {
      editor: ""
    }
  },
  mounted() {
    this.editor = new E('#main')
    this.editor.create()
    this.editor.txt.html('<p>这是wangEditor内容</p>')
    this.editor.config.onchange = newHtml => {
      // console.log("change之后的",newHtml)
      this.$emit('wang_editor',newHtml)
    }
    this.editor.config.onchangeTimeout = 500
    this.editor.config.focus = false
  }

}
</script>

<style scoped>

</style>