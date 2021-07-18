<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" >
  <el-breadcrumb-item :to="{ path: '/' }">管理信息</el-breadcrumb-item>
  <el-breadcrumb-item>首页</el-breadcrumb-item>
 
</el-breadcrumb>
     <div class="homea"> 
      <i class="el-icon-user" ></i><span>{{name}}</span><span>欢迎使用信息管理系统</span>
  </div>
     <div class="homea"> 
      <i class="el-icon-time" ></i><span>您的登陆时间：{{date|ctime}}</span>
  </div>
    </div>
</template>
<script>

let padaDate = function(value){
      return value<10 ? '0'+value : value;
   };

export default {
    data() {
        return {
            date: new Date(localStorage.getItem('time')),
            name:localStorage.getItem('mess')
        }
    },
    filters:{
      ctime: value=>{
          var year = value.getFullYear();      //存储年
       var month = padaDate(value.getMonth()+1);    //存储月份
       var day = padaDate(value.getDate());         //存储日期
       var hours = padaDate(value.getHours());      //存储时
       var minutes = padaDate(value.getMinutes());  //存储分
       var seconds = padaDate(value.getSeconds());  
       return  year+'/'+month+'/'+day+'  '+hours+':'+minutes+':'+seconds;
      }
  },
}
</script>
<style scoped>
.homea{ display: flex;}
.homea span {margin-left: 20px; font-size: 16px;}
div{margin-bottom: 20px;}
</style>
