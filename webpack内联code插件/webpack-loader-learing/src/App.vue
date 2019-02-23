<template>
    <div>
        {{msg}}
        <div>
            <router-link to="/home">首页</router-link>
            <router-link to="/list">列表页</router-link>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                msg:"Hello Vue!"
            }
        }
    }
</script>

<style scoped>
    a{
        color: #333;
        text-decoration: none;
    }
    .router-link-active{
        color: red;
    }
</style>