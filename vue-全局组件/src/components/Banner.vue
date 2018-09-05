<!--轮播图-->
<template>
	<div class="banner">
		<div class="slider-wrap">
			<ul class="slider-items" :style="[sliderActive,{'width':sliderImg.length*100+'vw'}]"
				@touchstart="stopSlider($event)" 
				@touchmove="moveSlider($event)"
				@touchend="continSilder($event)">

				<li class="slider-item" v-for="(item,index) in sliderImg" 
					@click.stop="linkURl(item.linkurl)">
					<img :src="item.picurl" class="item-img">
			    </li>
			</ul>
		</div>
		<ul class="banner-page">
			<li class="slider-btn" v-for="(item,index) in bannerlist" :class="{'active':index === nowSlider}"></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'Banner',
		props: {
			bannerlist: {
				require: true
			}
		},
		data() {
			return {
				sliderActive: {
					transform: 'translate3d(-100vw,0,0)',
					transition: 'transform 0.5s'
				},
				interTimer: '', //轮播图定时器
				startTouch: '',   //手指开始点击位置
				moveTouch: '',     //手指最后移动的近距离
				nowSlider: 0   //当前banner的index
			}
		},
		computed: {
			sliderImg: function() {
				const [...saveImg] = this.bannerlist, //拷贝图片列表数据，在展示区域的图片实际上首尾拷贝了一样的图片，即尾端拷贝第一张，首端拷贝最后一张
					[imgfirst, ...other] = this.bannerlist;
				saveImg.unshift(other[other.length - 1])
				saveImg.push(imgfirst)
				return saveImg
			},
		},
		mounted() {
			if(this.bannerlist && this.bannerlist.length) {
				this.interTimer = setInterval(() => {
					this.sliderStart()
				}, 300)
			}
		},
		methods: {
			linkURl(item) {
				return false;
				window.open(item)
			},

			stopSlider(e) {
				if(e.target != e.currentTarget) { //事件委托节省下事件绑定，排除当前绑定的dom
					clearInterval(this.interTimer)
					delete this.sliderActive['transition'] //关闭css3过渡效果
					this.startTouch = e.targetTouches[0].screenX
				}
			},
			moveSlider(e) {
//				if(this.nowSlider === -1 || this.nowSlider === this.bannerlist.length) { //首端与尾端未连接好禁止滑动
//					return;
//				}
				if(e.target != e.currentTarget) {
					this.moveTouch = e.targetTouches[0].screenX
					let slideDir = this.moveTouch - this.startTouch,
						targetWidth = parseInt(window.getComputedStyle(e.target).width),
						tranDir;
						
					console.log(targetWidth)  //当前banne的宽度
					console.log(slideDir)  //手指移动距离
					tranDir = -targetWidth * (this.nowSlider + 1) + slideDir //触摸时图片随手指移动，距离须减去当前图片宽度乘以当前滚动索引
						
					this.sliderActive.transform = `translate3d(${tranDir}px,0,0)`
				}
			},
			continSilder(e) { //结束触摸
				if(e.target != e.currentTarget && this.moveTouch) {
					const slideDir = this.moveTouch - this.startTouch,
					      targetWidth = parseInt(window.getComputedStyle(e.target).width),
					      tranDir = -targetWidth * (this.nowSlider + 1);
					if(Math.abs(slideDir)<50){  //如果移动小于50回到原位
						this.sliderActive.transform = `translate3d(${tranDir}px,0,0)`
						this.sliderActive.transition=`transform 0.5s`
						return false;
					}
					if(slideDir < 0) {  //左滑
						this.nowSlider++
					} else if(slideDir > 0) {  　//右滑
						this.nowSlider--
					}
				    this.sliderStart() //立即设置位置
					this.moveTouch = 0 //清空手势位置
					this.startTouch = 0
					this.interTimer = setInterval(() => {
						this.sliderStart()
					}, 300000)
				}
			},
			sliderStart() {
				this.nowSlider %= this.sliderImg.length
				if(this.nowSlider === this.bannerlist.length) { //向右滑动到最大值时，将位置初始化并清0 nowSlider
					setTimeout(() => { //设置一个定时器，用于异步处理，一个进行尾端拷贝的图片的正常滑动，这个处理在差不多到达时重置，造成无限循环的错觉
						this.sliderActive = {
							transform: `translate3d(-100vw,0,0)`
						}
						this.nowSlider = 0
					}, 500)
				}
				if(this.nowSlider === -1) { //向右滑动到最小值时，将位置置为最大值
					setTimeout(() => {
						this.nowSlider = this.bannerlist.length - 1
						this.sliderActive = {
							transform: `translate3d(${-100*(this.nowSlider+1)}vw,0,0)`
						}
					}, 500)
				}
				this.sliderActive = Object.assign({}, {
					transition: 'transform 0.5s',
					transform: `translate3d(${-100*(this.nowSlider+1)}vw,0,0)`
				})
			}
		}
	}
</script>
<style scoped>
	.banner {
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
	}
	
	.banner-page {
		position: absolute;
		bottom: 1rem;
		justify-content: center;
		display: flex;
		align-items: center;
		width: 100%;
	}
	
	.slider-btn {
		width: 0.8rem;
		height: 0.8rem;
		background-color: #aaa;
		border-radius: 50%;
		margin-right: 0.5rem;
	}
	
	.slider-btn.active {
		background: #c62f2f;
	}
	
	.slider-wrap {
		overflow: hidden;
		width: 100%;
	}
	
	.banner-img{
		display: block;
	}
	
	.slider-item {
		width: 100vw;
		float: left;
	}
	
	.slider-item .item-img {
		width: 100%;
		display: block;
	}
</style>