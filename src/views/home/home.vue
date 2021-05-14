<template>
  <div class="home">
    <!-- left -->
    <div class="left">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        router
        :collapse="isCollapse"
      >
      <template>
        <i :class="[iconZkSq,'iconTem']" @click="zksq()"></i>
      </template>
      <template v-for="(e,i) in list">
        <template v-if="e.children">
          <el-submenu :index='i+""' :key="i">
            <template slot="title">
              <i :class="e.meta.icon"></i>
              <span slot="title">{{ e.meta.title }}</span>
            </template>
            <template v-for="subItem in e.children">
              <el-submenu v-if="subItem.children" :index="subItem.path" :key="subItem.path">
                <template slot="title">{{ subItem.meta.title }}</template>
                <el-menu-item 
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.path">
                    <i :class="threeItem.meta.icon"></i>
                    <span slot="title">{{ threeItem.meta.title }}</span>
                  <!-- {{ threeItem.meta.title }} -->
                </el-menu-item>               
              </el-submenu>
              <el-menu-item v-else :index="subItem.path" :key="subItem.path">
                <i :class="subItem.meta.icon"></i>
                <span slot="title">{{ subItem.meta.title }}</span>
                <!-- {{ subItem.meta.title }} -->
              </el-menu-item>
            </template>
          </el-submenu>  
        </template>
        <template v-else>
          <el-menu-item :index="e.path" :key="e.path">
            <i :class="e.meta.icon"></i>
            <span slot="title">{{ e.meta.title }}</span>
          </el-menu-item>
        </template>

      </template>

      </el-menu>
    </div>
    <!-- right -->
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      list:this.$store.state.userRouteData[0].children,
      iconZkSq:'iconfont icon-zhankai',
      isCollapse: false,
      defaultActive:'/index/echarts'
    };
  },
  mounted()
  {
    // console.log(window.location.pathname)
    this.defaultActive=window.location.pathname
  },
  methods: {
    zksq()
    {
      this.isCollapse=!this.isCollapse
      if(this.iconZkSq=='iconfont icon-zhankai')
      {
        this.iconZkSq='iconfont icon-shouqi'
      }
      else{
        this.iconZkSq='iconfont icon-zhankai'
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .left {
    background: rgb(84, 92, 100);
  }
  .right {
    width: 100%;
    height: 100vh;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
.el-menu {
  width: 100%;
  height: calc(100vh - 50px);
  border: none;
}
.el-menu--collapse{
  width: 100%;
  height: calc(100vh - 50px);
}
.iconTem{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    padding: 0 20px;
    padding-left: 32px;
    cursor: pointer;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
}
.el-submenu__title * {
    vertical-align: middle;
    padding-left: 12px;
}
.el-menu-item * {
    vertical-align: middle;
    padding-left: 12px;
}
.iconfont{
  color: white;
}
</style>