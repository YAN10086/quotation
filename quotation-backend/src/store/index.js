import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
//commit直接调用mutations
//this.$store.commit("methodNmae", value); //放入vuex
//dispatch通过actions然后调用mutations
//this.$store.commit("methodNmae", value); //放入vuex

const store=new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
export default store;