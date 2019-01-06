import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import txt from './file.txt';
console.log(txt)
new Vue({
    router,
    el:"#app",
    render:(e)=>e(App)
});

