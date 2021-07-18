<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">月度报表</el-breadcrumb-item>
  <el-breadcrumb-item>月度采购报表</el-breadcrumb-item>
</el-breadcrumb>
    <el-row>
      <el-col :span="3"
        ><div class="assdd">请选择查询的日期：</div></el-col
      >
      <el-col :span="4" >
         <div class="block">
    <el-date-picker
     v-model="value.time"
       type="month"
            value-format="yyyy-MM"
      placeholder="选择月">
    </el-date-picker>
  </div>
  </el-col>
      <el-col :span="6"
        ><div >
          <el-button type="success" @click="getMessage" class="sssd">查询</el-button>
        </div></el-col
      >
    </el-row>
    <!-- 表格开始 -->
<!-- 上部分表格开始 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label=" 已了结数" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.endtotalnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单总数" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.totalnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购单总金额" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.pototal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已付款金额" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.totalpay }}</span>
        </template>
      </el-table-column>
    </el-table>
    <h1>月度采购报表</h1>
    <el-table :data="tableDataa" style="width: 100%">
      <el-table-column label="用户账号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商编号" width="100">
        <template slot-scope="scope">
        
          <span style="margin-left: 10px">{{ scope.row.venderCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" width="100">
        <template slot-scope="scope">
         
          <span style="margin-left: 10px">{{ scope.row.venderName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">
   
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款方式" width="80">
        <template slot-scope="scope">
      
          <span style="margin-left: 10px">{{ scope.row.payType|filterAdd1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款账号" width="120">
        <template slot-scope="scope">
        
          <span style="margin-left: 10px">{{ scope.row.payUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购单编号" width="100">
        <template slot-scope="scope">
  
          <span style="margin-left: 10px">{{ scope.row.poId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购总价" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.poTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低预付款金额" width="120">
        <template slot-scope="scope">
         
          <span style="margin-left: 10px">{{ scope.row.prePayFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品总价" width="100">
        <template slot-scope="scope">
      
          <span style="margin-left: 10px">{{ scope.row.productTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购单状态" width="100">
        <template slot-scope="scope">
      
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附加费用" width="100">
        <template slot-scope="scope">
       
          <span style="margin-left: 10px">{{ scope.row.tipFee }}</span>
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
        :total="total"
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
    filters: {
    filterAdd1(arr) {
      if (arr == 1) {
        return "货到付款";
      }
      if (arr == 2) {
        return "款到发货";
      }
      if (arr == 3) {
        return "预付款到发货";
      }
    },},
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
          "/cgi/main/report/pomain/main?" + querystring.stringify(this.value)+'&page='+this.currentPage
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