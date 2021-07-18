<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height: 20px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">财务收支</el-breadcrumb-item>
      <el-breadcrumb-item>收款登记</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="24">
      <el-form :model="query" class="setyu">
        <el-col :span="3"><p>销售单编号:</p></el-col>
        <el-col :span="3">
          <el-input v-model="query.soId" style="margin-left: -60px"></el-input
        ></el-col>
        <el-col :span="3" style="margin-left: -60px"><p>客户编号:</p></el-col>
        <el-col :span="3">
          <el-input
            v-model="query.customerCode"
            style="margin-left: -60px"
          ></el-input
        ></el-col>
        <el-col :span="2"><p style="margin-left: -40px">日期范围:</p></el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="margin-left: -58px">
            <el-date-picker
              v-model="query.startDate"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="margin-left: -48px">
            <el-date-picker
              v-model="query.endDate"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="结束日期"
            >
            </el-date-picker></div
        ></el-col>
      </el-form>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="2"><p>付款方式:</p> </el-col>
      <el-col :span="3"
        ><div
          class="grid-content bg-purple"
          clearable
          style="margin-left: -28px"
        >
          <el-select v-model="query.payType" placeholder="请选择付款方式">
            <el-option label="货到付款" value="1"></el-option>
            <el-option label="款到发货" value="2"></el-option>
            <el-option label="预付款到发货" value="3"></el-option>
          </el-select></div
      ></el-col>
      <el-col :span="2"><p>处理状态:</p> </el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple" style="margin-left: -28px">
          <el-select
            v-model="query.status"
            clearable
            placeholder="请选择处理状态"
          >
            <el-option label="新增" value="1"></el-option>
            <el-option label="已入库" value="2"></el-option>
            <el-option label="已付款" value="3"></el-option>
            <el-option label="已了结" value="4"></el-option>
          </el-select></div
      ></el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-button type="success" @click="additemss">查询</el-button>
        </div></el-col
      >
    </el-row>

    <!-- 表格开始 -->
    <el-table :data="storage" style="width: 100%" class="srwwe">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单编号" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.soId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户编号" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.customerCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建用户" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附加费用" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.tipFee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品总价" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单总价格" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.soTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款方式" width="140">
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
      <el-table-column label="处理状态" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.status | filterAdd2
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" v-model="query">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="background-color: rgb(248, 123, 123); color: white"
          >
            收款</el-button
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
      status: "",
      query: {
        soId: "",
        customerCode: "",
        venderCode: "",
        payType: "",
        startDate: "",
        endDate: "",
        status: "",
        payType: "",
      },

      pomain: {
        soId: "",
        type: "",
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
  methods: {
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.getMessage(this.currentPage, this.pageSize);
      this.additemss();
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.getMessage(this.currentPage, this.pageSize);
    },
    getMessage(currentPage) {
      axios
        .get("/cgi/main/sell/somain/show?type=3&page=" + this.currentPage)
        .then((value) => {
          console.log(value.data);
          this.storage = value.data.list;
          this.total = value.data.total;
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
          "/cgi/main/sell/somain/query?" +
            querystring.stringify(this.query) +
            "&page=" +
            this.currentPage
        )
        .then((value) => {
          console.log(value.data);
          this.storage = value.data.list;
          this.total = value.data.total;
        });
    },
    handleEdit(index, row) {
      let n = "";
      if (row.payType == 3 && row.status == 1) {
        n = 2;
      } else {
        n = 1;
      }
      axios
        .post("/cgi/main/finance/receipt?type=" + n + "&soId=" + row.soId)
        .then((value) => {
          this.$message({
            type: "info",
            message: "收款登记成功",
          });
          console.log(value);
          this.storage.splice(index, 1);
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
  background-color: rgb(212, 212, 216);
  border: solid 1px rgb(212, 212, 216);
  color: #000;
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