
<template>
    <div>
        <h1>注销</h1>
<Button @click="login">注销</Button>
<route_list></route_list>
    </div>
</template>

<script>
import route_list from '../components/route_list'
    export default {
        components:{
            route_list
        },
    data(){
        return{
           
        }
    },
      methods:{
         async login(){
            const result = await this.$http.get("/logout").then(data=>data.data);
            this.$store.commit('me/changeLogin',{result})

          }
        },
        
}
</script>

<style lang="lcss" scoped>

</style>