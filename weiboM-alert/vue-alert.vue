<template>
	<div class="mask vue-alert">
		<div class="alert">
			<div class="title1">{{title1}}</div>
			<p class="title2">{{title2}}</p>
			<div class="btnlist onepx-top-border">
				<div class="ok" @click="ok">完成</div>
				<div class="abort onepx-left-border" @click="abort">分享到微博</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title1: "",
				title2: "",
			};
		},
		created() {

		},
		methods: {
			ok() {
				this.success && this.success();
				this.removeAlert(); //清除弹框
			},
			abort() {
				this.fail && this.fail()
				this.removeAlert(); //清除弹框
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
		position: fixed;
		left: 0px;
		top: 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
		.alert {
			width: 5.8rem;
			overflow: hidden;
			background: rgba(252, 252, 252, 1);
			border-radius: 0.1rem;
			.title1 {
				font-size: 0.36rem;
				padding: 0.35rem 0rem;
				color: #333333;
				text-align: center;
			}
			.title2 {
				font-size: 0.26rem;
				padding: 0rem 0rem 0.4rem;
				color: #797979;
				text-align: center;
			}
			.btnlist {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 0.28rem;
				height: 0.9rem;
				position: relative;
				.ok {
					flex: 1;
					height: 0.9rem;
					line-height: 0.9rem;
					text-align: center;
					color: #636363;
				}
				.abort {
					position: relative;
					flex: 1;
					line-height: 0.9rem;
					height: 0.9rem;
					text-align: center;
					color: #FF8200;
				}
			}
		}
	}
</style>