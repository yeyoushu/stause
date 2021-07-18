<template>
  <div>
       <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height: 20px;margin-bottom: 20px;">
  <el-breadcrumb-item :to="{ path: '/' }">采购管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/supplier' }">新添采购单</el-breadcrumb-item>
  <el-breadcrumb-item>添加采购单</el-breadcrumb-item>
</el-breadcrumb>
    <div class="place">
      <el-button type="info" class="placere" @click="additems"
        >添加明细</el-button
      >
      <el-button type="info" class="placeres" @click="additemss()"
        ><span>保存</span></el-button
      >
    </div>
    <!--  -->
    <!--  -->
    <el-form
      :inline="true"
      :model="pomain"
      class="demo-form-inline"
      size="mini"
      :rules="rules"
    >
      <div class="demo">
        <el-form-item label="采购单编号" prop="poId">
          <el-input v-model="pomain.poId" placeholder="不能为空"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input
            v-model="pomain.createTime"
            placeholder="不能为空"
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="venderCode">
          <el-select
            v-model="pomain.venderCode"
            placeholder="请选择供应商"
            class="lablewidth"
            @change="getTypeSelected"
          >
            <el-option
              v-for="(item, index) in product"
              :key="index"
              :label="item.name"
              :value="item.venderCode"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="demo">
        <el-form-item label="创建用户">
          <el-input
            v-model="pomain.account"
            placeholder="登录的用户"
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="附加费用" prop="tipFee">
          <el-input v-model="pomain.tipFee" placeholder="0">0</el-input>
        </el-form-item>
        <el-form-item label="采购产品总价" prop="productTotal">
          <el-input
            v-model="pomain.productTotal"
            placeholder="不能为负数"
          ></el-input>
        </el-form-item>
      </div>
      <div class="demo">
        <el-form-item label="付款方式">
          <el-select
            v-model="pomain.payType"
            placeholder="请选择付款方式"
            class="lablewidth"
            @change="h()"
          >
            <el-option label="货到付款" value="1"></el-option>
            <el-option label="款到发货" value="2"></el-option>
            <el-option label="预付款到发货" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最低预付款金额" prop="prePayFee">
          <el-input
            v-model="pomain.prePayFee"
            placeholder="不能为负数"
            :disabled="disabled"
          >0</el-input>
        </el-form-item>
        <el-form-item label="采购单状态">
          <el-select
            v-model="pomain.status"
            placeholder="请选择采购单状态"
            class="lablewidth"
          >
            <el-option label="新增" value="1"></el-option>
            <el-option label="已收货" value="2"></el-option>
            <el-option label="已付款" value="3"></el-option>
            <el-option label="已了结" value="4"></el-option>
            <el-option label="已预付" value="5"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="demo">
         <span style="display:none">
          
            {{pomain.poTotal= parseInt(pomain.productTotal)+parseInt(pomain.tipFee)}}
            </span>
        <el-form-item label="采购总价">
          <el-input
            v-model="pomain.poTotal"
            placeholder="不能为负数"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <!-- 产品明细开始 -->
    <el-form ref="form" :inline="true" label-width="80px">
      <div class="display">
        <span>产品编号</span> <span>产品单价</span><span>产品数量</span
        ><span>数量单位</span><span>明细总价</span><span>添加明细</span>
      </div>

      <div v-for="(item, index) in pomain.poitems" :key="index" class="sdsasd">
        
        <el-form-item
          :prop="'poitems.' + index + '.productCode'"
          class="sdsasda"
        >
          <el-input v-model="item.productCode"></el-input>
        </el-form-item>
        <el-form-item :prop="'poitems.' + index + '.unitPrice'" class="sdsasda">
          <el-input v-model="item.unitPrice" @change="t"></el-input>
        </el-form-item>
        <el-form-item :prop="'poitems.' + index + '.num'" class="sdsasda">
          <el-input v-model="item.num" @change="t"></el-input>
        </el-form-item>
        <el-form-item :prop="'poitems.' + index + '.unitName'" class="sdsasda">
          <el-input v-model="item.unitName"></el-input>
        </el-form-item>
        <!-- ******* -->
        <el-form-item :prop="'poitems.' + index + '.itemPrice'" class="sdsasda">
            <span style="display:none">

            {{item.itemPrice=item.unitPrice*item.num}}
            </span>
          <el-input
           v-model="item.itemPrice"
          
          ></el-input>
        </el-form-item>
        <el-button type="info" @click="dialogFormVisible = true" class="places"
          ><span>添加</span></el-button
        >
        <el-form-item>
          <el-button @click="deleteItem(item, index)" type="danger"
            >删除</el-button
          >
        </el-form-item>
      </div>
                 

    </el-form>
    <!-- 添加明细开始 -->
    <el-dialog title="添加采购明细" :visible.sync="dialogFormVisible">
      <el-table :data="arr" style="width: 100%">
        <el-table-column label="产品编号" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
         <el-table-column label="名称" width="170">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name    }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品单价" width="150">
          <template slot-scope="scope">
            <i class="el-icon-view"></i>
            <span style="margin-left: 10px">{{ scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品单位" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.unitName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
const querystring = require("querystring");
export default {
  data() {
    return {
      currentIndex: -1, //当前添加的明细行
      dialogFormVisible: false, //对话框显示和隐藏
      product: [], //供应商
      arr: [], //对话框选择的产品
       disabled:true,
      pomain: {
        poId: "",
        venderCode: "",
        account: localStorage.getItem("mess"),
        createTime: this.getTime(),
        tipFee: 0,
        productTotal: 0,
        poTotal: 0,
        payType: "1",
        status: "1",
        prePayFee: 0,
        poitems: [],
      },
      rules: {
passWord : [
          {
            pattern: /^\d{4,10}$/,
            required: true,
            message: "请输入4~10位数字字母例如1001",
            trigger: "blur",
          },
        ],
        name: [
          {
            pattern: /^[\u4e00-\u9fa5]{0,}$/,
            required: true,
            trigger: "blur",
            message: "长度不超过100",
          },
        ],
poId:[
          {
            pattern: /^\d{0,}$/,
            required: true,
            trigger: "blur",
            message:"唯一不能为空",
          },
        ],
venderCode: [
          {
            pattern: /^\d{0,}$/,
            required: true,
            trigger: "blur",
            message: "不能为空",
          },
        ],
tipFee: [
          {
            pattern: /^[1-9]{0,}\d||^[1-9]\.{0,}\d*$/,
            required: true,
            trigger: "blur",
            message: "附加费用不能为负数",
          },
        ],
productTotal: [
          {
            pattern: /^[1-9]{0,}\d||^[1-9]\.{0,}\d*$/,
            required: true,
            trigger: "blur",
            message: "产品总价不能为负数",
          },
        ],
poTotal : [
          {
            pattern: /^[1-9]{0,}\d||^[1-9]\.{0,}\d*$/,
            required: true,
            trigger: "blur",
            message: "采购总价不能为负数",
          },
        ],
prePayFee  : [
          {
            pattern: /^[1-9]{0,}\d||^[1-9]\.{0,}\d*$/,
            required: true,
            trigger: "blur",
            message: "附加不能为负数",
          },
        ],
      },
    };
  },
 created() {
      this.getRandomInt(1,1000000000)
    },
  mounted() {
    this.getMessageAll();
    this.queryItem(); 
  },
  methods: {
h() {
  if (this.pomain.payType==3) {
   this.disabled=false;
  }
  else{
     this.disabled=true

  }
},
    getRandomInt(min, max) {
        // 以下函数返回 min（包含）～ max（包含）之间的数字：
       this.pomain.poId = Math.floor(Math.random() * (max - min + 1)) + min

      //  函数返回 min（包含）～ max（不包含）之间的数字
      //  this.data = Math.floor(Math.random() * (max - min) ) + min;
      },
    t(){
      console.log("*******s********");
      this.pomain.productTotal=0;
      for(let i of this.pomain.poitems){
        this.pomain.productTotal+=i.itemPrice;
      }
        console.log("*******e********");
    
      return this.pomain.productTotal;
    },
      search(event){
	          console.log(event.currentTarget.value)
	        },
    //   添加明细显示
    additems() {
      this.currentIndex++;
      // this.pomain.poitems.push({itemPrice:0});
      this.pomain.poitems.push({
        productCode: "",
        unitPrice: 0,
        num: 0,
        unitName: "",
        itemPrice: "",
      });
    },
    getTypeSelected() {
      //获取选中的违规类型
      console.log(this.pomain.venderCode);
    },

    addItem() {
      this.pomain.poitems.push({
        productCode: "",
        unitPrice: 0,
        num: 0,
        unitName: "",
        itemPrice: "",
      });
    },
    queryItem() {
      axios.get("/cgi/main/sell/product/all").then((value) => {
        console.log(value.data);
            value.data.forEach((e) => {
          e.unitPrice = 0;
        });
        this.arr = value.data;
      });
    },
    // 显示影藏

    getMessageAll() {
      axios.get("/cgi/main/purchase/vender/all").then((value) => {
        console.log(value.data);
        this.product = value.data;
        this.pomain.venderCode = value.data[0].venderCode;
        console.log(this.pomain.venderCode);
        console.log(this.product);
      });
    },
    // 提交保存
    additemss() {
      let t = this.pomain.poitems;
      for (let i = 0; i < t.length; i++) {
        t[i].itemPrice = parseInt(t[i].unitPrice) * parseInt(t[i].num);}
        // let c=pomain.poitems.itemPrice
        // for (let y = 0; y < c.length; y++){
        //  this.pomain.productTotal +=parseInt(c[i])
         
        // }
         
      axios({
        url: "/cgi/main/purchase/pomain/add",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(this.pomain),
      }).then(response=> {
        alert("保存状态" + response.data.message);


      });
    
    },

    sure(pomain) {
      console.log(this.pomain.poitems.length, "length");
      this.$refs[pomain].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      if(row.index=!row.index){
      this.pomain.poitems[this.currentIndex] = row;
      this.pomain.poitems[this.currentIndex].unitPrice =0
      }
      else{
        alert( "请勿重复添加")
      }

      
      
 console.log(row.price);
    },
    deleteItem(item, index) {
      this.pomain.poitems.splice(index, 1);
      console.log(this.pomain.poitems, "删除");
    },

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
  },
};
</script>
<style >
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
  background-color: rgb(216, 216, 216);
}
.place .places span {
  color: rgb(63, 62, 62);
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
.lablewidth {
  width: 186px;
}
.el-form-item__label {
  width: 121px;
}
.demo {
  text-align: center;
}
.productCode {
  width: 120px;
}
.ssdww {
  margin-left: 152px;
}
.display {
  margin: auto;
  border: solid 1px rgb(224, 224, 224);
  height: 40px;
}
.display span {
  width: 210px;
  display: block;
  float: left;
  line-height: 40px;
}
.sdsasda {
  width: 190px;
}
.sdsasda input {
  width: 170px;
  height: 32px;
}

.placeres {
  background-color: rgb(250, 147, 143);
  border: solid 1px rgb(250, 147, 143);
  color: white;
  text-align: center;
}
.placeres span {text-align: center;margin-right: 6px;}

</style>