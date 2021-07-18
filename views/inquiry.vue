<template>
  <div>
       <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">仓管管理</el-breadcrumb-item>
  <el-breadcrumb-item>库存查询</el-breadcrumb-item>
</el-breadcrumb>
    <el-row :gutter="24">
      <el-form :model="query" class="setyu">
        <el-col :span="3"><p>产品编号:</p></el-col>
        <el-col :span="3">
          <el-input v-model="query.productCode" style="margin-left: -60px"></el-input
        ></el-col>
        <el-col :span="2"  style="margin-left: -60px"><p>产品名称:</p></el-col>
        <el-col :span="3">
          <el-input
            v-model="query.name"
         
          ></el-input
        ></el-col>
         <el-col :span="2" ><p>库存数量:</p></el-col>
        <el-col :span="4">
          <el-input
            v-model="query.min"
            placeholder="库存数量最小不能为负数"
            
          ></el-input
        ></el-col>
        <el-col :span="4">
          <el-input
            v-model="query.max"
             placeholder="请输入库存数量"
           
          ></el-input
        ></el-col>
       
         <el-col :span="2"
        ><div class="grid-content bg-purple">
          <el-button type="success" @click="query_All">查询</el-button>
        </div></el-col
      >
      </el-form>
    </el-row>
   
    <!-- 表格开始 -->
    <el-table :data="cargo_Pay" style="width: 100%">
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
      
     
    </el-table>
    <!-- 表格结束 -->
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
<script>
import axios from "axios";
const querystring = require("querystring");
export default {
  data() {
    return {
      cargo_Pay: [], //表格数据
      pageSize: 5,
      total: 0,
      page: "1",
      currentPage: 1 /* 分页数据 */,
      query: {
        productCode: "",
        name: "",
        min: "",
        max: "",
      },
    };
  },
  filters: {
    filterAdd1(arr) {
      if (arr == 1) {
        return "货到付款";
      }
      if ((arr = 2)) {
        return "款到发货";
      }
      if (arr == 3) {
        return "预付款到发货";
      }
    },
    filterAdd2(arr) {
      if (arr == 1) {
        return "新增";
      }
      if (arr == 2) {
        return "已收货";
      }
      if (arr == 3) {
        return "已付款";
      }
      if (arr == 4) {
        return "已了结";
      }
      if (arr == 5) {
        return "已预付";
      }
    },
  },
  mounted() {
    this.messag();
  },
  methods: {
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.query_All(this.currentPage, this.pageSize);
      this. query_All()
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.query_All(this.currentPage, this.pageSize);
    },
    messag(currentPage) {
      axios
        .get("/cgi/main/stock/query?page=" + this.currentPage)
        .then((value) => {
          console.log(value.data.list);
          this.cargo_Pay = value.data.list;
        });
    },
    query_All(currentPage) {
      console.log(
        querystring.stringify(this.query) + "&page=" + this.currentPage
      );
      axios
        .get(
          "/cgi/main/stock/query?" +
            querystring.stringify(this.query) +
            "&page=" +
            this.currentPage
        )
        .then((value) => {
          console.log(value.data.list);
          this.cargo_Pay = value.data.list;
        });
    },
  },
};
</script>
<style scopd>
.el-row {
  margin-bottom: 20px;
}
.last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  background-color: #f9fafc;
}
.setyu p {
  line-height: 10px;
}
.padin {
  text-align: right;
  margin-top: 10px;
}
.padin li {
  border: solid 1px #ccc;
  padding: 2px 10px;
}
</style>