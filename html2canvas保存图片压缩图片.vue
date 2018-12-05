<template>
	<div class="result flex">
		<div class="header flex">
			<img alt class="title" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhgAAACbCAYAAAAgP+JPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOTU0NTZjMy00Y2UzLTRlM2UtYTg3ZS05NjY1ZjYzYjI4NDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjY0Q0MyRkFFQ0JEMTFFODgwODI5QUU4Qjc4MjFFRUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjY0Q0MyRjlFQ0JEMTFFODgwODI5QUU4Qjc4MjFFRUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTcyODM2NjktY2M5My00OWUxLTg0N2EtODUxNjdlNjA3YjNhIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6N2MyMTlmNzktZjE3Mi1kODQ5LWFhMWQtNmFi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">
			<div class="cutting mt10"></div>
		</div>
		<ul class="content font30">
			<li class="contentitem">
				<ul class="flex itemcontain">
					<li></li>
					<li>电影</li>
					<li>大V推荐度</li>
				</ul>
			</li>
			<li class="contentitem" v-for="(item,k) of checklist" :key="k">
				<ul class="flex itemcontain lists">
					<li>
						<i class="num">{{k+1}}</i>
					</li>
					<li>{{item.name}}</li>
					<li>
						<i class="percent">{{item.rec}}</i>
					</li>
				</ul>
			</li>
		</ul>
		<div class="footer flex">
			<img class="wblogo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAmCAYAAAAhpX7HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyOTU0NTZjMy00Y2UzLTRlM2UtYTg3ZS05NjY1ZjYzYjI4NDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUU1QzY3OTZFQkM4MTFFOEJFMzQ4MUM2OTZCQTIyQjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUU1QzY3OTVFQkM4MTFFOEJFMzQ4MUM2OTZCQTIyQjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDAzY2Q1YWItN2Y1My00NmVjLTlkMzYtOTZmN2FhOTFjMjhiIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NzhiODM2ZWMtNGQxNy0yOTRjLWFiZDEtMjQ3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" alt>
			<p class="tips" @click="print">※大V推荐度截至2018年11月30日</p>
		</div>
	</div>
</template>
<script>
	import html2canvas from "html2canvas";
	export default {
		props: ["checklist"],
		data() {
			return {
				output: ""
			};
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			async $html2canvas(el, options = {}) {
				const {
					type
				} = options;
				const canvas = await html2canvas(el, {
					useCORS: true
				});
				try {
					if(type && type === "dataURL") {
						return canvas.toDataURL("image/png");
					} else {
						console.warn("warn");
						return canvas;
					}
				} catch(err) {
					console.log("err");
					console.log(err);
				}
				return canvas;
			},

			async print() {
				const el = document.getElementById("invite");
				var width = el.offsetWidth * 0.8;
				var height = el.offsetHeight * 0.8;
				const options = {
					type: "dataURL",
					useCORS: true,
					logging: true,
					taintTest: false,
					allowTaint: false,
					width: el.offsetWidth * 0.8,
					height: el.offsetHeight * 0.8
				};
				var output = await this.$html2canvas(el, options);
				this.ImgToBase64(output, width, height);
			},
			ImgToBase64(base64, width, height) {   //压缩图片
				var that = this;
				var img = new Image();
				img.src = base64;
				img.onload = function() {
					var rate = 0.8;   //压缩图片
					img.width = width * rate;
					img.height = height * rate;
					//生成canvas
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					canvas.width = img.width;
					canvas.height = img.height;
					ctx.drawImage(img, 0, 0, img.width, img.height);
					var base64 = canvas.toDataURL('image/jpeg', 0.95);
					that.output = base64;
					that.$nextTick(() => {
						setTimeout(() => {
							that.$emit("savaImg", that.output);
						}, 0)
					})
					console.log('that.output')
					console.log(that.output)
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.result {
		color: #fff;
		flex-direction: column;
		align-items: stretch;
		height: 100%;
		.mt10 {
			margin-top: 0.1rem;
		}
		.font24 {
			font-size: 0.24rem;
		}
		.font30 {
			font-size: 0.3rem;
		}
		&.show {
			top: 0;
		}
		.header {
			margin-top: 1.3rem;
			flex-direction: column;
			align-items: center;
			margin-bottom: 0.35rem;
			.title {
				width: 5rem;
			}
			.cutting {
				width: 1.4rem;
				height: 0.08rem;
				margin-top: 0.2rem;
				background: #fff;
			}
		}
		.content {
			color: #fff;
			font-weight: bold;
			padding: 0 0.15rem 0 0.3rem;
			.contentitem {
				.itemcontain {
					justify-content: space-between;
					height: 0.6rem;
					align-items: center;
					&>li {
						&:first-child {
							width: 0.6rem;
						}
						&:nth-child(2) {
							flex: 1;
							text-align: center;
							border-radius: 0.4rem;
							margin-right: 0.1rem;
						}
						&:last-child {
							width: 1.5rem;
						}
					}
					&.lists {
						margin-bottom: 0.15rem;
						&>li {
							background: #fff;
							color: #00057f;
							&:first-child {
								margin-right: 0.2rem;
								background: transparent;
								box-sizing: border-box;
								width: 0.6rem;
								height: 0.6rem;
								border: 0.05rem solid #fff;
								border-radius: 50%;
								position: relative;
								.num {
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
									margin: 0 auto;
									text-align: center;
									line-height: 0.4rem;
									background: #fff;
									width: 0.4rem;
									height: 0.4rem;
									border-radius: 50%;
									display: inline-block;
								}
							}
							&:last-child {
								background: transparent;
								text-align: center;
								.percent {
									background: #fff;
									display: inline-block;
									border-radius: 0.4rem;
									width: 1.2rem;
								}
							}
						}
					}
				}
			}
		}
		.footer {
			position: absolute;
			bottom: 0;
			left: 50%;
			flex-direction: column;
			align-items: center;
			font-size: 0.24rem;
			transform: translate(-50%, 0);
			.wblogo {
				margin-top: 0.3rem;
				width: 1.3rem;
			}
			.tips {
				margin-top: 0.25rem;
				margin-bottom: 0.25rem;
				white-space: nowrap;
			}
		}
	}
</style>