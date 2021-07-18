<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">仓管管理</el-breadcrumb-item>
  <el-breadcrumb-item>库存盘点</el-breadcrumb-item>
</el-breadcrumb>
    <!-- 表格开始 -->
    <template>
        <!-- 表格开始 -->
    <el-table :data="product" style="width: 100%">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品编号" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
     
      <el-table-column label="销售价格" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存数量" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.soNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品数量" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量单位" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
       <el-table-column label="创建时间" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品分类编号" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.categoryId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style="background-color: rgb(250, 134, 114); color: white;"
              >盘点</el-button
            >
          </template>
        </el-table-column>
      
     
    </el-table>
    <!-- 表格结束 -->
    <el-dialog title="盘点" :visible="showAddress">
        <el-form :model="change">
          <el-form-item label="产品编号" :label-width="formLabelWidth">
            <el-input v-model="change.productCode" autocomplete="off" placeholder="不能为空"></el-input>
          </el-form-item>
          <el-form-item label="产品原始数量" :label-width="formLabelWidth">
            <el-input v-model="change.originNum" autocomplete="off" placeholder="不能为空"></el-input>
          </el-form-item>
          <el-form-item label="产品变化数量" :label-width="formLabelWidth">
            <el-input v-model="change.num   " autocomplete="off" placeholder="不能为空"></el-input>
          </el-form-item>
          <div class="labels">
              <el-form-item label="请选择变化类型" :label-width="formLabelWidth" >
            <el-select v-model="change.type " placeholder="变化类型">
              <el-option label="损耗" value="损耗"></el-option>
              <el-option label="盘余" value="盘余"></el-option>
            </el-select>
          </el-form-item>
          </div>
          
          <el-form-item label="变化原因" :label-width="formLabelWidth">
            <el-input v-model="change.description " autocomplete="off"></el-input>
          </el-form-item>
          </el-form>
          
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddress = false">取 消</el-button>
          <el-button type="primary" @click="changes">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑结束 -->
    </template>
    <!-- 分页开始 -->
    <div class="padin">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 7, 10]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="100"
      >
      </el-pagination>
    </div>
    <!-- 分页结束 -->
  </div>
</template>
    <!-- 表格结束 -->
<script>
import axios from "axios";
const querystring = require("querystring");
export default {
  data() {
    return {
      dialogFormVisible: false,
      showAddress: false,
      product: [],
       pageSize: 5,
      total: 0,
      page: "1",
      currentPage: 1,
      change: {
        productCode: "",
        originNum: "",
        num: "",
        type: "",
        description: "",

      }, //编辑产品
      formLabelWidth: "120px",
       
    };
  },
  methods: {
        handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.getMessage(this.currentPage, this.pageSize);
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.getMessage(this.currentPage, this.pageSize);
    },
      changes() {
      this.showAddress = false;
      axios
        .post(
          "cgi/main/stock/checkstock?" + querystring.stringify(this.change)
        )
        .then((value) => {
          console.log(value);
          this.getMessage()
        });
    }, 
    //获取产品分类
    getMessage(currentPage) {
      axios.get("/cgi/main/stock/query?page=" + this.currentPage).then((value) => {
        console.log(value.data.list);
        this.product = value.data.list;
      this.total = value.data.total;
          this.currentPage = value.data.pageNum;
      });
    },
    //获取所有产品分类
    getMessageAll() {
      axios.get("/cgi/main/sell/product/all").then((value) => {
        console.log(value.data);
      });
    },
    //获取创建时间
    getTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      var day = now.getDay(); //得到周几
      var hour = now.getHours(); //得到小时
      var minu = now.getMinutes(); //得到分钟
      var sec = now.getSeconds(); //得到秒
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      var time = "";
      //精确到天
      time =
        year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
      // return time;
      console.log(time);
      return time;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
   
    //修改产品
 
    handleEdit(index, row) {
      this.change = {
        productCode: row.productCode,
        originNum: row.num,
      
      };
      this.showAddress = true;
      console.log(index, row);
    },
    
  },
  mounted() {
    this.getMessage();
    this.getMessageAll();
     this.getMessage(this.currentPage, this.pageSize);
  },
};
</script>
<style>
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
.padin {text-align: right;margin-top: 10px; }
.padin li {border: solid 1px #ccc; padding: 2px 10px;}
.place {
  margin-left: 12px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-size: 14px;
  margin: 0;
  margin-bottom: 6px;
}
.place .places {background-color: rgb(216, 216, 216); }
.place .places span {color: rgb(63, 62, 62); text-align: center; margin-right: 6px;}
.place:nth-of-type(2) {
  background-color: #fff;
}
.place span {
  font-weight: normal;
  margin-left: 10px;
  
  
}
</style>