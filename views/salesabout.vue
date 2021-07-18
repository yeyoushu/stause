<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height: 20px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售单查询</el-breadcrumb-item>
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
          <el-button type="success" @click="query_All">查询</el-button>
        </div></el-col
      >
    </el-row>
    <!-- 表格开始 -->
    <el-table :data="cargo_Pay" style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.soId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户编号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.customerCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="100">
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
      <el-table-column label="付款方式" width="100">
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
      <el-table-column label="处理状态" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.status | filterAdd2
          }}</span>
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
      cargo_Pay: [], //表格数据
      pageSize: 5,
      total: 0,
      page: "1",
      currentPage: 1 /* 分页数据 */,
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
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.query_All(this.currentPage, this.pageSize);
    },
    messag(currentPage) {
      axios
        .get("/cgi/main/sell/somain/query?page=" + this.currentPage)
        .then((value) => {
          console.log(value.data);
          this.cargo_Pay = value.data.list;
          this.total = value.data.total;
        });
    },
    query_All(currentPage) {
      console.log(
        querystring.stringify(this.query) + "&page=" + this.currentPage
      );
      axios
        .get(
          "/cgi/main/sell/somain/query?" +
            querystring.stringify(this.query) +
            "&page=" +
            this.currentPage
        )
        .then((value) => {
          console.log(value.data.list);
          this.cargo_Pay = value.data.list;
          this.total = value.data.total;
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