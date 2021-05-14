<template>
  <div class="login">
    <div class="content">
      <div class="c-header">
        SSLCSQ的后台管理
      </div>
      <!--  -->
      <el-form
        :model="subDataForm"
        ref="subDataForm"
        class="demo-ruleForm"
        :rules="rules"
      >
      <!-- 账户 -->
        <el-form-item
          label="用户名"
          prop="name"
          :required="true"
        >
          <el-input
            type="name"
            placeholder="请填写：sslcsq"
            v-model="subDataForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item
          label="密码"
          prop="password"
          :required="true"
        >
          <el-input
            type="password"
            placeholder="密码是521314"
            v-model="subDataForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('subDataForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('subDataForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { login , getUserRouteData } from '@/http/api'
import storage from '@/storage'
 export default {
    name:'login',
    data() {
      var name = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        }
        else{
          if(this.subDataForm.name!=='')
          {
            if(this.subDataForm.name==='sslcsq')
            {
              callback(); //重点
            }
            else{
              callback(new Error('用户名错误'));
            }
          }
        }
      };
      var password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        if(this.subDataForm.password!=='')
          {
            if(this.subDataForm.password==='521314')
            {
              callback(); //重点
            }
            else{
              callback(new Error('密码输入错误'));
            }
          }
      };
      return {
        subDataForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { validator: name, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ]
        },
        t:null, //防抖变量
      };
    },
    methods: {
      filterRouter(routers) {
        const accessedRouters = routers.filter(route => {
          if (route.component) {
              route.component = this._import(route.component)
          }
          if (route.children && route.children.length>0) {
              route.children = this.filterRouter(route.children)
          }
          return true
        })
        this.$store.commit("addUserRoute",accessedRouters)
        return accessedRouters
      },
      _import (file) {
        return () => import("@/views/" + file + ".vue")
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 这里是登录成功了
            // 防抖
            clearTimeout(this.t);
            this.t = setTimeout(() => {
              // 多次触发只会执行一次
              login().then((res)=>{
                if(res.data.data.code==200)
                {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  const token=res.data.data.token
                  // 使用封装的localStorage存储token
                  localStorage.setItem("token",JSON.stringify(token))
                  this.$router.replace("/")

                  // 登录成功获取用户权限列表

                  getUserRouteData().then((res)=>{
                    console.log(res.data.data.router)
                    this.filterRouter(res.data.data.router)
                  })
                }
                else{
                  this.$message({
                    message: '服务器异常，请重新登录',
                    type: 'warning'
                  });
                }
              })
            }, 300);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  background: #011e3b;
  display: flex;
  align-items: center;
  justify-content: center;
  .content{
    min-width: 400px;
    max-width: 400px;
    max-width: 400px;
    height: 300px;
    background: white;
    box-sizing: border-box;
    padding: 20px 20px 20px 0px;
    border-radius: 6px;
    .c-header{
      height: 50px;
      text-align: center;
      padding-top: 20px;
      font-size: 20px;
    }
  }
}
/deep/ .el-input{
  width: 75% !important;
  opacity: none !important;
}
/deep/ .el-form-item__label{
  width: 80px !important;
}
/deep/ .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 82px;
}
.el-button--primary{
  margin-left: 120px;
}
</style>