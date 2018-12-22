<template>
	<div ref="wrap" class="atwho-wrap" @input="handleInput()" @keydown="handleKeyDown">

		<div v-if="atwho" class="atwho-panel" :style="style">
					<ul class="atwho-view atwho-ul">
						<li v-for="(item, index) in atwho.list" 
							class="atwho-li" 
							:key="index" 
							:class="isCur(index) && 'atwho-cur'" 
							:ref="isCur(index) && 'cur'" 
							:data-index="index" 
							@mouseenter="handleItemHover" 
							@click="handleItemClick">
							<slot name="item" :item="item">
								<span v-text="itemName(item)"></span>
							</slot>
						</li>
						<li>
							<span>展开更多群成员</span> 
							<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1NDgyNjY3NzY4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwODYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTMzNi43MzMgMTE5LjY2N2wtNTYuMjc4IDU1LjcyIDMzNC44NTcgMzM3LjE1NC0zMzcuNjczIDMzNC4zMTUgNTUuODAyIDU2LjE4NCAzOTMuOTQ0LTM5MC4wNDB6IiBwLWlkPSIxMDg3Ij48L3BhdGg+PC9zdmc+"/>
						</li>
					</ul>
		</div>

		<span v-show="false" ref="embeddedItem">
		    <slot name="embeddedItem" :current="currentItem"></slot>
		</span>

		<slot></slot>
	</div>
</template>

<script>
	import {
		closest,
		getOffset,
		getPrecedingRange,
		getRange,
		applyRange,
		scrollIntoView,
		getAtAndIndex
	} from './util'

	export default {
		props: {
			value: {
				type: String,
				default: null
			},
			at: {
				type: String,
				default: null
			},
			ats: {
				type: Array,
				default: () => ['@']
			},
			suffix: { //插入字符链接
				type: String,
				default: ' '
			},
			loop: {
				type: Boolean,
				default: true
			},
			allowSpaces: {
				type: Boolean,
				default: true
			},
			tabSelect: {
				type: Boolean,
				default: false
			},
			avoidEmail: {
				type: Boolean,
				default: true
			},
			hoverSelect: {
				type: Boolean,
				default: true
			},
			members: {
				type: Array,
				default: () => []
			},
			nameKey: {
				type: String,
				default: ''
			},
			filterMatch: {
				type: Function,
				default: (name, chunk, at) => {
					return name.toLowerCase()
						.indexOf(chunk.toLowerCase()) > -1
				}
			},
			deleteMatch: {
				type: Function,
				default: (name, chunk, suffix) => {
					return chunk === name + suffix
				}
			}
		},

		data() {
			return {
				bindsValue: this.value != null,
				customsEmbedded: false,
				atwho: null
			}
		},
		computed: {
			atItems() {
				return this.at ? [this.at] : this.ats
			},

			currentItem() {
				if(this.atwho) {
					return this.atwho.list[this.atwho.cur];
				}
				return '';
			},

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
             
					if(wrap) {
						const offset = getOffset(wrap)
						const left = x + 'px'
						const top = y + 25+ 'px'   //25是行高
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
			'atwho.cur' (index) {
				if(index != null) { // cur index exists
					this.$nextTick(() => {
						this.scrollToCur()
					})
				}
			},
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
			if(this.$scopedSlots.embeddedItem) {
				this.customsEmbedded = true
			}
			if(this.bindsValue) {
				this.handleValueUpdate(this.value)
			}
		},

		methods: {
			itemName(v) {
				const {
					nameKey
				} = this
				return nameKey ? v[nameKey] : v
			},
			isCur(index) {
				return index === this.atwho.cur
			},
			handleValueUpdate(value) {
				const el = this.$el.querySelector('[contenteditable]')
				if(value !== el.innerHTML) {
					el.innerHTML = value
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
			handleDelete(e) {
				const range = getPrecedingRange()
				if(range) {
					if(this.customsEmbedded && range.endOffset >= 1) {
						let a = range.endContainer.childNodes[range.endOffset] ||
							range.endContainer.childNodes[range.endOffset - 1]
						if(!a || a.nodeType === Node.TEXT_NODE && !/^\s?$/.test(a.data)) {
							return
						} else if(a.nodeType === Node.TEXT_NODE) {
							if(a.previousSibling) a = a.previousSibling
						} else {
							if(a.previousElementSibling) a = a.previousElementSibling
						}
						let ch = [].slice.call(a.childNodes)
						ch = [].reverse.call(ch)
						ch.unshift(a)
						let last;
						[].some.call(ch, c => {
							if(c.getAttribute && c.getAttribute('data-at-embedded') != null) {
								last = c
								return true
							}
						})
						if(last) {
							e.preventDefault()
							e.stopPropagation()
							const r = getRange()
							if(r) {
								r.setStartBefore(last)
								r.deleteContents()
								applyRange(r)
								this.handleInput()
							}
						}
						return
					}

					const {
						atItems,
						members,
						suffix,
						deleteMatch,
						itemName
					} = this
					const text = range.toString()
					const {
						at,
						index
					} = getAtAndIndex(text, atItems)

					if(index > -1) {
						const chunk = text.slice(index + at.length)
						const has = members.some(v => {
							const name = itemName(v)
							return deleteMatch(name, chunk, suffix)
						})
						if(has) {
							e.preventDefault()
							e.stopPropagation()
							const r = getRange()
							if(r) {
								r.setStart(r.endContainer, index)
								r.deleteContents()
								applyRange(r)
								this.handleInput()
							}
						}
					}
				}
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
					if(e.keyCode === 13 || (this.tabSelect && e.keyCode === 9)) { // enter or tab
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
					this.handleDelete(e)
				}
			},

			handleInput(keep) {
				const el = this.$el.querySelector('[contenteditable]')
				this.$emit('input', el.innerHTML)

				const range = getPrecedingRange()
				if(range) {
					const {
						atItems,
						avoidEmail,
						allowSpaces
					} = this

					let show = true
					const text = range.toString()

					const {
						at,
						index
					} = getAtAndIndex(text, atItems)

					if(index < 0) show = false
					const prev = text[index - 1]

					const chunk = text.slice(index + at.length, text.length)

					if(avoidEmail) {
						// 上一个字符不能为字母数字 避免与邮箱冲突
						// 微信则是避免 所有字母数字及半角符号
						if(/^[a-z0-9]$/i.test(prev)) show = false
					}

					if(!allowSpaces && /\s/.test(chunk)) {
						show = false
					}

					// chunk以空白字符开头不匹配 避免`@ `也匹配
					if(/^\s/.test(chunk)) show = false

					if(!show) {
						this.closePanel()
					} else {
						const {
							members,
							filterMatch,
							itemName
						} = this
						if(!keep && chunk) { // fixme: should be consistent with AtTextarea.vue
							this.$emit('at', chunk)
							console.log('at',chunk);
						}
						const matched = members.filter(v => {
							const name = itemName(v)
							return filterMatch(name, chunk, at)
						})
						if(matched.length) {
							this.openPanel(matched, range, index, at)
						} else {
							this.closePanel()
						}
					}
				}
			},

			closePanel() {
				if(this.atwho) {
					this.atwho = null
				}
			},
			openPanel(list, range, offset, at) {
				const fn = () => {
					const r = range.cloneRange()
					r.setStart(r.endContainer, offset + at.length) // 从@后第一位开始
					// todo: 根据窗口空间 判断向上或是向下展开
					const rect = r.getClientRects()[0]
					this.atwho = {
						range,
						offset,
						list,
						x: rect.left,
						y: rect.top-5,
						cur: 0 // todo: 尽可能记录
					}
				}
				if(this.atwho) {
					fn()
				} else { // 焦点超出了显示区域 需要提供延时以移动指针 再计算位置
					setTimeout(fn, 10)
				}
			},

			scrollToCur() {
				const curEl = this.$refs.cur[0]
				const scrollParent = curEl.parentElement.parentElement
				scrollIntoView(curEl, scrollParent)
			},
			selectByMouse(e) {
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
			insertText(text, r) {
				r.deleteContents()
				const node = r.endContainer
				if(node.nodeType === Node.TEXT_NODE) {
					const cut = r.endOffset
					node.data = node.data.slice(0, cut) +
						text + node.data.slice(cut)
					r.setEnd(node, cut + text.length)
				} else {
					const t = document.createTextNode(text)
					r.insertNode(t)
					r.setEndAfter(t)
				}
				r.collapse(false) // 参数在IE下必传
				applyRange(r)
			},

			insertHtml(html, r) {
				r.deleteContents()
				const node = r.endContainer
				var newElement = document.createElement('span')

				newElement.appendChild(document.createTextNode(' '))
				newElement.appendChild(this.htmlToElement(html))
				newElement.appendChild(document.createTextNode(' '))
				newElement.setAttribute('data-at-embedded', '')
				newElement.setAttribute("contenteditable", false)

				if(node.nodeType === Node.TEXT_NODE) {
					const cut = r.endOffset
					var secondPart = node.splitText(cut);
					node.parentNode.insertBefore(newElement, secondPart);
					r.setEndBefore(secondPart)
				} else {
					const t = document.createTextNode(suffix)
					r.insertNode(newElement)
					r.setEndAfter(newElement)
					r.insertNode(t)
					r.setEndAfter(t)
				}
				r.collapse(false) // 参数在IE下必传
				applyRange(r)
			},

			insertItem() {
				const {
					range,
					offset,
					list,
					cur
				} = this.atwho
				const {
					suffix,
					atItems,
					itemName,
					customsEmbedded
				} = this
				const r = range.cloneRange()
				const text = range.toString()
				const {
					at,
					index
				} = getAtAndIndex(text, atItems)

				const start = customsEmbedded ? index : index + at.length
				r.setStart(r.endContainer, start)

				// hack: 连续两次 可以确保click后 focus回来 range真正生效
				applyRange(r)
				applyRange(r)
				const curItem = list[cur]

				if(customsEmbedded) {
					const html = this.$refs.embeddedItem.innerHTML
					this.insertHtml(html, r);
				} else {
					const t = itemName(curItem) + suffix
					this.insertText(t, r);
				}

				this.$emit('insert', curItem)
				console.log('insert', curItem);
				
				this.handleInput()
			},
			htmlToElement(html) {
				var template = document.createElement('template');
				html = html.trim(); // Never return a text node of whitespace as the result
				template.innerHTML = html;
				return template.content.firstChild;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.atwho-wrap {
		font-size: 12px;
		color: #333;
		position: relative;
		.atwho-panel {
			position: absolute;
			&.test{
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