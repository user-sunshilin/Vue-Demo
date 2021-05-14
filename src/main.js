import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getUserRouteData } from "@/http/api"
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start();
  
  // 如果去登录页面直接方形
  if(to.path==='/login')
  {
    return next()
  }
  // 如果没有token进入登录页面
  if(!localStorage.getItem("token"))
  {
    return next("/login")
  }
  else{
    // 如果有token判断是否有用户列表
    if (store.state.userRouteData.length === 0) { // 判断当前用户是否已拉取完user_info信息
      getUserRouteData().then((res)=>{
        filterRouter(res.data.data.router)
        router.options.routes = res.data.data.router
        router.addRoutes(res.data.data.router)
      })
    }
  }
  next()
});

function filterRouter(routers) {
  const accessedRouters = routers.filter(route => {
  if (route.component) {
      route.component = _import(route.component)
  }
  if (route.children && route.children.length>0) {
      route.children = filterRouter(route.children)
  }
  return true
})
store.commit("addUserRoute",accessedRouters)
return accessedRouters
}
function _import (file) {
  return () => import("@/views/" + file + ".vue")
}

router.afterEach(transition => {
  //结束进度条
  NProgress.done();
});

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3, // 初始化时的最小百分比
  background:'red'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
