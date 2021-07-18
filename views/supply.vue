<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height: 20px; margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 增加部分开始 -->
    <div class="place">
      <el-button type="info" @click="dialogFormVisible = true" class="places"
        ><span>添加</span></el-button
      >
    </div>
    <el-dialog title="添加供应商" :visible.sync="dialogFormVisible">
      <el-form :model="add" ref="add" :rules="rules">
        <el-form-item
          label="供应商编号"
          :label-width="formLabelWidth"
          prop="venderCode"
        >
          <el-input
            v-model="add.venderCode"
            autocomplete="off"
            placeholder="请输入4~10位数字字母"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="供应商名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model="add.name"
            autocomplete="off"
            placeholder="名称长度不超过100"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="供应商密码"
          :label-width="formLabelWidth"
          prop="passWord"
        >
          <el-input
            v-model="add.passWord"
            autocomplete="off"
            placeholder="请输入4~10位数字字母"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="联系人"
          :label-width="formLabelWidth"
          prop="contactor"
        >
          <el-input
            v-model="add.contactor"
            autocomplete="off"
            placeholder="请输入联系人"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            v-model="add.address"
            autocomplete="off"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" :label-width="formLabelWidth">
          <el-input
            v-model="add.postCode"
            autocomplete="off"
            placeholder="请输入邮政编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-input
            v-model="add.createDate"
            autocomplete="off"
            placeholder="请输入邮政编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
          <el-input
            v-model="add.tel"
            autocomplete="off"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="传真" :label-width="formLabelWidth">
          <el-input
            v-model="add.fax"
            autocomplete="off"
            placeholder="请输入传真"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('add')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加部分结束 -->
    <!-- 表格开始 -->
    <template>
      <el-table :data="product" style="width: 100%">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商编号" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.venderCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商名称" width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.contactor }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮政编码" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.postCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册日期" width="190">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="传真" width="140">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.fax }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
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
      <el-dialog title="编辑供应商" :visible="showAddress">
        <el-form :model="change" :rules="rules">
          <el-form-item
            label="供应商编号"
            :label-width="formLabelWidth"
            prop="venderCode"
          >
            <el-input
              v-model="change.venderCode"
              autocomplete="off"
              placeholder="请输入4~10位数字字母"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="供应商名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="change.name"
              autocomplete="off"
              placeholder="名称长度不超过100"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="供应商密码"
            :label-width="formLabelWidth"
            prop="passWord"
          >
            <el-input
              v-model="change.passWord"
              autocomplete="off"
              placeholder="请输入4~10位数字字母"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="联系人"
            :label-width="formLabelWidth"
            prop="contactor"
          >
            <el-input
              v-model="change.contactor"
              autocomplete="off"
              placeholder="请输入联系人"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input
              v-model="change.address"
              autocomplete="off"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" :label-width="formLabelWidth">
            <el-input
              v-model="change.postCode"
              autocomplete="off"
              placeholder="请输入邮政编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-input
              v-model="change.createDate"
              autocomplete="off"
              placeholder="请输入邮政编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
            <el-input
              v-model="change.tel"
              autocomplete="off"
              placeholder="请输入电话号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="传真" :label-width="formLabelWidth">
            <el-input
              v-model="change.fax"
              autocomplete="off"
              placeholder="请输入传真"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddress = false">取 消</el-button>
          <el-button type="primary" @click="changes">确 定</el-button>
        </div>
      </el-dialog>
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
    <!-- 表格结束 -->
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
      pageSize: 5,
      total: 0,
      page: "1",
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
      rules: {
        venderCode: [
          {
            pattern: /^\d{4,10}$/,
            required: true,
            message: "请输入4~10位数字例如1001",
            trigger: "blur",
          },
        ],
        passWord: [
          {
            pattern: /^\d{4,10}$/,
            required: true,
            message: "请输入4~10位数字例如1001",
            trigger: "blur",
          },
        ],
        name: [
          {
            pattern: /^[\u4e00-\u9fa5]{0,}$/,
            required: true,
            trigger: "blur",
            message: "中文长度不超过100",
          },
        ],
        contactor: [
          {
            pattern: /^[\u4e00-\u9fa5]{0,}$/,
            required: true,
            trigger: "blur",
            message: "中文长度不超过100",
          },
        ],
        tel: [
          {
            pattern: /^\d{0,}$/,
            required: true,
            trigger: "blur",
            message: "电话不能为空",
          },
        ],
      },
    };
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
    //获取供应商
    getMessage(currentPage) {
      axios
        .get("/cgi/main/purchase/vender/show?page=" + this.currentPage)
        .then((value) => {
          console.log(value.data.list);
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
    // 增加产品
    addProduct() {
      this.dialogFormVisible = false;
      axios
        .post(
          "/cgi/main/purchase/vender/add?" + querystring.stringify(this.add)
        )
        .then((value) => {
          if (value.data.code == 2) {
            alert(value.data.message);
          }
          if (value.data.message == "添加成功") {
            alert("添加状态：" + value.data.message);
          } else {
            console.log(value.data);
            alert("添加状态：" + value.data.message);
          }
          console.log(value);
          this.getMessage();
        });
    },
    submitForm(add) {
      this.$refs[add].validate((valid) => {
        if (valid) {
          this.addProduct(); //成功调用此方法
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    handleEdit(index, row) {
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
            .post(
              "/cgi/main/purchase/vender/delete?venderCode=" + row.venderCode
            )
            .then((response) => {
              if (response.data.code == 0) {
                alert(response.data.message);
                console.log(response);
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
          if (value.data.code == 2) {
            alert(value.data.message);
          }
          if (value.data.message == "编辑成功") {
            alert("编辑状态：" + value.data.message);
          } else {
            console.log(value.data);
            alert("编辑状态：" + value.data.message);
          }
          this.getMessage();
        });
    },
    handleEdit(index, row) {
      this.change = {
        venderCode: row.venderCode,
        name: row.name,
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
.el-input__inner {
  width: 50%;
}
</style>

