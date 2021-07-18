<template>
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">管理信息</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
 
</el-breadcrumb>
    <!--  -->
    <div class="place">
      <el-button type="info" plain @click="dialogFormVisible = true" style=" background-color: #67C23A; color:white;"
        >添加</el-button
      >
    </div>

    <el-dialog title="添加新用户" :visible.sync="dialogFormVisible">

      <el-form :model="user">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="user.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.passWord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="groud">
        <span>锁定状态：</span>
         <el-radio-group v-model="user.status">
    <el-radio :label="0">未锁定</el-radio>
    <el-radio :label="1">锁定</el-radio>
   
  </el-radio-group>

      </div>
      <div class="groud">
        <span>权限：</span>
        <el-checkbox-group v-model="user.modelcodes">
    <el-checkbox label="1" >采购管理</el-checkbox>
          <el-checkbox label="2">销售管理</el-checkbox>
          <el-checkbox label="3" >系统管理</el-checkbox>
          <el-checkbox label="4">	财务管理</el-checkbox>
          <el-checkbox label="5" >仓库管理</el-checkbox>
          <el-checkbox label="6" >业务报表</el-checkbox>
      
        </el-checkbox-group>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="show">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    
    <el-dialog title="修改用户" :visible.sync="dialogForm">
      <el-form :model="arr">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="arr.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="arr.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="arr.passWord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="groud">
        <span>锁定状态：</span>
        <el-radio-group v-model="arr.status">
          <el-radio :label="0">不锁定</el-radio>
          <el-radio :label="1">锁定</el-radio>
        </el-radio-group>
      </div>
      <div class="groud">
        <span>权限：</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="1" >采购管理</el-checkbox>
          <el-checkbox label="2">销售管理</el-checkbox>
          <el-checkbox label="3" >系统管理</el-checkbox>
          <el-checkbox label="4">	财务管理</el-checkbox>
          <el-checkbox label="5" >仓库管理</el-checkbox>
          <el-checkbox label="6" >业务报表</el-checkbox>
      
        </el-checkbox-group>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="revise">确 定</el-button>
      </div>
    </el-dialog>

    <!--  -->
    <el-table :data="obj" style="width: 100%">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户账号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" width="120">
        <template slot-scope="scope">
         
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="锁定状态" width="100">
        <template slot-scope="scope">
     
          <span style="margin-left: 10px">{{
            scope.row.status ? "锁定" : "不锁定"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加日期" width="190">
        <template slot-scope="scope">
          
          <span style="margin-left: 10px">
            {{ scope.row.createDate }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户权限" width="480">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <span v-for="(item, index) in scope.row.models" :key="index">
              {{ item.modelName }}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[5,7,10,]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="total">
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
      status:0,
      checkList: [],
      dialogForm:false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
   
      obj: [
        {
          name: "",
          account: "",
          passWord: "",
          createDate: "",
         status: '',
          modelcodes: "",
        },
      ],
      arr: {
        name: "",
        account: "",
        passWord: "",
        createDate:this.etTime(),
         status: 0,
      },
      user: {
        name: "",
        account: "",
        passWord: "",
        createDate:this.etTime(),
       status: 0,
         modelcodes:[],
       
      },
     pageSize: 5,
      total: 0,
      page:'1',
      currentPage: 1,
      input: "",
    };
  },
  methods: {
   dialogForms(index, row) {
       this.arr= { 
       account: row.account, name: row.name,passWord: row.passWord,createDate: row.createDate,status: row.status};
      this.dialogForm= true;
      console.log(index, row);
    },
    handleCurrentChange: function(currentPage) {
	this.currentPage = currentPage;
	console.log(this.currentPage); //点击第几页
	this.getMessage(this.currentPage, this.pageSize);
},
handleSizeChange: function(size) {
	this.pageSize = size;
	console.log(this.pageSize); //每页下拉显示数据
	this.getMessage(this.currentPage, this.pageSize);
},

   etTime() {
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    show() {
      this.dialogFormVisible = false;
      this.user.status=0;
      axios
        .get("/cgi/main/system/user/add?" + querystring.stringify(this.user))
        .then((value) => {
           if (value.data.code == 2) {
              alert(value.data.message);
           this.getMessage();}
            if (value.data.message=="添加成功") {
              alert("添加状态：" + value.data.message);
            }
            else {
              console.log(value.data);
              alert("添加状态：" + value.data.message);
            }
        });
        
    },
     revise () {
      this.dialogForm = false;
   
      axios
        .get("/cgi/main/system/user/update?" + querystring.stringify(this.arr)+"&modelcodes="+this.checkList)
        .then((value) => {
           if (value.data.code == 2) {
              alert(value.data.message);
           this.getMessage();}
            if (value.data.message=="编辑成功") {
              alert("编辑状态：" + value.data.message);
            }
            else {
              console.log(value.data);
              alert("编辑状态：" + value.data.message);
            }
        });
    },
    //获取数据信息
    getMessage(currentPage) {
      
      axios.get("/cgi/main/system/user/show?page="+this.currentPage).then((value) => {
        this.obj = value.data.list;
        this.total=value.data.total
        this.currentPage =value.data.pageNum
        console.log(this.total);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    deleteData(index, row) {
      this.$confirm("确定删除该用户数据?", "提示", {
        type: "warning",
      }).then(() => {
        // var params = new URLSearchParams()
        // params.append("id", row.account)
        axios
          .post("/cgi/main/system/user/delete?account=" + row.account)
          .then((response) => {
            if (response.data.code == 0) {
              alert(response.data.message);
              this.shopGoods.splice(index, 1);

              console.log(response);
            }   
             if (response.data.message=="删除成功") {
              alert("删除状态：" + response.data.message);
            }
            else {
              console.log(response.data);
              alert("删除状态：" + "删除失败存在依赖记录");
            }
            this.getMessage();
          })
            
      });
    },
  },
  mounted() {
    this.getMessage();
    
  },
  computed: {
			tables() {
				const input = this.input
				if (input) {
					console.log("input输入的搜索内容：" + this.input)
					return this.obj.filter(data => {
						console.log("object:" + Object.keys(data))
						return Object.keys(data).some(key => {
							return String(data[key]).toLowerCase().indexOf(input) > -1
						})
					})
				}
				return this.obj
			}
		}
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
  height: 56px;
  line-height: 56px;
  text-align: left;
  color: #000;
  font-weight: bold;
  font-size: 14px;
  margin: 0;
  padding-left: 10px;
}
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
.padin {text-align: right;margin-top: 10px; }
.padin li {border: solid 1px #ccc; padding: 2px 10px;}
.button {width: 56px;height: 28px; line-height: 6px;border: solid 0;background-color: #F56C6C;}
.button span {text-align: center;}
.buttons{background-color: rgb(218, 214, 214);border: solid 1px rgb(218, 214, 214);}
.buttons span {color: #000;}
.el-dialog{width: 55%;}
.el-input__inner{width: 50%;}
</style>