import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRouteData:[]
  },
  mutations: {
    addUserRoute(state,obj)
    {
      state.userRouteData=obj
    }
  },
  actions: {
  },
  modules: {
  }
})
