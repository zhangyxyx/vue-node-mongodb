import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
    dataId:0,
};
export default new Vuex.Store({
    state,
    mutations:{
        changeId(state,payload){
            state.dataId=payload
        }
    }
})