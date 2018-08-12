<template>
  <div class="slider-container" ref='slider'
       :style="sliderStyle"
       @mouseover="pause()"
       @mouseout="play()">
    <div class="slider-content" :class="mask ? 'mask' : ''">
      <div class="slider" v-for="(item, index) in list"
        :key="index"
        :class="setClass(index)"
        @click="onClick(index)" :style="setBGImg(item.src)">
      </div>
      <i v-show="arrow" class="iconfont icon-left" @click="prev()"></i>
      <i v-show="arrow" class="iconfont icon-right" @click="next()"></i>
    </div>
    <div class="dots" v-if="dots">
      <span v-for="(item, index) in list" :key="index"
        :style="setActiveDot(index)"
        @mouseover="currentIndex = index"></span>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        currentIndex: 0,
        sliderDomList: [],
        timer: null
      }
    },
    props: {
      list: {
        required: true,
        type: Array,
        default () {
          return []
        }
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      imgType: {
        type: String,
        default: 'percentage'
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      mask: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      dots: {
        type: Boolean,
        default: true
      },
      arrow: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: 'rgb(248, 85, 85)'
      }
    },
    computed: {
      sliderStyle () {
        return {
          width: this.width ? this.width + 'px' : '100%',
          height: this.height ? this.height + 'px' : '100%',
          perspective: this.width + 'px',
          backgroundSize: this.imgType == 'percentage' ? '100% 100%' : this.imgType
        }
      }
    },
    mounted () {
      this.sliderDomList =  this.$refs.slider.querySelectorAll('div.slider');
      this.play();
    },
    methods: {
      setClass (i) {
        let next = this.currentIndex === (this.list.length - 1) ? 0 : this.currentIndex + 1;
        let prev = this.currentIndex === 0 ? this.list.length - 1 : this.currentIndex - 1;
        switch (i) {
          case this.currentIndex:
            return 'active';
          case next:
            return 'next';
          case prev:
            return 'prev';
          default:
            return '';
        }
      },
      setBGImg (src) {
        return {
          backgroundImage: `url(${src})`
        }
      },
      setActiveDot (index) {
        return index === this.currentIndex ? {
          backgroundColor: this.color
        } : {
          backgroundColor: '#ccc'
        }
      },
      play () {
        this.pause();
        if (this.autoPlay) {
          this.timer = setInterval(()=>{
            this.next();
          }, this.interval)
        }
      },
      pause () {
        clearInterval(this.timer);
      },
      next () {
        this.currentIndex = ++this.currentIndex % this.list.length;
      },
      prev () {
        this.currentIndex = this.currentIndex === 0 ? this.list.length - 1 : this.currentIndex - 1;
      },
      onClick (i) {
        if (i === this.currentIndex){
          this.$emit('sliderClick', i);
        } else {
          let currentClickClassName = this.sliderDomList[i].className.split(' ')[1]
          console.log(currentClickClassName)
          if (currentClickClassName === 'next') {
            this.next()
          } else {
            this.prev()
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
.slider-container
  width: 100%
  height: 100%
  text-align: center
  padding: 10px 0
  position: relative
  .slider-content
    position: relative
    width: 100%
    height: calc(100% - 20px)
    left: 0%
    top: 0%
    margin: 0px
    padding: 0px
    background-size: inherit
    .slider 
      position: absolute
      margin: 0
      padding: 0
      top: 0
      left: 50%
      width: 65%
      height: 100%
      transition: 500ms all ease-in-out
      background-color: #fff
      background-repeat: no-repeat
      background-position: center
      background-size: inherit
      transform: translate3d(-50%,0,-80px)
      z-index: 1
      &:before
        position: absolute
        content: ""
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: rgba(0, 0, 0, 0)
        transition-delay: 100ms!important
        transition: all 500ms
        cursor: pointer
      &.active
        transform: translate3d(-50%, 0, 0)
        z-index: 20
      &.prev
        transform: translate3d(-75%, 0, -100px)
        z-index: 19
      &.next
        transform: translate3d(-25%, 0, -100px)
        z-index: 18
    i
      width: 17.5%
      display: none
      position: absolute
      top: 40%
      font-size: 22px
      color: rgba(255, 255, 255, 0.5)
      text-shadow: 0 0 24px rgba(0, 0, 0, 0.3)
      cursor: pointer
      z-index: 21
      &:first-child
        left: 0
      &:last-child
        right: 0
    &:hover
      i
        color: rgba(255, 255, 255, 0.8)
        display: block
    &.mask
      .slider 
        &.prev, &.next
          &:before
            background-color: rgba(0, 0, 0, 0.50)
  .dots 
    width: 100%
    height: 20px
    span
      display: inline-block
      width: 20px
      height: 2px
      margin: 1px 3px
      cursor: pointer
</style>