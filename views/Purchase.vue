<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height: 20px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购单了结</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-row :gutter="24">
        <el-form :model="query" class="setyu">
          <el-col :span="3"><p>采购单编号:</p></el-col>
          <el-col :span="3">
            <el-input v-model="query.poId" style="margin-left: -60px"></el-input
          ></el-col>
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <el-button type="success" @click="query_All">查询</el-button>
            </div></el-col
          >
        </el-form>
      </el-row>
      <!-- 货到付款开始 -->
      <el-tab-pane label="货到付款" name="first">
        <el-table :data="product" style="width: 100%">
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单编号" width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.poId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="160">
            <template slot-scope="scope">
         
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.venderName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建用户" width="100">
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
       
              <span style="margin-left: 10px">{{
                scope.row.productTotal
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总价格" width="110">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.row.poTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" width="120">
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
       
              <span style="margin-left: 10px">{{ scope.row.prePayFee }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                style="background-color: rgb(248, 123, 123); color: white"
                >了结</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="款到发货" name="second" @click="messagech()">
        <el-table :data="productch" style="width: 100%">
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单编号" width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.poId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="160">
            <template slot-scope="scope">
 
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.venderName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建用户" width="100">
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
   
              <span style="margin-left: 10px">{{
                scope.row.productTotal
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总价格" width="110">
            <template slot-scope="scope">

              <span style="margin-left: 10px">{{ scope.row.poTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" width="120">
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
 
              <span style="margin-left: 10px">{{ scope.row.prePayFee }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                style="background-color: rgb(248, 123, 123); color: white"
                >了结</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="预付款到发货" name="third">
        <el-table :data="productce" style="width: 100%">
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单编号" width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.poId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.venderName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建用户" width="100">
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
              <span style="margin-left: 10px">{{
                scope.row.productTotal
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购单总价格" width="110">
            <template slot-scope="scope">
              <i class="el-icon-edit-outline"></i>
              <span style="margin-left: 10px">{{ scope.row.poTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" width="120">
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
              <span style="margin-left: 10px">{{ scope.row.prePayFee }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                style="background-color: rgb(248, 123, 123); color: white"
                >了结</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
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
    </el-tabs>
  </div>
</template>
<script>
import axios from "axios";
const querystring = require("querystring");
export default {
  data() {
    return {
      product: [],
      productch: [],
      productce: [],
      pageSize: 5,
      total: 0,
      page: "1",
      currentPage: 1,
      activeName: "first",
      query: {
        poId: "",
      },
      pomain: {
        poId: "",
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
    //  this.query_All();
    this.message();
    this.messagech();
    this.messagece();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.message(this.currentPage, this.pageSize);
      this.messagech(this.currentPage, this.pageSize);
      this.messagece(this.currentPage, this.pageSize);
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.query_All(this.currentPage, this.pageSize);
    },
    handleEdit(index, row) {
      this.pomain.poId = row.poId;
      this.pomain.payType = row.payType;
      axios
        .post(
          "/cgi/main/purchase/pomain/end?" + querystring.stringify(this.pomain)
        )
        .then((value) => {
          this.$message({
            type: "info",
            message: "了结成功",
          });
          console.log(value);
          this.message();
        });
    },
    message(currentPage) {
      axios
        .get(
          "/cgi/main/purchase/pomain/show?&page=" +
            this.currentPage +
            "&type=4" +
            "&payType=1"
        )
        .then((value) => {
          console.log(value.data.list);
          this.product = value.data.list;
          this.total = value.data.total;
        });
    },
    messagech(currentPage) {
      axios
        .get(
          "/cgi/main/purchase/pomain/show?&page=" +
            this.currentPage +
            "&type=4" +
            "&payType=2"
        )
        .then((value) => {
          console.log(value.data.list);
          this.productch = value.data.list;
          this.total = value.data.total;
        });
    },
    messagece(currentPage) {
      axios
        .get(
          "/cgi/main/purchase/pomain/show?&page=" +
            this.currentPage +
            "&type=4" +
            "&payType=3"
        )
        .then((value) => {
          console.log(value.data.total);
          this.productce = value.data.list;
          this.total = value.data.total;
        });
    },
    query_All(currentPage) {
      this.product = [];
      console.log(
        querystring.stringify(this.query) + "&page=" + this.currentPage
      );
      axios
        .get(
          "/cgi/main/purchase/pomain/query?" +
            querystring.stringify(this.query) +
            "&page=" +
            this.currentPage
        )
        .then((value) => {
          console.log(value.data);
          this.product = value.data.list;
          this.total = value.data.total;
        });
    },
  },
};
</script>
<style scoped>
.padin {
  text-align: right;
  margin-top: 10px;
}

.padin li {
  border: solid 1px #ccc;
  padding: 2px 10px;
}
</style>