import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import List from "../components/List.vue";
Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {path:"/",redirect:"home"},
        {path:"/home",component:Home},
        {path:"/list",component:List},
        {path:"*",redirect:"home"}
    ]
});