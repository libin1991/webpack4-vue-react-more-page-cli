<template>
	<div v-if="test">
		<img @click="clickMe" src="@/assets/img/logo.png"/>
		<p class="red">{{msg}}</p>
		<Index></Index>
	</div>
	<Cao v-else></Cao>
	
</template>

<script>
	import Index from '@/components/Index.vue'
	import Test from './test'
	import Cao from './cao'
	export default {
		data() {
			return {
				test:0,
				msg: "Index"
			}
		},
		components: {
			 Index,Test,Cao
		},
		mounted(){
			setTimeout(()=>{
				this.test=1;
			},2000)
		},
		methods:{
			clickMe(){
				this.$http.get("/goods/list").then(data=>{
					console.log(data)
				})
			}
		}
	}
</script>