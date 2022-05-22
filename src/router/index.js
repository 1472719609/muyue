import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../views/Layout/index.vue"
import Login from "../views/Login/Login.vue"
import Home  from "../views/Home/index.vue"

const Goods = () => import('../views/Goods/Goods.vue')
const Parms = () => import('../views/Parms/Parms.vue')
const Advert = () => import('../views/Advert/Adevert.vue')
const Order = () => import('../views/Order/index.vue')
const OrderList = () => import('../views/Order/OrderList/OrderList.vue')
const OrderOut = () => import('../views/Order/OrderOut/OrderOut.vue')
const AddGoods = () => import('../views/Goods/AddGoods.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: "",
    component: Layout,
    children:[
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path:"/Goods",
        name:"Goods",
        component: Goods
      },
      {
        path: "/AddGoods",
        name:"AddGoods",
        component: AddGoods
      },
      {
        path: "/Advert",
        name: "Advert",
        component: Advert
      },
      {
        path:"/Parms",
        name:"Parms",
        component: Parms
      },
      {
        path:"/Order",
        name:"Order",
        redirect:"/Order/OrderList",
        component: Order,
        children:[
          {
            path:"/Order/OrderList",
            name:"OrderList",
            component: OrderList
          },
          {
            path:"/Order/OrderOut",
            name:"OrderOut",
            component: OrderOut
          }
        ]
      }

    ]
  },
  {
    path: "/Login",
    name: "Login",
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
