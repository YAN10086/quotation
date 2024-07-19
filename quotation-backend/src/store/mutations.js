let mutations = {
    dis_testFun(state,name) { 
        state.myname = name;
    },
    setUserType(state,userType){
        state.userType=userType;
        console.log("拿到登陆人员类型type为："+ userType+",vuex赋值成功值为："+state.userType);
    }
}

export default mutations;