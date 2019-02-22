<template>
	<div class="page2">
		<button @click="goBack">返回</button>
		<p>{{msg}}</p>
		<p>{{str}}</p>
		<router-link to="page3">跳转到下一个页面</router-link>
	</div>
</template>

<script>
	export default {
		name: "page2",
		data() {
			return {
				msg: "我是第二个页面",
				str: "",
				isFirstEnter: false
			};
		},
		methods: {
			getData() {
				console.warn("我调用第二个页面getData方法了");
				this.str = "我是通过调用方法加载的数据。。。";
			},
			goBack() {
				this.$router.go(-1);
			}
		},
		beforeRouteEnter(to, from, next) {
			console.log('我是第二个页面的beforeRouteEnter方法')
			if(from.name == 'page3') {
				to.meta.isBack = true;
			}
			next()
		},
		created() {
			console.log("我是第二个页面的 created 方法");
			this.isFirstEnter = true;
		},
		mounted() {
			console.log("我是第二个页面的 mounted 方法");
		},
		activated() {
			console.log("我是第二个页面的 activated 方法");
			if(!this.$route.meta.isBack || this.isFirstEnter) {
				this.str = ''
				this.getData();
			}
			this.$route.meta.isBack = false
			this.isFirstEnter = false;
		},
		deactivated() {
			console.log("我是第二个页面的 deactivated 方法");
		},
		destroyed() {
			console.log("我是第二个页面的 destroyed 方法");
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>