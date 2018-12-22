
export function scrollIntoView(el, scrollParent) {
	if(el.scrollIntoViewIfNeeded) {
		el.scrollIntoViewIfNeeded(false) // alignToCenter=false
	} else {
		const diff = el.offsetTop - scrollParent.scrollTop
		if(diff < 0 || diff > scrollParent.offsetHeight - el.offsetHeight) {
			scrollParent = scrollParent || el.parentElement
			scrollParent.scrollTop = el.offsetTop
		}
	}
}

export function applyRange(range) {
	const selection = window.getSelection()
	if(selection) { // 容错
		selection.removeAllRanges()
		selection.addRange(range)
	}
}
export function getRange() {
	const selection = window.getSelection()
	if(selection && selection.rangeCount > 0) {
		return selection.getRangeAt(0)
	}
}

export function getAtAndIndex(text, ats) {
	return ats.map((at) => {
		return {
			at,
			index: text.lastIndexOf(at)
		}
	}).reduce((a, b) => {
		return a.index > b.index ? a : b
	})
}


export function getOffset(element, target) {
	target = target || window
	var offset = {
			top: element.offsetTop,
			left: element.offsetLeft
		},
		parent = element.offsetParent;
	while(parent != null && parent != target) {
		offset.left += parent.offsetLeft;
		offset.top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return offset;
}

export function closest(el, predicate) {
	do
		if(predicate(el)) return el;
	while (el = el && el.parentNode);
}
// http://stackoverflow.com/questions/15157435/get-last-character-before-caret-position-in-javascript
// 修复 "空格+表情+空格+@" range报错 应设(endContainer, 0)
// stackoverflow上的这段代码有bug
export function getPrecedingRange() {
	const r = getRange()
	if(r) {
		const range = r.cloneRange()
		range.collapse(true)
		range.setStart(range.endContainer, 0)
		return range
	}
}
