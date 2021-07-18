<template>
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">月度报表</el-breadcrumb-item>
  <el-breadcrumb-item>月度收支报表</el-breadcrumb-item>
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
    <el-table :data="tableData"   style="width: 100%">
      <el-table-column label="收款次数" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.payCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款总金额" width="190">
        <template slot-scope="scope" >
          <span style="margin-left: 10px">{{ scope.row.payPrice }}</span>
        </template>
      </el-table-column>
       <el-table-column label="付款次数" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row. receCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款总金额" width="190">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.recePrice }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          
    <el-tab-pane label="收款明细" name="first" width="160">
         <el-table :data="tableDataa"   style="width: 100%">
              <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单编号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.soId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售日期" width="200">
        <template slot-scope="scope" >
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
       <el-table-column label="收款日期" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row. pay_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款金额" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.pay_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经手人" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status |filterAdd2 }}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-tab-pane>
    <el-tab-pane label="付款明细" name="second">
        <el-table :data="tableDatab"   style="width: 100%">
              <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
        <el-table-column label="采购单单编号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.poId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售日期" width="200">
        <template slot-scope="scope" >
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
       <el-table-column label="收款日期" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row. pay_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款金额" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.pay_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经手人" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status |filterAdd2 }}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>
  
   
    <!-- 表格结束 -->
   
    
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
        payCount:"",
        payPrice:"",
        receCount:"",
        recePrice:"",
         pageSize: 5,
         activeName: 'second',
      total: 0,
      page: "1",
      currentPage: 1,/* 分页数据 */
      tableData: [],
      tableDataa: [],
      tableDatab: [],
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
       handleClick(tab, event) {
        console.log(tab, event);
      },
       handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
     this.getMessage(this.currentPage, this.pageSize);
      this.tableData=[]
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.getMessage(this.currentPage, this.pageSize);
    },
    getMessage() {
         this.tableData=[]
      axios
        .get(
          "/cgi/main/report/payment/main?" + querystring.stringify(this.value)+'&page='+this.currentPage
        )
        .then((value) => {
            console.log(value.data);
          console.log(value.data);
          this.tableData.push(value.data)
          console.log( this.tableData);

        });
          axios
        .get(
          "/cgi/main/report/payment/detail/receipt?" + querystring.stringify(this.value)+'&page='+this.currentPage
        )
        .then((value) => {
            
          console.log(value.data.list);
          this.tableDataa=value.data.list
          console.log( this.tableData);
        });
          axios
        .get(
          "/cgi/main/report/payment/detail/pay?" + querystring.stringify(this.value)+'&page='+this.currentPage
        )
        .then((value) => {
          
          console.log(value.data.list);
          this.tableDatab=value.data.list
          console.log( this.tableDatab);

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
.padin li {border: solid 1px #ccc; padding: 2px 10px; }
h1 {text-align: center;}
</style>