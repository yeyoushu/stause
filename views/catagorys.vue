<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">产品管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/catagorys' }">产品分类列表</el-breadcrumb-item>
</el-breadcrumb>
    <!--  -->
    <div class="place">
    
      <el-button type="info" plain @click="dialogFormVisible = true"
        class="places" ><span>添加</span></el-button
      >
    </div>

    <el-dialog title="添加新用户" :visible.sync="dialogFormVisible">
      <el-form :model="user" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="user.name" autocomplete="off" placeholder="不能为空" ></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="user.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="show">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->

    <el-dialog title="修改产品" :visible.sync="dialogForm">
      <el-form :model="arr">
          <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="arr.categoryId" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="arr.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="arr.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="revise">确 定</el-button>
      </div>
    </el-dialog>

    <!--  -->
    <el-table :data="obj" style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="分类序列序号"
      width="300">>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.categoryId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类别名称"
      width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述"
      width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{ scope.row.remark }}
          </span>
        </template>
      </el-table-column>
     
      <el-table-column label="操作"  width="280">>
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            class="buttons"
            @click="dialogForms(scope.$index, scope.row)"
            ><span>编辑</span></el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteData(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>
<script>
import axios from "axios";

const querystring = require("querystring");
export default {
  data() {
    return {
      checkList: [],
      dialogForm: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      obj: [
        {
          categoryId: "",
          name:"",
          remark:"",
        },
      ],
      arr: {
         categoryId: "",
          name:"",
          remark:"",
      },
      user: {
        name: "",
          remark:"",
      },
      pageSize: 5,
      total: 0,
      page: "1",
      currentPage: 1,
      input: "",
         rules: {
        name: [
          {
            pattern: /^[\u4e00-\u9fa5]{0,}$/,
            required: true,
            trigger: "blur",
            message: "不能为空",
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

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    show() {
      this.dialogFormVisible = false;
      axios
        .get("/cgi/main/sell/category/add?" + querystring.stringify(this.user))
        .then((value) => {
          if (value.data.code == 2) {
              alert(value.data.message);
         }
            if (value.data.message=="添加成功") {
              alert("添加状态：" + value.data.message);
              console.log(value.data);
            }
            else {
              console.log(value.data);
              alert("添加状态：" + value.data.message);
            }
             this.getMessage();
        });
    },
    revise() {
      this.dialogForm = false;
       console.log(this.arr);
      axios
        .get("/cgi/main/sell/category/update?" + querystring.stringify(this.arr))
        .then((value) => {
          if (value.data.code == 2) {
              alert(value.data.message);
        }
            if (value.data.message=="编辑成功") {
              alert("编辑状态：" + value.data.message);
            }
            else {
              console.log(value.data);
              alert("编辑状态：" + value.data.message);
            }
            this.getMessage();
        });
    },
    //获取数据信息
    getMessage(currentPage) {
      axios
        .get("/cgi/main/sell/category/show?page=" + this.currentPage)
        .then((value) => {
          console.log(value.data);
          this.obj = value.data.list;
          console.log(value.data.list);
          this.total = value.data.total;
          this.currentPage = value.data.pageNum;
          console.log(this.total);
        });
    },
    dialogForms(index, row) {
       this.arr= { categoryId: row.categoryId, name: row.name ,remark: row.remark};
      this.dialogForm= true;
      console.log(index, row);
    },
    deleteData(index, row) {
      this.$confirm("确定删除该用户数据?", "提示", {
        type: "warning",
      }).then(() => {
        // var params = new URLSearchParams()
        // params.append("id", row.account)
        axios
          .post("/cgi/main/sell/category/delete?categoryId=" + row.categoryId)
          .then((response) => {
            if (response.data.code == 0) {
              alert(response.data.message);
              this.shopGoods.splice(index, 1);

              console.log(response);
            }   if (response.data.message=="删除成功") {
              alert("删除状态：" + response.data.message);
            }
            else {
              console.log(response.data);
              alert("删除状态：" + "删除失败存在依赖记录");
            }
            this.getMessage();
          })
          .catch((error) => {
            console.log("删除失败的原因：", error);
          });
      });
    },
  },
  mounted() {
    this.getMessage();
    this.getMessage(this.currentPage, this.pageSize);
  },
  computed: {
    tables() {
      const input = this.input;
      if (input) {
        console.log("input输入的搜索内容：" + this.input);
        return this.obj.filter((data) => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1;
          });
        });
      }
      return this.obj;
    },
  },
};
</script>
<style>
.search {
  display: flex;
  margin-bottom: 20px;
  background-color: rgb(109, 231, 247);
  border: 1px solid rgb(109, 231, 247);
}
.inses {
  width: 416px;
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
.place .places {background-color:  #8dd469}
.place .places span {color: white; text-align: center; margin-right: 6px;}
.place:nth-of-type(2) {
  background-color: #fff;
}
.place span {
  font-weight: normal;
  margin-left: 10px;
}
.el-table {
  font-size: 14px;
}
.groud {
  display: flex;
  margin-bottom: 20px;
  margin-left: 62px;
}
.padin {
  text-align: right;
  margin-top: 10px;
}
.padin li {
  border: solid 1px #ccc;
  padding: 2px 10px;
}
.button span {
  text-align: center;
}
.buttons{background-color: rgb(218, 214, 214);border: solid 1px rgb(218, 214, 214);}
.buttons span {color: #000;}
.el-input__inner{width: 50%;}
</style>