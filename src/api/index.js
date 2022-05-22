import axios from 'axios'
import base from "./base";
const api = {
    getGoodsList(params) {
        return axios.get(base.goodsList,{
            params
        })
    },
    searchGoods(params) {
        return axios.get(base.search,{
            params
        })
    },
    getGoods(params) {
        return axios.get(base.goods,{
          params
        })
    },
    addGoods(params={}) {
        return axios.post(base.AddGoods,params)
    },

}
export default api