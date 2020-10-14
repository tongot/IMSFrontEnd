import axios from "axios"

const state={
dashCount:null,
loadingDash:false,
dashError: null,
}
const getters={
get_dashCounts:(state)=>state.dashCount,
get_loadingDash:(state)=>state.loadingDash,
get_dashError:(state)=>state.dashError,
}

const actions={
   async GetDashCounts({commit})
   {
       state.loadingDash = true;
       await axios.get('dashboard/getCounts')
       .then((response)=>{
           if(response.status==200){
               state.loadingDash= false;
                commit('set_dashCount',response.data.data)
           }
       },e=>{
           state.loadingDash = true;
            state.dashError = e.response.dashError;
       }).catch((ex)=>{
           alert(`failed to load dashboard ${ex}`);
       })
   }
}
const mutations={
    set_dashCount:(state,data)=>state.dashCount = data,
}
export default{
    state,
    getters,
    actions,
    mutations,
}