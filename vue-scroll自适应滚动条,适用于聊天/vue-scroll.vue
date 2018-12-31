<template>
	<div ref="box" class="scrollbar_box" 
		@wheel="scroll" 
		@mouseenter="mouseenter($event)"
		@mouseleave="mouseleave($event)">
		
		<div ref="container" class="scrollbar_container" 
			:style="{ transform : `translate(0px, ${top*-1}px)` }">
			<slot></slot>
		</div>
		
		<div ref="scrollbarPath" class="scrollbar_path" 
			v-show="isVerticalBtn" 
			:class="{on: verticalCur}">
			
			<div ref="verticalBtn" 
				class="scrollbar_verticalBtn" 
				:style="{ height: `${barHeight}%`, top : `${barTop}%` }" 
				@mousedown="startmoveV">
			</div>
		</div>
	</div>
</template>

<script>
	import ElementResizeDetectorMaker from 'element-resize-detector'
	export default {
		data() {
			return {
				top: 0, //box偏移量px
				
				barHeight: 0, //竖直滚动条高度
				barTop: 0, //竖直滚动条上下偏移量%
				
				isVerticalBtn: false, //竖直滚动条是否显示
				verticalCur: false,  //鼠标悬浮滚动条显示

				isStartmoveV: false, //点击拖拽垂直标志位

				point: { //相对拖快左上角的x,y坐标
					y: 0
				},
				
				boxPoint: { // 4个角容器的坐标
					minY: 0
				}
			}
		},
		props: {
			speed: { //鼠标滚轮速度
				type: Number,
				default: 20
			},

			changeTop: { //上下偏移量 px
				type: Number,
				default: 0
			},
			
			containerH:{  //滚动区域高度
				type: Number,
				default: 0
			}
		},
		watch: {
			changeTop() { // 当外面传这个发送变化时就让到这个位置
				this.setbarTop();
				this.setbarHeight();
			}
		},
		computed: {},
		methods: {
			mouseenter() {
				this.verticalCur = true;
			},
			mouseleave() {
				setTimeout(() => {
					this.verticalCur = false;
				}, 1000)
			},
			// 滚动
			scroll(e) {
				this.verticalCur = true;
				if(this.isVerticalBtn) {
					e.preventDefault();
					e.stopPropagation();
				} else {
					return false;
				}
				let speed = this.speed;
				
				//如果delta的值是负的，那么滚轮就是向下滚动，正的就是向上
				let scrollY = e.deltaY > 0 ? speed * 1 : speed * -1;

				let nextY = this.top * 1 + scrollY;

				// 如果没有垂直的滚动条就滚动横向的
				if(this.isVerticalBtn) {
					this.setVerticalScroll(nextY)
				}
			},
			//val是偏移量 滚动的 
			setVerticalScroll(val) { 
				let size = this.getSize();
				let topEnd = size.containerHeight - size.boxHeight;
				if(val >= topEnd) {
					val = topEnd;
					if(this.top == val) { // 已经到底部就不用继续执行了
						return false;
					}
					this.$emit('bottom');
				};
				if(val <= 0) {
					val = 0;
					if(this.top == val) { // 已经到顶部就不用继续执行了
						return false;
					}
					this.$emit('top');
				}
				this.top = val;
				this.$emit('update:changeTop', this.top);
				this.$emit('update:containerH', size.containerHeight);
				this.barTop = (val / size.containerHeight) * 100; // 导航条的top的计算 
			},
			// 垂直btn点击后的事件
			startmoveV(e) {
				this.verticalCur = true;
				e.preventDefault(); //阻止默认事件，取消文字选中
				var verticalBtnReat=this.$refs.verticalBtn.getBoundingClientRect()  //获取滑块的坐标
				this.point.y = e.clientY-verticalBtnReat.top
				
				this.isStartmoveV = true //鼠标按下标志位
				
				document.addEventListener('mousemove', this.fnMousemoveV, false);
				document.addEventListener('mouseup', this.fnMouseup, false);
			},
			// 垂直移动监听
			fnMousemoveV(e) {
				this.verticalCur = true;
				e.preventDefault();
				if(this.isStartmoveV) {
					this.setVerticalClick(e.clientY - this.point.y);   //鼠标移动位置
				}
			},
			// 点击拖拽设置
			setVerticalClick(val) {
				this.verticalCur = true;
				let size = this.getSize();
				
				//计算出拖快top值换算成百分比
				let barTop = ((val - this.boxPoint.minY) / this.$refs.box.clientHeight) * 100; 
				if(barTop <= 0) {
					barTop = 0;
					if(this.barTop == barTop) {
						return false;
					}
					this.$emit('top');
				}
				if(barTop + this.barHeight >= 100) {
					barTop = 100 - this.barHeight;
					if(this.barTop == barTop) {
						return false;
					}
					this.$emit('bottom');
				}
				this.barTop = barTop; // 这里是百分比的需要转换
				this.top = ((barTop / 100) * size.containerHeight).toFixed(2) * 1; //换算百分百
				this.$emit('update:changeTop', this.top);
				this.$emit('update:containerH', size.containerHeight);
			},
			// 鼠标抬起监听
			fnMouseup(e) {
				e.preventDefault();
				this.isStartmoveV = false;
				this.clearMousemove();
			},
			// 清除监听
			clearMousemove() {
				document.removeEventListener('mousemove', this.fnMousemoveV, false);
				document.removeEventListener('mouseup', this.fnMouseup, false);
			},
			// 返回盒子尺寸
			getSize() { 
				let _container = this.$refs.container;
				let _box = this.$refs.box;
				return {
					containerHeight: _container.clientHeight, //滚动内容的高度宽度
					containerWidth: _container.clientWidth,

					boxHeight: _box.clientHeight, //最外面盒子的高度宽度
					boxWidth: _box.clientWidth,
				}
			},
			setbarHeight() { //设置拖快高度
				let size = this.getSize();
				let boxPoint = this.$refs.box.getBoundingClientRect(); // container的极坐标
				
				// 保存box窗口坐标
				this.boxPoint.minY = boxPoint.top;
				
				// 计算拖拽条的宽高
				this.barHeight = (size.boxHeight / size.containerHeight) * 100; //100是百分比，box的高度是100%,比例计算
				
				// 是否显示拖拽条
				this.isVerticalBtn = (this.barHeight >= 100 && !!this.barHeight) ? false : true;
				if(!this.isVerticalBtn) {  //不显示滚动条清0 
					this.top = 0;
					this.barTop = 0;
				}
			},
			setbarTop() {
				if(this.top == this.changeTop) return false;
				let size = this.getSize();
				let topEnd = size.containerHeight - size.boxHeight;
				if(this.changeTop < 0) {
					this.top = 0;
				} else if(this.changeTop >= topEnd) {
					this.top = topEnd;
				} else {
					this.top = this.changeTop;
				}
				this.barTop = ((this.top * 100) / size.containerHeight) * 1;
			},
			resizeListener() {
				let elementResizeDetector = ElementResizeDetectorMaker({
					strategy: 'scroll',
					callOnAdd: false
				})
				
				elementResizeDetector.listenTo(this.$refs.container, () => {
					var newcontainerH = this.$slots.default[0]['elm']
					if(this.top==0){
						console.log(newcontainerH.clientHeight-this.containerH)
						var top=newcontainerH.clientHeight-this.containerH;
						this.$emit('update:changeTop', top);
					}
					
				})
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.setbarTop();
				this.setbarHeight();
				
				this.resizeListener();
			});
		},
		updated() { //由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
			this.$nextTick(() => {
				this.setbarTop();
				this.setbarHeight();
			});
		}
	}
</script>

<style scoped lang="less">
	.scrollbar_box {
		overflow: hidden;
		position: relative;
		height: 100%;
		width: 100%;
		transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000;
		transform: translate3d(0, 0, 0);
		.scrollbar_path {
			position: absolute;
			top: 0px;
			right: 0px;
			width: 6px;
			height: 100%;
			background-color: white;
			opacity: 0;
			transition: opacity 500ms;
			&.on {
				opacity: 1;
			}
			.scrollbar_verticalBtn {
				position: absolute;
				top: 0px;
				right: 0px;
				width: 6px;
				border-radius: 3px;
				background-color: #51555e;
				cursor: pointer;
				z-index: 50;
				&:hover {
					background-color: green;
					z-index: 51;
				}
			}
		}
	}
</style>