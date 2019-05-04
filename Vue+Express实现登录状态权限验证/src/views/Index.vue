<template>
    <div>
        <h1>主页</h1>
        <Button @click="getTest">敏感接口</Button>
        {{result}}
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
                result:""
            }
        },
        methods:{
         async getTest(){
             this.result = await this.$http.get("/").then(res=>res)
          }
        }
    }
</script>

<style lang="less" scoped>

</style>