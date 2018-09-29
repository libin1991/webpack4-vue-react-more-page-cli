<template>
	<div>
		<h1 style="text-align: center">
      <a href="https://github.com/pspgbhu/Vue2-C-Swipe-Mobile">C-Swipe</a>
    </h1>
		<p style="text-align: center">基于 Vue 的轻量级轮播组件</p>
		<div class="container">
			<h3>自动轮播</h3>
			<p>支持自定义轮播间隔时间，和切屏速度。</p>
			<swipe class="slide" v-model="index1" :autoplayTime="4000" :speed="300">
				<swipe-item v-for="i in item1" :key="i" style="">number{{ i }}</swipe-item>
			</swipe>

			<h3>Loop 模式</h3>
			<p>默认 Loop 开启</p>
			<swipe class="slide" v-model="indexLoop">
				<swipe-item v-for="i in item1" :key="i" style="">number{{ i }}</swipe-item>
			</swipe>
			<p>关闭 Loop</p>
			<swipe class="slide" v-model="indexNoLoop" :loop="false">
				<swipe-item v-for="i in item1" :key="i" style="">number{{ i }}</swipe-item>
			</swipe>

			<h3>双向绑定数据</h3>
			<p>通过 v-model 双向绑定了轮播图的索引。轮播图自动切换时会因此 v-model 绑定的值的改变，同时也可以通过改变 v-model 的赋值来改变轮播图的索引。</p>
			<p>下面两个按钮显式的改变了 v-model 的值</p>
			<button class="btn" @click="index3 = index3 <= 0 ? 5 : index3 - 1">后退</button>
			<button class="btn" @click="index3 = index3 >= 5 ? 0 : index3 + 1">前进</button>
			<span>当前卡片索引 {{ index3 }}</span>
			<swipe class="slide" v-model="index3">
				<swipe-item v-for="i in itemCommon" :key="i" style="">number{{ i }}</swipe-item>
			</swipe>

			<h3>动态改变配置属性</h3>
			<p>充分发挥了响应式数据的特性，组件随时会根据配置 props 的改变而改变自身的表现</p>
			<button @click="isLoop = !isLoop">{{isLoop ? '关闭 Loop 模式' : '开启 Loop 模式'}}</button>
			<button @click="autoplay = autoplay ? 0 : 3000">{{autoplay ? '关闭自动轮播' : '开启自动轮播'}}</button>
			<button @click="pagination = !pagination">{{pagination ? '移除导航器' : '添加导航器'}}</button>
			<swipe class="slide" v-model="index4" :loop="isLoop" :autoplayTime="autoplay" :pagination="pagination">
				<swipe-item v-for="i in item1" :key="i" style="">number{{ i }}</swipe-item>
			</swipe>

			<h3>异步添加轮播图</h3>
			<button @click="itemAsync += 1">添加一个卡片</button>
			<button @click="decreaseHandler">减少一张卡片</button>
			<swipe class="slide" v-model="index5" ref="swipeAsync">
				<swipe-item v-for="i in itemAsync" :key="i" class="blue">number{{ i }}</swipe-item>
			</swipe>
		</div>
	</div>
</template>

<script>
	import Swipe from './components/swipe';
  import SwipeItem from './components/swipe-item';
	export default {
		data() {
			return {
				index1: 0,
				item1: 6,

				itemCommon: 6,
				indexLoop: 0,
				indexNoLoop: 0,
				index3: 0,
				index4: 0,

				isLoop: true,
				autoplay: 0,
				pagination: true,

				itemAsync: 6,
				index5: 0,
			};
		},

		mounted() {
			// 该轮播组件也支持异步渲染
			setTimeout(() => {
				this.item = 10;
			}, 6000);
		},
 components: {
    Swipe,SwipeItem
 },
		methods: {
			decreaseHandler() {
				this.itemAsync = this.itemAsync > 1 ? this.itemAsync - 1 : 1;
				// 避免删除卡片后，镜头落在轮播图外
				this.index5 = this.index5 >= this.itemAsync ? this.itemAsync - 1 : this.index5;
				// 删除卡片后，需要在 $nextTick 下手动调用 组件下的 reset 方法
				this.$nextTick(() => {
					this.$refs.swipeAsync.reset();
				});
			},
		},
	};
</script>

<style lang="css">
	h1 a {
		color: #333;
	}
	
	.container {
		margin-top: 50px;
	}
	
	.slide {
		text-align: center;
		line-height: 200px;
		font-size: 24px;
		width: 100%;
		height: 200px;
		margin-bottom: 50px;
		margin-top: 10px;
	}
	
	.c-swipe-item:nth-child(odd) {
		background: #9f0
	}
	
	.c-swipe-item:nth-child(even) {
		background: lightcoral;
	}
	
	.slide .blue {
		background: #4ff
	}
	
	.slide .c-slide-pagination-item.active {
		background-color: #fff;
	}
	
	button {
		padding: 4px 8px;
		background: lightgray;
	}
</style>