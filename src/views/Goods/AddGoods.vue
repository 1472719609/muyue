<template>
<div class="add-goods">
  <div class="title">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item >添加商品</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="form-goods">
    <el-form :model="GoodForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类目选择" prop="category">
        <el-button type="primary">类目选择</el-button>
      </el-form-item>

      <el-form-item label="商品名称" prop="name">
        <el-input v-model="GoodForm.name"></el-input>
      </el-form-item>


      <el-form-item label="商品价格" prop="price">
        <el-input v-model="GoodForm.price"></el-input>
      </el-form-item>

      <el-form-item label="商品数量" prop="num">
        <el-input v-model="GoodForm.num"></el-input>
      </el-form-item>

      <el-form-item label="发布时间" required>
        <el-col :span="11">
          <el-form-item prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="GoodForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="GoodForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="GoodForm.sellPoint"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="image">
        <el-button type="primary">上传图片</el-button>
      </el-form-item>

      <el-form-item label="商品描述" prop="descs">
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</div>
</template>

<script>
export default {
  name: "AddGoods",
  data() {
    return {
      GoodForm: {
        name: '', //商品名称
        price: '', //商品价格
        num: '',  //商品数量
        sellPoint: '',//商品卖点
        image: '', //商品图片
        delivery: false,
        descs: "", //商品描述
        category: '', //商品类目
        date1:"",//商品上架时间
        date2:"",//商品下架时间
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.add-goods {
  margin: 20px;
}
.title{
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  margin-bottom: 10px;
}
.form-goods{
  background-color: #fff;
  padding: 10px;
  padding-right: 30px;
}
</style>