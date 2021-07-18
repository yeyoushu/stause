<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">财务收支</el-breadcrumb-item>
  <el-breadcrumb-item>收支查询</el-breadcrumb-item>
</el-breadcrumb>
    <el-row :gutter="24">
      <el-form :model="query" class="setyu">
       <el-col :span="2"
          ><p>收支类型:</p>
        </el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple"  clearable >
            <el-select v-model="query.type" clearable  placeholder="请选择收支类型">
              <el-option label="支出" value="支出"></el-option>
              <el-option label="收入" value="收入"></el-option>
            </el-select></div
        ></el-col>
             
        <el-col :span="3"
          ><p >日期范围:</p></el-col>
        <el-col :span="4"
          >
          <div class="grid-content bg-purple" style=" margin-left: -58px;">
            <el-date-picker
              v-model="query.startDate"
               value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple" style=" margin-left: -48px;">
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
          <el-col :span="3"
          ><p>单据付款方式:</p>
        </el-col>
        <el-col :span="3"
          ><div class="grid-content bg-purple"  clearable style=" margin-left: -28px;">
            <el-select v-model="query.payType" placeholder="选择单据付款方式">
              <el-option label="货到付款" value="1"></el-option>
              <el-option label="款到发货" value="2"></el-option>
              <el-option label="预付款到发货" value="3"></el-option>
            </el-select></div
        ></el-col>
            <el-col :span="3" ><p>相关单据号:</p></el-col>
        <el-col :span="3"
          >
            <el-input v-model="query.no" style=" margin-left: -60px;"></el-input></el-col>
           <el-col :span="3"
          ><div class="grid-content bg-purple">
            <el-button type="success" @click="additemss">查询</el-button>
          </div></el-col
        >
          </el-row>

    <!-- 表格开始 -->
    <el-table :data="storage" style="width: 100%" class="srwwe">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
      
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付编号" width="190">
        <template slot-scope="scope">
     
          <span style="margin-left: 10px">{{ scope.row.ordercode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付价格" width="190">
        <template slot-scope="scope">
     
          <span style="margin-left: 10px">{{ scope.row.payPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付类型" width="190">
        <template slot-scope="scope">
     
          <span style="margin-left: 10px">{{ scope.row.payType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="190">
        <template slot-scope="scope">
     
          <span style="margin-left: 10px">{{ scope.row.payTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支记录" width="190">
        <template slot-scope="scope">
      
          <span style="margin-left: 10px">{{ scope.row.recordId }}</span>
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
        type: "",
        startDate: "",
        endDate: "",
        payType: "",
        no: "",

      },

      pomain: {
        soId : "",
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
      this.additemss(this.currentPage, this.pageSize);
      this.additemss()
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.additemss(this.currentPage, this.pageSize);
    },

    // 查询
    additemss() {
      this.storage = [];
      console.log(this.pomains);
       axios
        .get(
          "/cgi/main/finance/query?"+ querystring.stringify(this.query)+'&page='+this.currentPage
        )
        .then((value) => {
  
          console.log(value.data.list);
          this.storage = value.data.list;
              this.total=value.data.total
            
        });
    },

  },
  mounted() {
    
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