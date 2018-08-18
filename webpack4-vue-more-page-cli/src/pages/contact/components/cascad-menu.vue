<template>
  <div class="cascad-menu" ref="cascadMenu">
    <scroll
      class="left-menu"
      :data="leftMenu"
      ref="leftMenu">
      <div class="left-menu-container">
        <ul>
          <li
            class="left-item"
            ref="leftItem"
            :class="{'current': currentIndex === index}"
            @click="selectLeft(index, $event)"
            v-for="(item, index) in leftMenu"
            :key="index">
            <p class="text">{{item}}</p>
          </li>
        </ul>
      </div>
    </scroll>
    <scroll
      class="right-menu"
      :data="rightMenu" 
      ref="rightMenu"
      @scroll="scrollHeight"
      :listenScroll="true"
      :probeType="3">
      <div class="right-menu-container">
        <ul>
          <li class="right-item" ref="rightItem" v-for="(items, i) in rightMenu" :key="i">
            <div class="data-wrapper">
              <div class="title">{{items.title}}</div>
              <div class="data" v-for="(item, j) in items.data" :key="j">{{item}}</div>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Scroll from './scroll'
export default {
  data() {
    return {
      rightHeight: [],
      scrollY: 0,
      leftScrollY: 0
    }
  },
  props: {
    leftMenu: {
      required: true,
      type: Array,
      default () {
        return []
      }
    },
    rightMenu: {
      required: true,
      type: Array,
      default () {
        return []
      }
    },
  },
  computed: {
    currentIndex () {
      const { scrollY, rightHeight } = this
      const index = rightHeight.findIndex((height, index) => {
        return scrollY >= rightHeight[index] && scrollY < rightHeight[index + 1]
      })
      return index > 0 ? index : 0
    }
  },
  created() {
    this.$nextTick(() => {
      this._calculateHeight()
    })
  },
  methods: {
    selectLeft (index, event) {
      console.log(index);
      if (!event._constructed) {
        return
      }
      let rightItem = this.$refs.rightItem
      let el = rightItem[index]
      console.log(el);
      this.$refs.rightMenu.scrollToElement(el, 300)
    },
    scrollHeight (pos) {
      console.log(pos);
      this.scrollY = Math.abs(Math.round(pos.y))
    },
    _calculateHeight() {
      let lis = this.$refs.rightItem;
      let height = 0
      this.rightHeight.push(height)
      Array.prototype.slice.call(lis).forEach(li => {
        height += li.clientHeight
        this.rightHeight.push(height)
      })
      console.log(this.rightHeight)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  .cascad-menu
    display flex
    position absolute
    top 100px
    bottom 100px
    width 100%
    border 1px solid red
    overflow hidden
    .left-menu
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .left-item
        height 54px
        width 100%
        margin-left -20px
        &.current
          width 200%
          margin-left -40px
          background #fff
        .text
          width 100%
          line-height 54px
    .right-menu
      flex 1
      .right-item
        height 100%
        margin-left -40px
        border 1px solid #ccc
        .data-wrapper
          .title
            border-bottom 1px solid #ccc
            height 20px
          .data
            height 20px
</style>
