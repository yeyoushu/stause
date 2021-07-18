<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height: 20px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>新添采购单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 增加部分开始 -->
    <div class="place">
      <el-button type="info" @click="dialog" class="places"
        ><span>添加采购单</span></el-button
      >
    </div>

    <!-- 增加部分结束 -->
    <!-- 表格开始 -->
    <template>
      <el-table :data="product" style="width: 100%">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购单编号" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.venderCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商名称" width="120">
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
            <span style="margin-left: 10px">{{ scope.row.productTotal }}</span>
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
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditl(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑开始 -->

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
      dialogFormVisible: false,
      showAddress: false,
      product: [],
      add: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: this.getTime(),
        tel: "",
        fax: "",
      },
      froms: {
        currentPage: 1,
        type: 1,
      },
      pageSize: 5,
      total: 0,
      page: "1",
      type: "1",
      currentPage: 1,
      change: {
        venderCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: this.getTime(),
        tel: "",
        fax: "",
      }, //编辑产品
      formLabelWidth: "120px",
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

    //获取采购单
    getMessage(currentPage) {
      this.type = 1;
      axios
        .get("/cgi/main/purchase/pomain/show?type=1&page=" + this.currentPage)
        .then((value) => {
          console.log(value.data);
          this.product = value.data.list;
          this.total = value.data.total;
          this.currentPage = value.data.pageNum;
        });
    },
    //获取所有产品分类
    getMessageAll() {
      axios.get("/cgi/main/purchase/vender/all").then((value) => {
        console.log(value.data);
      });
    },
    // 增加采购单
    dialog() {
      this.$router.replace("/supplierv");
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
    handleEditl(index, row) {
      this.$router.push(
        "/suppliermodify/" + row.poId + "/" + JSON.stringify(row)
      );

      console.log(index, row);
    },
    //删除产品
    handleDelete(index, row) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(index, row);
          axios
            .post("/cgi/main/purchase/pomain/delete?poId=" + row.poId)
            .then((response) => {
              if (response.data.code == 0) {
                alert(response.data.message);
                console.log(response);
              }
              if (response.data.message == "删除成功") {
                alert("删除状态：" + response.data.message);
              }
              if (response.data.message == "删除成功") {
                alert("删除状态：" + response.data.message);
              } else {
                console.log(response.data);
                alert("删除状态：" + "删除失败存在依赖记录");
              }
              this.getMessage();
            })
            .catch((error) => {
              console.log("删除失败的原因：", error);
            });
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改供应商
    // 修改供应商分类
    changes() {
      this.showAddress = false;
      axios
        .post(
          "cgi/main/purchase/vender/update?" +
            querystring.stringify(this.change)
        )
        .then((value) => {
          console.log(value);
          this.getMessage();
        });
    },
    handleEdit(index, row) {
      this.change = {
        venderCode: row.venderCode,
        passWord: row.passWord,
        contactor: row.contactor,
        address: row.address,
        postCode: row.postCode,
        createDate: row.createDate,
        tel: row.tel,
        fax: row.fax,
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
.padin {
  text-align: right;
  margin-top: 10px;
}
.padin li {
  border: solid 1px #ccc;
  padding: 2px 10px;
}
.place {
  margin-left: 12px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-size: 14px;
  margin: 0;
  margin-bottom: 6px;
}
.place .places {
  background-color: #8dd469;
}
.place .places span {
  color: white;
  text-align: center;
  margin-right: 6px;
}
.place:nth-of-type(2) {
  background-color: #fff;
}
.place span {
  font-weight: normal;
  margin-left: 10px;
}
</style>