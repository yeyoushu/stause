<template>
  <div>
         <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">仓管管理</el-breadcrumb-item>
  <el-breadcrumb-item>入库登记</el-breadcrumb-item>
</el-breadcrumb>
    <el-form
      :inline="true"
      :model="pomains"
      class="demo-form-inline"
      size="mini"
    >
      <span style="margin-left: 20px">选择付款方式:</span>
      <el-form-item>
        <el-select
          size="medium"
          v-model="pomains.payType"
          placeholder="请选择付款方式"
          class="lablewidth"
          clearable
        >
          <el-option label="货到付款" value="1"></el-option>
          <el-option label="款到发货" value="2"></el-option>
          <el-option label="预付款到发货" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="info" class="placeres" @click="additemss()"
        ><span>查询</span></el-button
      >
    </el-form>

    <!-- 表格开始 -->
    <el-table :data="storage" style="width: 100%" class="srwwe">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购单编号" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.poId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.venderName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建用户" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附加费用" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.tipFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购产品总价" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购单总价格" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.poTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款方式" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.payType | filterAdd1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低预付款金额" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prePayFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="background-color: rgb(248, 123, 123); color: white"
            >入库</el-button
          >
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
      storage: [],
      cargo_Pay: [], //表格数据
      pageSize: 5,
      total: 0,
      page: "1",
      type: "1",
      currentPage: 1,
      pomains: {
        payType: "",
      },

      pomain: {
        payType: "",
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
    },
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
    getMessage(currentPage) {
   
      axios
        .get("/cgi/main/purchase/pomain/show?type=2&page=" + this.currentPage)
        .then((value) => {
          console.log(value.data.list);
          this.storage = value.data.list;
          this.total=value.data.total
          console.log(this.storage);
          this.currentPage = value.data.pageNum;
        });
    },
    // 查询
    additemss() {
      this.storage = [];
      console.log(this.pomains);
      axios
        .get(
          "/cgi/main/purchase/pomain/show?type=2&page=" +
            this.currentPage +
            "&" +
            querystring.stringify(this.pomains)
        )
        .then((value) => {
          console.log(value.data.list);
          this.storage = value.data.list;
          console.log(this.storage);
            this.total=value.data.total
        });
    },
    handleEdit(index, row) {
      this.pomain.poId = row.poId;
      this.pomain.payType = row.payType;
      axios
        .post("/cgi/main/stock/instock?" + querystring.stringify(this.pomain))
        .then((value) => {
          this.$message({
            type: "info",
            message: "入库成功",
          });
          this.storage.splice(index, 1);
          console.log(value);
          this.getMessage();
        });
    },
  },
  mounted() {
    this.getMessage();
  },
};
</script>
<style scoped>
.srwwe {
  margin-top: 20px;
}
.placeres {
  background-color: #8dd469;
  border: solid 1px #8dd469;
  color: white;
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