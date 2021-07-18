<template>
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">月度报表</el-breadcrumb-item>
  <el-breadcrumb-item>月度出库报表</el-breadcrumb-item>
</el-breadcrumb>
    <el-row>
      <el-col :span="3"
        ><div class="assdd">请选择查询的日期：</div></el-col
      >
      <el-col :span="4"
        ><div >
          <el-date-picker
     v-model="value.time"
       type="month"
            value-format="yyyy-MM"
      placeholder="选择月">
    </el-date-picker></div
      ></el-col>
      <el-col :span="6"
        ><div >
          <el-button type="success" @click="getMessage" class="sssd">查询</el-button>
        </div></el-col
      >
    </el-row>
    <!-- 表格开始 -->
    <!-- 上部分表格开始 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="出库单据数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品总数量" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.totalNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品总金额" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productTotal }}</span>
        </template>
      </el-table-column>
    </el-table>
    <h1>月度出库报表</h1>
    <el-table :data="tableDataa" style="width: 100%">
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单编号" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.soId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品编号" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productCode  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stockTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品总价" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出库单据数" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stockNum }}</span>
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
         pageSize: 5,
      total: 0,
      page: "1",
      currentPage: 1,/* 分页数据 */
      tableData: [],
      tableDataa: [],
      value: {
        time: "",
      },
    };
  },
   filters:{
      filterAdd1(arr){
          if (arr==1) {
              return "货到付款"
          }
          if (arr=2) {
              return "款到发货"
          }
          if (arr==3) {
              return "预付款到发货"
          }
      },
      filterAdd2(arr){
        if (arr==1) {
              return "新增"
          }
        if (arr==2) {
              return "已收货"
          }
        if (arr==3) {
              return "已付款"
          }
        if (arr==4) {
              return "已了结"
          }
        if (arr==5) {
              return "已预付"
          }
      }
  },
  methods: {
       handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
     this.getMessage(this.currentPage, this.pageSize);
       this.tableData= []
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.getMessage(this.currentPage, this.pageSize);
    },
    getMessage() {
          this.tableData= []
      axios
        .get(
          "/cgi/main/report/outstock/main?" + querystring.stringify(this.value)+'&page='+this.currentPage
        )
        .then((value) => {
          console.log(value.data);
          this.tableData.push(value.data)
           this.tableDataa=value.data.details.list;
          console.log( this.tableData);
        });
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #fff;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #fff;
}
.sssd{margin-left: 20px;}
.assdd{margin-top: 10px;}
.padin {text-align: right;margin-top: 10px; }
.padin li {border: solid 1px #ccc; padding: 2px 10px;}
</style>