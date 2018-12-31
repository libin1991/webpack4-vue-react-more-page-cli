# vue-atuser
Vue@某人，At某人，仿新浪微博@某人，@user

![](https://raw.githubusercontent.com/libin1991/vue-atuser/master/atuser.gif)

# DEMO
> atuser.vue

```js
<template>
	<div ref="wrap" class="atwho-wrap" @input="handleInput" @keydown="handleKeyDown">
		<div v-if="atwho" class="atwho-panel" :style="style">
			<ul class="atwho-view atwho-ul">
				<li v-for="(item, index) in atwho.list" class="atwho-li" :key="index" :class="isCur(index) && 'atwho-cur'" :ref="isCur(index) && 'cur'" :data-index="index" @mouseenter="handleItemHover" @click="handleItemClick">
					<span v-text="item"></span>
				</li>
				<li>
					<span>展开更多群成员</span>
					<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDgyNjY3NzY4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwODYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTMzNi43MzMgMTE5LjY2N2wtNTYuMjc4IDU1LjcyIDMzNC44NTcgMzM3LjE1NC0zMzcuNjczIDMzNC4zMTUgNTUuODAyIDU2LjE4NCAzOTMuOTQ0LTM5MC4wNDB6IiBwLWlkPSIxMDg3Ij48L3BhdGg+PC9zdmc+" />
				</li>
			</ul>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	import getCaretCoordinates from 'textarea-caret'
	export default {
		props: {
			value: { //输入框初始值
				type: String,
				default: null
			},
			suffix: { //插入字符链接
				type: String,
				default: ' '
			},
			loop: { //上下箭头循环
				type: Boolean,
				default: true
			},
			avoidEmail: { //@前不能是字符
				type: Boolean,
				default: true
			},
			hoverSelect: { //悬浮选中
				type: Boolean,
				default: true
			},
			members: { //选择框选项列表
				type: Array,
				default: () => []
			},
			nameKey: {
				type: String,
				default: ''
			}
		},

		data() {
			return {
				atItems: ['@'],
				bindsValue: this.value != null,
				atwho: null
			}
		},
		computed: {
			style() {
				if(this.atwho) {
					const {
						list,
						cur,
						x,
						y
					} = this.atwho
					const {
						wrap
					} = this.$refs
					const el = this.$el.querySelector('textarea')
					if(wrap) {
						const left = x + el.offsetLeft - el.scrollLeft + 'px'
						const top = y + el.offsetTop - el.scrollTop + 25 + 'px'
						return {
							left,
							top
						}
					}
				}
				return null
			}
		},
		watch: {
			members() {
				this.handleInput(true)
			},
			value(value, oldValue) {
				if(this.bindsValue) {
					this.handleValueUpdate(value)
				}
			}
		},
		mounted() {
			if(this.bindsValue) {
				this.handleValueUpdate(this.value)
			}
		},

		methods: {
			getAtAndIndex(text, ats) {
				return ats.map((at) => {
					return {
						at,
						index: text.lastIndexOf(at)
					}
				}).reduce((a, b) => {
					return a.index > b.index ? a : b
				})
			},
			isCur(index) {
				return index === this.atwho.cur
			},
			handleValueUpdate(value) { //更新textarea的值
				const el = this.$el.querySelector('textarea')
				if(value !== el.value) {
					el.value = value
				}
			},
			handleItemHover(e) {
				if(this.hoverSelect) {
					this.selectByMouse(e)
				}
			},
			handleItemClick(e) {
				this.selectByMouse(e)
				this.insertItem()
			},
			handleKeyDown(e) {
				const {
					atwho
				} = this
				if(atwho) {
					if(e.keyCode === 38 || e.keyCode === 40) { // ↑/↓
						if(!(e.metaKey || e.ctrlKey)) {
							e.preventDefault()
							e.stopPropagation()
							this.selectByKeyboard(e)
						}
						return
					}
					if(e.keyCode === 13) { // enter
						this.insertItem()
						e.preventDefault()
						e.stopPropagation()
						return
					}
					if(e.keyCode === 27) { // esc
						this.closePanel()
						return
					}
				}
				// 为了兼容ie ie9~11 editable无input事件 只能靠keydown触发 textarea正常
				// 另 ie9 textarea的delete不触发input
				const isValid = e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 8
				if(isValid) {
					setTimeout(() => {
						this.handleInput()
					}, 50)
				}
				if(e.keyCode === 8) { //删除
					//this.handleDelete(e)
				}
				if(e.keyCode === 13) { //删除
					this.$emit("enterSend",e)
				}
			},

			handleInput(event) {
				const el = this.$el.querySelector('textarea')
				this.$emit('input', el.value)      //更新父组件
				const text = el.value.slice(0, el.selectionEnd)
				if(text) {
					const {
						atItems,
						avoidEmail
					} = this
					let show = true
					const {
						at,
						index
					} = this.getAtAndIndex(text, atItems)
					if(index < 0) show = false
					const prev = text[index - 1] //上一个字符
					const chunk = text.slice(index + at.length, text.length)
					if(avoidEmail) { //上一个字符不能为字母数字 避免与邮箱冲突，微信则是避免 所有字母数字及半角符号
						if(/^[a-z0-9]$/i.test(prev)) show = false
					}

					if(/^\s/.test(chunk)) show = false //chunk以空白字符开头不匹配 避免`@ `也匹配
					if(!show) {
						this.closePanel()
					} else {
						const {
							members,
							filterMatch
						} = this
						if(!event) { // fixme: should be consistent with At.vue
							this.$emit('at', chunk)
						}

						const matched = members.filter(v => {
							return v.toString().indexOf(chunk) > -1
						})

						if(matched.length) {
							this.openPanel(matched, chunk, index, at)
						} else {
							this.closePanel()
						}
					}
				} else {
					this.closePanel()
				}
			},

			closePanel() {
				if(this.atwho) {
					this.atwho = null
				}
			},
			openPanel(list, chunk, offset, at) { //打开Atuser列表  matched, chunk, index, at  过滤数组，匹配项，匹配项index，'@'
				const fn = () => {
					const el = this.$el.querySelector('textarea')
					const atEnd = offset + at.length // 从@后第一位开始
					const rect = getCaretCoordinates(el, atEnd)
					this.atwho = {
						chunk,
						offset,
						list,
						atEnd,
						x: rect.left,
						y: rect.top - 4,
						cur: 0, // todo: 尽可能记录
					}
				}
				if(this.atwho) {
					fn()
				} else { // 焦点超出了显示区域 需要提供延时以移动指针 再计算位置
					setTimeout(fn, 10)
				}
			},

			selectByMouse(e) {
				function closest(el, predicate) { //遍历直到有data-index为止
					do {
						if(predicate(el)) return el;
					} while (el = el && el.parentNode);
				}

				const el = closest(e.target, d => {
					return d.getAttribute('data-index')
				})

				const cur = +el.getAttribute('data-index')
				this.atwho = {
					...this.atwho,
					cur
				}
			},
			selectByKeyboard(e) {
				const offset = e.keyCode === 38 ? -1 : 1
				const {
					cur,
					list
				} = this.atwho
				const nextCur = this.loop ?
					(cur + offset + list.length) % list.length :
					Math.max(0, Math.min(cur + offset, list.length - 1))
				this.atwho = {
					...this.atwho,
					cur: nextCur
				}
			},

			// todo: 抽离成库并测试
			insertText(text, el) {
				const start = el.selectionStart
				const end = el.selectionEnd
				el.value = el.value.slice(0, start) +
					text + el.value.slice(end)
				const newEnd = start + text.length
				el.selectionStart = newEnd
				el.selectionEnd = newEnd
			},
			insertItem() {
				const {
					chunk,
					offset,
					list,
					cur,
					atEnd
				} = this.atwho
				const {
					suffix,
					atItems
				} = this
				const el = this.$el.querySelector('textarea')
				const text = el.value.slice(0, atEnd)
				const {
					at,
					index
				} = this.getAtAndIndex(text, atItems)
				const start = index + at.length // 从@后第一位开始
				el.selectionStart = start
				el.focus() // textarea必须focus回来
				const curItem = list[cur]
				const t = '' + curItem + suffix
				this.insertText(t, el)
				this.$emit('insert', curItem) //插入字符
				this.handleInput()
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.atwho-wrap {
		width: 100%;
		font-size: 12px;
		color: #333;
		position: relative;
		.atwho-panel {
			position: absolute;
			&.test {
				width: 2px;
				height: 2px;
				background: red;
			}
			.atwho-inner {
				position: relative;
			}
		}
		.atwho-view {
			color: black;
			z-index: 11110 !important;
			border-radius: 2px;
			box-shadow: 0 0 10px 0 rgba(101, 111, 122, .5);
			position: absolute;
			cursor: pointer;
			background-color: rgba(255, 255, 255, .94);
			width: 170px;
			max-height: 312px;
			&::-webkit-scrollbar {
				width: 11px;
				height: 11px;
			}
			&::-webkit-scrollbar-track {
				background-color: #F5F5F5;
			}
			&::-webkit-scrollbar-thumb {
				min-height: 36px;
				border: 2px solid transparent;
				border-top: 3px solid transparent;
				border-bottom: 3px solid transparent;
				background-clip: padding-box;
				border-radius: 7px;
				background-color: #C4C4C4;
			}
		}
		.atwho-ul {
			list-style: none;
			padding: 0;
			margin: 0;
			li {
				box-sizing: border-box;
				display: block;
				height: 25px;
				padding: 2px 10px;
				white-space: nowrap;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&.atwho-cur {
					background: #f2f2f5;
					color: #eb7350;
				}
				span {
					overflow: hidden;
					text-overflow: ellipsis;
				}
				img {
					height: 13px;
					width: 13px;
				}
			}
		}
	}
</style>
```
> index.vue

```js
<template>
	<div class="atuser">
		<at :members="members" @enterSend="send" v-model="inputcontent">
			<textarea class="editor"></textarea>
		</at>
	</div>
</template>

<script>
	import at from './atuser.vue'
	export default {
		data() {
			return {
				members: [123, 12, 1234, 12345, "小花", "小花华", "小三"],
				inputcontent: "" //用户输入内容初始值

			};
		},
		components: {
			at,
		},
		methods: {
			send(e) { //回车发送
				console.log(e)
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.atuser {
		width: 700px;
		height: 160px;
		border: 1px solid red;
		.editor{
			width: 700px;
			height: 160px;
			overflow: hidden;
			border: 0px;
			outline: none;
			resize: none;
	       -webkit-appearance: none;
		}
	}
</style>
```
