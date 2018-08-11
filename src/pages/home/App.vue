<template>
	<div class="index">
		<drag-table :tableData="answerData" :rowData="rowData" tablekey="q_id" @sortHandle="sortHandle"></drag-table>
	</div>
</template>

<script>
	import DragTable from './DragTable'
	export default {
		data() {
			return {
				answerData: [{
						q_id: 10,
						title: '111111111',
						correct_answer: 'A'
					},
					{
						q_id: 11,
						title: '222222222',
						correct_answer: 'B'
					},
					{
						q_id: 12,
						title: '333333333',
						correct_answer: 'C'
					},
					{
						q_id: 13,
						title: '444444444',
						correct_answer: 'D'
					}
				],
				rowData: [{
						title: 'id',
						value: 'q_id'
					},
					{
						title: '题目内容123',
						value: 'title'
					},
					{
						title: '正确答案',
						value: 'correct_answer'
					}
				]
			}
		},
		components: {
			DragTable
		},
		mounted() {},
		methods: {
			sortHandle(val) {
				console.log('排序后的操作');
				console.log(val);
			}
		}
	}
</script>

<style lang="less">
	/* reset */
	
	*,
	*:before,
	*:after {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	html {
		height: 100%;
		-webkit-text-size-adjust: 100%;
	}
	
	body,
	ul,
	ol,
	li,
	dl,
	dt,
	dd,
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	form,
	input {
		margin: 0;
		padding: 0;
	}
	
	input,
	select,
	textarea {
		outline: none;
	}
	
	textarea {
		resize: none;
		font-family: "microsoft yahei";
	}
	
	ul,
	ol {
		list-style: none;
	}
	
	i,
	em {
		font-style: normal;
	}
	
	a {
		text-decoration: none;
		color: #459ae9;
		cursor: pointer;
	}
	
	a:active,
	a:visited,
	a:focus {
		outline: none;
	}
	
	// a:hover { text-decoration: underline;}
	img {
		border: none;
		display: block;
	}
	
	table {
		border-spacing: 0;
		table-layout: fixed;
	}
	
	body {
		height: 100%;
		position: relative;
		font: 14px/1.5 "PingFangSC-Regular", "microsoft yahei", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		word-wrap: break-word;
	}
	
	input::-ms-clear {
		display: none;
	}
	
	input::-ms-reveal {
		display: none;
	}
</style>