<template>
  <div>
    <el-container>
      <el-header height="100px;" class="header">
        <div><h1>信息管理系统界面</h1></div>

        <div class="headert">
          <i class="el-icon-time"></i>
          系统时间:
          <span>{{ date }}</span>
          <span>{{ time }}</span>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px" class="aside">
          <div class="asidea">
            <i class="el-icon-document-copy" style="margin-right: 6px"></i
            >菜单管理
          </div>
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            active-text-color="#d2e6fa"
            :unique-opened="true"
            router=""
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">管理信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/Management">用户管理</el-menu-item>
                <el-menu-item index="1-3" @click="open()"
                  >退出登陆</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">产品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/catagorys">产品分类列表</el-menu-item>
                <el-menu-item index="/poroducts">产品列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">采购管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/supply">供应商管理</el-menu-item>
                <el-menu-item index="/supplier">新添采购单</el-menu-item>
                <el-menu-item index="/Purchase">采购单了结</el-menu-item>
                <el-menu-item index="/suppPurchase">采购单查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">仓管管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/registration">入库登记</el-menu-item>
                <el-menu-item index="/storage">出库登记</el-menu-item>
                <el-menu-item index="/inquiry">库存查询</el-menu-item>
                <el-menu-item index="/stock">库存盘点</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">销售管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/customermen">客户管理</el-menu-item>
                <el-menu-item index="/sales">新添销售单</el-menu-item>
                <el-menu-item index="/settlement">销售单了结</el-menu-item>
                <el-menu-item index="/salesabout">销售单查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">财务收支</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/collectmoney">收款登记</el-menu-item>
                <el-menu-item index="/rgn">付款登记</el-menu-item>
                <el-menu-item index="/expenditure">收支查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">月度报表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/mpurchasing">月度采购报表</el-menu-item>
                <el-menu-item index="/msales">月度销售报表</el-menu-item>
                <el-menu-item index="/missue">月度出库报表</el-menu-item>
                <el-menu-item index="/mwarehousing">月度入库报表</el-menu-item>
                <el-menu-item index="/minventory">月度库存报表</el-menu-item>
                <el-menu-item index="/mexpenditure">月度收支报表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
const querystring = require("querystring");
export default {
  data() {
    return {
      time: "",
      date: "",
      week: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
    };
  },
  mounted() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.updateTime();
  },
  methods: {
    updateTime() {
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    open() {
      this.$confirm("是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.get("/cgi/sys/logout").then((value) => {
            localStorage.removeItem("mess");
            console.log(value);
          }),
            this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
          this.$router.push("/Index");
        });
    },
  },
};
</script>
<style scoped>
.el-menu-item {
  display: flex;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.aside {
  background-color: rgb(253, 253, 253);
  border: 1px solid#ccc;
  height: 800px;
}
.header {
  background-color: rgb(253, 253, 253);
  border: 1px solid#ccc;
  display: flex;
  justify-content: space-between;
}
.main {
  background-color: rgb(243, 243, 243);
  height: 800px;
}
.asidea {
  border: 1px solid#ccc;
  height: 40px;
  line-height: 40px;
  background-color: rgb(243, 241, 241);
}
.headert {
  line-height: 80px;
}
</style>