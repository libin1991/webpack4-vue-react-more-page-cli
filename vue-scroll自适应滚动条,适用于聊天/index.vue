<template>
	<div id="box">
		<scrollbar @bottom="bottom" @top="top" :changeTop.sync="changeTop" :containerH.sync="containerH">
			<div id="container">
				<!--<p>Vue自定义滚动条</p>-->
 				<div v-for="(str,index) in data"> {{str}} </div>
			</div>
		</scrollbar>
		
		<div id="loadingbox" v-show="isloading">loading...</div>
	</div>
</template>

<script>
	import scrollbar from './vue-scroll.vue'
	export default {
		components: {
			scrollbar
		},
		data() {
			return {
				data: [...Array(30).keys()],
				isloading: false,
				changeTop: 10000000,
				containerH:0
			}
		},
		methods: {
			top() {
				console.log('顶部');
				this.isloading = true;
				var newdata = [
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
				];
				setTimeout(() => {
					this.data = [...newdata,...this.data];
					this.isloading = false;
				}, 1500);
			},
			bottom() {
				return
				console.log('底部')
				this.isloading = true;
				var newdata = [
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
					'我是新加的数据',
				];
				setTimeout(() => {
					this.data = [...this.data,...newdata];
					this.isloading = false;
				}, 1500);
			}
		},
	}
</script>

<style>
	* {
		padding: 0px;
		margin: 0px;
	}
	
	#box {
		margin: 50px auto;
		text-align: center;
		width: 500px;
		height: 500px;
		border: 1px solid red;
		border-radius: 3px;
		position: relative;
	}
	
	#container {
		width: 100%;
	}
	
	#loadingbox {
		width: 100%;
		background: rgba(255, 255, 255, .8);
		position: absolute;
		left: 0;
		bottom: 0;
		text-align: center;
		font-weight: bold;
	}
</style>