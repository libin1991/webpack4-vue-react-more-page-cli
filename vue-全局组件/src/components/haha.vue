<template>
	<div id="app">
		<img src="@/assets/logo.png">
		<li v-for="item in images">
			<h3>Image: {{ item }}</h3>
			<img :src="imgUrl(item)">
		</li>
	</div>
</template>

<script>
	var imagesContext = require.context('@/assets/kittens/', false, /\.jpg$/);
	console.log(imagesContext)
	console.log(imagesContext('./kitten1.jpg'))
	console.log(imagesContext.keys())
	export default {
		created: function() {
			this.images = imagesContext.keys();
		},
		name: 'haha',
		data() {
			return {
				images: [],
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
			imgUrl: function(path) {
				//console.log('Path:' + path);
				return imagesContext(path)
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>