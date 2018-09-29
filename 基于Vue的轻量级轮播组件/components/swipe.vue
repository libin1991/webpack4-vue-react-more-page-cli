<template>
	<div class="c-swipe" @touchstart="handleTouchstart" @touchmove="handleTouchmove" @touchend="handleTouchend" @touchcancel="handleTouchend">
		<div class="c-swipe-wrapper" ref="wrapper">
			<slot></slot>
		</div>
		<div v-if="pagination" class="c-swipe-pagination">
			<div class="c-swipe-pagination-bar">
				<i v-for="item in length" :class="['c-swipe-pagination-item', item - 1 === insideValue ? 'active': '']" :key="item"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'swipe',

		data() {
			return {
				hasMounted: false,
				insideValue: this.value,
				pages: [], // cards dom list
				width: 0,
				length: 0,
				inited: false,

				startx: 0,
				moveDistance: 0,
				touchStartTime: 0,
				moving: false,

				starty: 0,
				firstMove: true,
				horizontalMove: true,

				copyNum: 2,
				autoplayTimer: null,
			};
		},

		props: {
			value: {
				type: Number,
				default: 0,
			},
			pagination: { // 默认导航器
				type: Boolean,
				default: true,
			},
			autoplayTime: { // 自动轮播时间间隔
				type: Number,
				default: 0,
			},
			loop: { // 循环滑动
				type: Boolean,
				default: true,
			},
			minMoveDistance: { // 成功触发切换 item 的最小滑动距离
				type: String,
				default: '20%',
			},
			quickTouchTime: { // 快速滑动时只要距离大于 10px 便可以触发滑动
				type: Number,
				default: 150,
			},
			speed: { // 切换屏幕的速度
				type: Number,
				default: 300,
			},
			// follow: {   // 卡片是否跟随指尖移动而滑动
			//   type: Boolean,
			//   default: true,
			// },
			// free: {     // 自由滑动模式 NOT OPEN
			//   type: Boolean,
			//   default: false,
			// },
			// flexible: {  // 卡片拉倒底部后是否能拉出底色
			//   type: Boolean,
			//   default: false,
			// },
		},

		computed: {
			c_minMoveDistance() {
				let value = this.minMoveDistance;
				let mode = '';

				if(/px$/.test(value)) {
					mode = 'pixel';
				} else if(/^\d+$/.test(value)) {
					mode = 'pixel';
				} else if(/%$/.test(value)) {
					mode = 'percent';
				} else {
					value = '20%';
					mode = 'percent';
				}

				const stgy = {
					pixel() {
						const parsedValue = parseInt(value, 10);
						return `${value}px`;
					},
					percent() {
						const parsedValue = parseInt(value, 10) / 100;
						return this.width * parsedValue;
					},
				};

				return stgy[mode].apply(this);
			},

			// 滑动结束后 translatex 的值
			c_translatex() {
				return -this.width * this.insideValue;
			},

			c_isEnd() {
				return this.insideValue === this.length - 1;
			},

			c_isBegin() {
				return this.insideValue === 0;
			},
		},

		watch: {
			insideValue(val) {
				if(val !== this.value) {
					this.$emit('input', val);
				}
				this.valueChangeHandler(val);
			},

			value(val) {
				this.insideValue = val;
			},

			autoplayTime() {
				this.autoChange();
			},
		},

		mounted() {
			this.hasMounted = true;
			this.init();
			this.initOnce();
		},

		destroyed() {
			clearTimeout(this.autoplayTimer);
		},

		methods: {
			reset() {
				this.init();
				this.initOnce();
			},

			init() {
				// 如果组件 mounted 前 init 方法被调用，则会引起报错。
				// 因此使用 hasMounted 变量来保证不会报错。
				if(!this.hasMounted) return;

				// 设置部分 datas 的值
				const success = this.initDatas();

				if(!success) {
					// Failed to init datas
					return;
				}

				// 为 wrapper 定宽
				this.$refs.wrapper.style.width = `${this.width}px`;

				// 复制首尾 dom
				this.clearCopies();
				this.addCopies();

				// 自动轮播
				if(this.autoplayTime > 0) {
					this.autoChange();
				}
			},

			initOnce() {
				this.setTranslate(this.c_translatex);
			},

			initDatas() {
				const style = getComputedStyle(this.$el, false).width;
				this.width = parseInt(style, 10);

				if(!this.$slots.default) {
					// console.warn('No child nodes in swipe component', this.$el);
					return false;
				}

				this.pages = this.$slots.default
					.filter(vnode => vnode.tag && vnode.elm.classList.contains('c-swipe-item'))
					.map(vnode => vnode.elm);

				if(!this.pages.length) {
					// console.warn('The swipe component not contained swipe-item component', this.$el);
					return false;
				}

				this.length = this.pages.length;

				return true;
			},

			clearCopies() {
				const children = this.$refs.wrapper.querySelectorAll('.c-swipe-item-copy');
				[...children].forEach(el => {
					this.$refs.wrapper.removeChild(el);
				}, this);
				this.$refs.wrapper.style.marginLeft = '0';
			},

			addCopies() {
				const fronts = [];
				const ends = [];
				// copy 前两个和最后两个元素
				this.pages.forEach((item, index) => {
					if(index < 2) {
						const copy = item.cloneNode(true);
						copy.classList.add('c-swipe-item-copy');
						fronts.push(copy);
					}
					if(index > this.pages.length - 3) {
						const copy = item.cloneNode(true);
						copy.classList.add('c-swipe-item-copy');
						ends.push(copy);
					}
				}, this);

				this.copyNum = ends.length;
				// insert node
				while(ends.length) {
					const item = ends.pop();
					const firstNode = this.$refs.wrapper.querySelector('.c-swipe-item');
					this.$refs.wrapper.insertBefore(item, firstNode);
				}

				while(fronts.length) {
					const item = fronts.shift();
					this.$refs.wrapper.appendChild(item);
				}

				this.$refs.wrapper.style.marginLeft = `-${this.width * this.copyNum}px`;
			},

			handleTouchstart(e) {
				if(this.length <= 1 || this.moving) return;
				this.startx = e.touches[0].pageX;
				this.starty = e.touches[0].pageY;
				this.touchStartTime = new Date().getTime();
				if(this.autoChange) {
					this.autoChange(); // 重置自动轮播的计时器
				}
				this.firstMove = true;
			},

			handleTouchmove(e) {
				if(this.length <= 1 || this.moving) return;
				this.moveDistance = e.touches[0].pageX - this.startx;

				// 判断用户是横向滑动还是纵向滑动，以此来避免误滑
				if(this.firstMove) {
					this.firstMove = false;
					const moveY = e.touches[0].pageY - this.starty;
					this.horizontalMove = Math.abs(this.moveDistance) >= Math.abs(moveY);
				}

				// 用户非水平滑动屏幕
				if(!this.horizontalMove) {
					return;
				}

				e.preventDefault();

				const translate = this.c_translatex + this.moveDistance;
				// 正常触摸应该移动的距离
				let finalTranslate = translate;
				// 考虑 loop 的取值时
				finalTranslate = this.handleTouchmove_loop(translate);
				this.setTranslate(finalTranslate);
			},

			handleTouchend(e) {
				if(this.length <= 1 || this.moving) return;
				if(!this.horizontalMove) return;

				const isQuick = new Date().getTime() - this.touchStartTime < this.quickTouchTime;

				if(this.loop) {
					// 如果是 loop 的话，有很多地方需要特殊处理
					this.handleTouchend_loop(this.cartChange(this.moveDistance, isQuick));
				} else {
					// 根据轮播图滑动的方向来改变 insideValue
					this.updateInsideValue(this.cartChange(this.moveDistance, isQuick));
				}

				// reset some data
				this.moveDistance = 0;
			},

			// 考虑 this.loop 的取值对 translate 的影响
			handleTouchmove_loop(translate) {
				if(this.loop) {
					return translate;
				}
				const leftBoundary = 0;
				const rightBoundary = -this.width * (this.length - 1);
				// 左边界
				if(translate > leftBoundary) {
					return leftBoundary;
				}
				// 右边界
				if(translate < rightBoundary) {
					return rightBoundary;
				}
				// normal
				return translate;
			},

			// 考虑 this.loop 的取值对 translate 的影响
			handleTouchend_loop(deviation) {
				if(!this.loop) return;
				const newValue = this.insideValue + deviation;

				// left boundary
				if(this.insideValue === 0 && newValue < this.insideValue) {
					this.setTranslate((-this.width * this.length) + this.moveDistance);
					setTimeout(() => {
						this.updateInsideValue(deviation);
					}, 40);
					return;
				}

				// right boundary
				if(this.insideValue === this.length - 1 && newValue > this.insideValue) {
					this.setTranslate(this.width + this.moveDistance);
					setTimeout(() => {
						this.updateInsideValue(deviation);
					}, 40);
					return;
				}

				this.updateInsideValue(deviation);
			},

			/**
			 *  根据传入的差值来正确的更新 insideValue
			 *  @param  {number} deviation value 改变的差值
			 */
			updateInsideValue(deviation) {
				// 因为滑动后如果没有翻页成功，是无法改变 insideValue 的值的，所以需要手动触发 handler
				if(deviation === 0) {
					this.valueChangeHandler(deviation);
					return;
				}

				// 新的 insidevalue 值应该是现在 insideValue 的值 和 改变的差值的和
				const newValue = this.insideValue + deviation;

				// 按顺序查看是否满足处理数据的要求，如果不满足则交给下一个函数处理
				const chain = this.chain(
					// 是否是 loop
					this.updateInsideValue_loop,
					// 什么特殊的设置都没有
					this.updateInsideValue_normal,
					// 通过更新 insideValue 来触发 valueChangeHandler
					newValue => {
						this.insideValue = newValue;
					},
				);

				chain(newValue);
			},

			// 当考虑到 loop 的情况时
			updateInsideValue_loop(newValue) {
				if(!this.loop) return false;
				if(newValue < 0) {
					this.insideValue = this.length - 1;
					return 'done';
				}
				if(newValue > this.length - 1) {
					this.insideValue = 0;
					return 'done';
				}
				return false;
			},

			// 普通状态下， loop === false
			updateInsideValue_normal(newValue) {
				if(newValue < 0) {
					this.insideValue = 0;
					// 因为这时候 insideValue 的值其实没变，所以需要手动触发 valueChangeHandler
					this.valueChangeHandler(0);
					return 'done';
				}

				if(newValue > this.length - 1) {
					this.insideValue = this.length - 1;
					// 因为这时候 insideValue 的值其实没变，所以需要手动触发 valueChangeHandler
					this.valueChangeHandler(this.length - 1);
					return 'done';
				}

				return false;
			},

			cartChange(moveDistance, quick) {
				const absMove = Math.abs(moveDistance);
				const absMin = Math.abs(this.c_minMoveDistance);

				// 策略组
				const strategies = {
					// 普通滑动
					normal() {
						if(absMove < absMin) return 0;
						if(moveDistance > 0) return -1;
						if(moveDistance < 0) return 1;
						return 0;
					},
					// 快速滑动
					quick() {
						if(absMove < 10) return 0;
						if(moveDistance > 0) return -1;
						if(moveDistance < 0) return 1;
						return 0;
					},
				};

				let stgy = 'normal';
				// 当前策略
				switch(true) {
					case(quick === true):
						stgy = 'quick';
						break;
					default:
						stgy = 'normal';
						break;
				}

				return strategies[stgy].apply(this);
			},

			valueChangeHandler(value) {
				// 添加过渡效果
				this.duration();
				this.setTranslate(this.c_translatex);
			},

			// 自动轮播
			autoChange() {
				clearTimeout(this.autoplayTimer);
				const timer = () => {
					if(typeof this.autoplayTime !== 'number' ||
						this.autoplayTime <= 0 ||
						this.length <= 1
					) return;
					this.autoplayTimer = setTimeout(() => {
						this.autoChangeHandler();
						timer();
					}, this.autoplayTime);
				};
				timer();
			},

			autoChangeHandler() {
				// 如果是右边界，则先移动到左边被 copy 的相同的元素
				if(this.c_isEnd) {
					this.setTranslate(this.width);
				}

				// 如果不延迟 40 ms 的话，在 setTranslate 的时候，就会触发 transition 效果，这是不想要的。
				setTimeout(() => {
					this.insideValue = this.insideValue < this.length - 1 ?
						this.insideValue + 1 :
						0;
				}, 40);
			},

			/**
			 *  惰性函数，设置 dom 的 translate 值
			 *  @param  {dom}            el       进行变换的元素
			 *  @param  {number|string}  trans    进行变换的值
			 */
			setTranslate(d) {
				if('transform' in document.documentElement.style) {
					this.setTranslate = transform;
					this.setTranslate(d);
				} else {
					this.setTranslate = webkitTransform;
					this.setTranslate(d);
				}

				function transform(d) {
					this.$refs.wrapper.style.transform = `translate3d(${d}px, 0, 0)`;
					this.$refs.wrapper.style.transform = `webkikTranslate3d(${d}px, 0, 0)`;
				}

				function webkitTransform(el, d) {
					this.$refs.wrapper.style.webkitTransform = `translate3d(${d}px, 0, 0)`;
					this.$refs.wrapper.style.webkitTransform = `webkitTranslate3d(${d}px, 0, 0)`;
				}
			},

			/**
			 *  添加和删除过渡效果
			 *  @param  {Array} args 需要添加过渡动画的元素数组
			 */
			duration() {
				this.moving = true;
				const el = this.$refs.wrapper;
				const speed = this.speed;
				el.style.transitionDuration = `${speed}ms`;
				el.style.webkitTransitionDuration = `${speed}ms`;
				el.style.transitionTimingFunction = 'ease-out';
				el.style.webkitTransitionTimingFunction = 'ease-out';

				// 添加过渡效果
				clearTimeout(this.durationTimer);
				this.durationTimer = setTimeout(() => {
					el.style.transitionDuration = '';
					el.style.webkitTransitionDuration = '';
					this.moving = false;
				}, speed);
			},

			// 职责链，函数 return false 则终止传递
			chain(...fns) {
				return(...args) => {
					for(let index = 0; index < fns.length; index += 1) {
						const result = fns[index](...args);
						if(result === 'done') break;
					}
				};
			},
		},
	};
</script>

<style lang="postcss">
	.c-swipe {
		overflow: hidden;
	}
	
	.c-swipe-wrapper {
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	
	.c-swipe-item {
		width: 100%;
		height: 100%;
		flex: none;
	}
	
	.c-swipe-pagination {
		position: relative;
		height: 0;
	}
	
	.c-swipe-pagination-bar {
		position: absolute;
		left: 0;
		right: 0;
		top: -12px;
		bottom: 0;
		height: 4px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	
	.c-swipe-pagination-item {
		display: block;
		width: 8px;
		height: 4px;
		border-radius: 3px;
		background-color: rgb(181, 181, 181);
		margin: 0 3px;
		transition: all .1s;
	}
	
	.c-swipe-pagination-item.active {
		width: 20px;
		background-color: rgb(72, 163, 241);
	}
</style>