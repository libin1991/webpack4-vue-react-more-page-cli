<template>
	<div id="app">
		<at :members="members" name-key="name" v-model="html">

			<!--<template slot="item" scope="s">
				<span v-text="s.item.name"></span>   
			</template>-->

			<template slot="embeddedItem" slot-scope="s">
				<a target="_blank" :href="s.current.avatar" class="tag">@{{ s.current.name }}</a>
			</template>

			<template slot="item" slot-scope="s">
				<span v-text="s.item.name"></span>
			</template>

			<div class="editor" contenteditable></div>
		</at>
		<br/>
	</div>
</template>

<script>
	import At from './At.vue'
	let members = ["小明", "小花", "小浩", "小刚", "小龙", "小木", "小三"];
	members = members.map((v, i) => {
		return {
			avatar: 'https://weibo.com',
			name: v
		}
	})

	export default {
		components: {
			At
		},
		name: 'app',
		data() {
			return {
				members,
				html: ''//`<div>深度学习模型训练的过程本质是对weight（即参数W）进行更新，这需要每个参数有相应的初始值。</div><div>对一些简单的机器学习模型，或当optimization function是convex function时. </div>`
			}
		}
	}
</script>

<style>
	* {
		padding: 0px;
		margin: 0px;
		border: 0px;
	}
	
	li {
		list-style: none;
	}
	
	ul,
	ol {
		list-style-type: none;
	}
	
	select,
	input,
	img,
	select {
		vertical-align: middle;
	}
	
	img {
		border: none;
		display: inline-block
	}
	
	i {
		font-style: normal
	}
	
	a {
		text-decoration: none;
		-webkit-appearance: none;
	}
	 #app{
	 	margin-top: 0px;
	 }
	.editor {
		
		width: 400px;
		height: 200px;
		overflow: auto;
		
		white-space: pre-wrap;
		border: solid 1px rgba(0, 0, 0, .5);
	}
</style>