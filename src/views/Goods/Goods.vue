<template>
<div class="goods">
<!--  1 搜索区域-->
  <div class="header">
    <el-input @change="serchinput" v-model="input" placeholder="请输入商品名称" ></el-input>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-button @click="AddGood()" type="primary" icon="el-icon-plus">添加</el-button>
      <router-link to="/AddGoods" style="color: #ffffff">
        <el-button  type="primary" icon="el-icon-plus">页面添加</el-button>
      </router-link>

  </div>
  <!--  2 列表区域-->
  <div class="wrapper">
    <el-table
        :data="tableData" border

        style="width: 100% " >
      <el-table-column
         type="selection"
         width="55">
      </el-table-column>
      <el-table-column
          prop="id"
          label="商品ID"
          width="100">
      </el-table-column>
      <el-table-column
          prop="title"
          label="商品名称"
          show-overflow-tooltip
          width="100">
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品价格"
          width="100">
      </el-table-column>
      <el-table-column
          prop="category"
          show-overflow-tooltip
          label="规格类目"
          width="100">
      </el-table-column>
      <el-table-column
          prop="num"
          label="商品数量"
          width="100">
      </el-table-column>
      <el-table-column
          prop="image"
          show-overflow-tooltip
          label="商品图片"
          >
      </el-table-column>
      <el-table-column
          prop="sellPoint"
          show-overflow-tooltip
          label="商品买点"
          >
      </el-table-column>
      <el-table-column
          prop="descs"
          show-overflow-tooltip
          label="商品描述"
          >
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <MyPagination :total="total" :pageSize="pageSize" @changePage="changePage" :currentPage="currentPage "/>

  <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
      width="70%"
      >
    <el-form :model="GoodForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类目选择" prop="category">
        <el-button  type="primary" @click="innerVisible=true"><span>{{GoodForm.category}}</span></el-button>
<!--        <span>{{GoodForm.category}}</span>-->
<!--        <el-button v-else type="primary">{{GoodForm.category}}</el-button>-->
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
        <el-button type="primary" @click="innerVisibleImg = true" :class="{hide:hideimg}" >上传图片</el-button>

        <img :src="GoodForm.image" style="height: 200px" alt="">
      </el-form-item>


      <el-form-item label="商品描述" prop="descs">
        <wangedtior @wang_editor="wang_editor"/>
      </el-form-item>



    </el-form>
    <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body>
      <Tree @node-click="node_click"/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="innerVisible = false">取 消</el-button>
    <el-button type="primary" @click="showTreeDate">确 定</el-button>
  </span>
    </el-dialog>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
    //上传图片
    <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body>
      <UploadImg  @success_img="success_img"/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="innerVisibleImg = false">取 消</el-button>
    <el-button type="primary" @click="showImg">确 定</el-button>
  </span>
    </el-dialog>

  </el-dialog>

</div>
</template>
<script>
import UploadImg from "./UploadImg";
import Tree from "./Tree";
import MyPagination from "../../components/MyPagination.vue";
import wangedtior from "./wangedtior";
export default {

  name: "Goods",
  components: {
    MyPagination,
    Tree,
    UploadImg,
    wangedtior
  },
  data(){
    return{
      innerVisibleImg: false,//图片弹窗
      treeData: {},
      GoodForm: {

        name: '', //商品名称
        price: '', //商品价格
        num: '',  //商品数量
        sellPoint: '',//商品卖点
        image: '', //商品图片
        delivery: false,
        cid: '',
        descs: "", //商品描述
        category: '商品类目', //商品类目
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
      },

      currentPage:1,
      input: '',
      tableData:[
      ],
      hideimg:false,
      innerVisible: false,//外弹框
      dialogVisible: false,//外弹框
      total: 10,
      pageSize: 8,
      type: 1,
      list: [],
      imgUrl: '',
    }
  },
  methods:{
    //回显图片
    success_img(val){
      console.log("图片地址",val)
      this.imgUrl = val;
    },
    wang_editor(val){
      console.log("wang_editor",val)
      this.GoodForm.descs = val;
    },
    showImg(){
      this.innerVisibleImg = false;
      this.GoodForm.image = this.imgUrl;
      this.hideimg = true;
    },
    showTreeDate(){
      this.innerVisible = false;
      this.GoodForm.category = this.treeData.name;
      this.GoodForm.cid = this.treeData.id;
    },

    //获取弹窗数据
    node_click(val){
      console.log("tree数据",val);
      this.treeData = val;
    },
    /*
     *弹框
     */
    AddGood(){
      this.dialogVisible = true;
    },
    changePage(num){
      this.currentPage = num;
      // this.getGoods(num);
      if (this.type == 1){
        this.getGoods(num);
      }else {
        console.log("搜索分页截取长度")
        this.tableData = this.list.slice((num-1)*this.pageSize, num*this.pageSize);
      }
    },
    serchinput(value){
      if (!value){
        this.getGoods(1);
        return;
      }
      this.$api.searchGoods({
        search:value
      }).then(res=>{
        console.log("搜索",res.data)
        if (res.data.status==200){
          // console.log(res.data.result.length)
          // this.total = res.data.result.length;
          this.list = res.data.data
          this.currentPage = 1;
          //搜索数据的总条数
          this.total = res.data.data.length;
          this.pageSize = 2
          console.log(res.data)
          this.tableData = res.data.data.slice(0,2);
          // this.tableData = res.data;
          this.type = 2;
        }else{
          this.tableData = [];
          this.total = 0;
          this.pageSize =1
          this.type = 1;
        }
      })
    },


    handleEdit(index, row){
      console.log(index, row);
    },
    handleDelete(index, row){
      console.log(index, row);
    },
    submitForm(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let {title,cid,category,sellPoint,price,num,descs,image}=this.GoodForm;
          console.log("输入信息",this.GoodForm)
          this.$api.addGoods({
            title,cid,category,sellPoint,price,num,descs,image
          }).then(res=>{
          //

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },


    // 获取商品数据
    getGoods(page){
      this.$api.getGoodsList({
        page: page,
      })
          .then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
              console.log(res.data.data);
              this.tableData = res.data.data;
              console.log(res.data.total);
              console.log(res.data.pageSize);
              this.total = res.data.total;
              this.pageSize = res.data.pageSize;
            }else {
              this.$message.error(res.data.error);
            }
          });
    }



  },
  created() {
    this.getGoods(1);
  }
}
</script>

<style scoped>
.goods{
  padding: 20px;
}
.header{
  display: flex;
}
.header button{
  margin-left: 20px;
}
.wrapper{
  marfin:20px 0;
}
.line{
  text-align: center;
}
.hide{
  display: none;
}
</style>