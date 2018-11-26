<template>
	<div class="mask vue-alert">
		<div class="alert">
			<span class="icon"></span>
			<p>{{alertMsg||'确定删除该条数据吗?'}}</p>
			<div class="btn">
				<div class="ok hoverhands" @click="ok">确定</div>
				<div class="abort hoverhands" @click="abort">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				alertMsg: ''
			};
		},
		created() {

		},
		methods: {
			ok() {
			  this.okFun&&this.okFun();
			  this.removeAlert();  //清除弹框
			},
			abort() {
			   this.abortFun&&this.abortFun()
               this.removeAlert();  //清除弹框
			}
		},
		computed: {

		},
		components: {

		},
		directives: {

		},
	};
</script>

<style scoped="scoped" lang="less">
	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: absolute;
		left: 0px;
		top: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10000000;
		.alert {
			width: 362px;
			border-top: 3px solid #d1926f;
			background: #fff;
			.icon {
				background: url('../../assets/img/yellow.png');
				display: block;
				margin: 15px auto;
				background-repeat: no-repeat;
				background-position: center;
				background-size: 32px;
				display: block;
				margin: 15px auto 5px;
				width: 50px;
				height: 50px;
			}
			p {
				text-align: center;
				font-size: 14px;
			}
			.btn {
				margin-top: 20px;
				margin-bottom: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				.ok {
					font-size: 12px;
					width: 60px;
					height: 25px;
					line-height: 25px;
					color: white;
					text-align: center;
					background: #fe8242;
				}
				.abort {
					font-size: 12px;
					width: 60px;
					height: 25px;
					line-height: 25px;
					color: #525252;
					text-align: center;
					margin-left: 15px;
					background: #f2f2f2;
					border: 1px solid #ccc;
				}
			}
		}
	}
</style>