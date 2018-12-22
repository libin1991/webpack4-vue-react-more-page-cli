<template>
	<div ref="wrap" class="atwho-wrap" @compositionstart="handleCompositionStart" @compositionend="handleCompositionEnd" @input="handleInput()" @keydown="handleKeyDown">

		<div v-if="atwho" class="atwho-panel">
			<div class="atwho-inner" style="display: none;">
				<div class="atwho-view">
					<ul class="atwho-ul">
						<li v-for="(item, index) in atwho.list" 
							class="atwho-li" 
							:key="index" :class="isCur(index) && 'atwho-cur'" 
							:ref="isCur(index) && 'cur'" 
							:data-index="index" 
							@mouseenter="handleItemHover" 
							@click="handleItemClick">
							<slot name="item" :item="item">
								<span v-text="itemName(item)"></span>
							</slot>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<span v-show="false" ref="embeddedItem">
		    <slot name="embeddedItem" :current="currentItem"></slot>
		</span>

		<slot></slot>
	</div>
</template>

<style lang="less">
	.atwho-view {
		color: black;
		border-radius: 3px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		min-width: 120px;
		z-index: 11110 !important;
	}
	
	.atwho-ul {
		list-style: none;
	}
	
	.atwho-li {
		display: block;
	}
	
	.atwho-view {
		border-radius: 6px;
		box-shadow: 0 0 10px 0 rgba(101, 111, 122, .5);
	}
	
	.atwho-ul {
		max-height: 135px;
		padding: 0;
		margin: 0;
	}
	
	.atwho-li {
		box-sizing: border-box;
		height: 27px;
		padding: 0 12px;
		white-space: nowrap;
		display: flex;
		align-items: center;
		span {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
	.atwho-cur {
		background: #5BB8FF;
		color: white;
	}
	
	.atwho-wrap {
		position: relative;
	}
	
	.atwho-panel {
		position: absolute;
	}
	
	.atwho-inner {
		position: relative;
	}
	
	.atwho-view {
		position: absolute;
		bottom: 0;
		left: -0.8em;
		cursor: default;
		background-color: rgba(255, 255, 255, .94);
		min-width: 140px;
		max-width: 180px;
		max-height: 200px;
		overflow-y: auto;
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
</style>