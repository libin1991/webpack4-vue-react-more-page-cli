<template>
  <div class="vue-route-transition">
    <transition :name="state.pageDirection" @leave="setRouterMap">
      <keep-alive v-if="$route.meta.keepAlive!==false">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>
<script>
var localSessionRouteChain = sessionStorage.getItem('$$routeChain')
try {
  localSessionRouteChain = location.hash !== '#/' ? JSON.parse(localSessionRouteChain) : []
} catch (error) {
  localSessionRouteChain = []
}
export default {
  name: 'vue-route-transition',
  data: function () {
    return {
      state: {
        addCount: localSessionRouteChain.length,
        routerMap: {},
        pageDirection: 'fade',
        routeChain: localSessionRouteChain
      }
    }
  },
  methods: {
    addRouteChain (route) {
      if (this.state.addCount === 0 && localSessionRouteChain.length > 0) {
        // 排除刷新的时候
        this.state.addCount = 1
      } else {
        if ((this.state.addCount !== 0 && this.state.routeChain[this.state.routeChain.length - 1].path !== route.path) || this.state.addCount === 0) {
          this.state.routeChain.push({
            path: route.path
          })
          sessionStorage.setItem('$$routeChain', JSON.stringify(this.state.routeChain))
          this.state.addCount++
        }
      }
    },
    popRouteChain () {
      this.state.routeChain.pop()
      sessionStorage.setItem('$$routeChain', JSON.stringify(this.state.routeChain))
    },
    setPageDirection ({dir, to, from}) {
      this.state.pageDirection = dir
      this.state.routerMap['to'] = to.path
      this.state.routerMap['from'] = from.path
    },
    setRouterMap () {
      // debugger
      let dir = this.state.pageDirection
      let to = this.state.routerMap.to.replace(/\//g, '_')
      let from = this.state.routerMap.from.replace(/\//g, '_')
      try {
        if (dir === 'slide-left') {
          // 进入
          this.state.routerMap[from] = document.getElementById(from).scrollTop
        } else if (dir === 'slide-right') {
          // 返回
          document.getElementById(to).scrollTop = this.state.routerMap[to]
        } else {
        }
      } catch (error) {
      }
    }
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      // 定义一个可以记录路由路径变化的数据，这里用sessionStorage,或者在window.routeChain等变量
      let routeLength = this.state.routeChain.length
      if (routeLength === 0 || this.state.addCount === 0) {
        this.setPageDirection({dir: 'slide-left', to, from})
        this.addRouteChain(from)
        this.addRouteChain(to)
      } else if (routeLength === 1) {
        this.setPageDirection({dir: 'slide-left', to, from})
        this.addRouteChain(to)
      } else {
        let lastBeforeRoute = this.state.routeChain[routeLength - 2]
        if (lastBeforeRoute.path === to.path) {
          this.popRouteChain()
          this.setPageDirection({dir: 'slide-right', to, from})
        } else {
          this.addRouteChain(to)
          this.setPageDirection({dir: 'slide-left', to, from})
        }
      }
      next()
    })
  }
}
</script>

<style lang="less">
html,body{width: 100%;height: 100%;}
.vue-route-transition{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backface-visibility: hidden;
  perspective: 1000;
}
.fade-enter-active{
  animation: pageFadeIn 400ms forwards;
}
@keyframes pageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*路由前进，退出*/

.slide-left-leave-active {
  animation: pageFromCenterToLeft 400ms forwards;
  z-index: 1;
}

/*路由后退，进入*/

.slide-right-enter-active {
  animation: pageFromLeftToCenter 400ms forwards;
  z-index: 1;
}

/*路由后退，退出*/

.slide-right-leave-active {
  animation: pageFromCenterToRight 400ms forwards;
  z-index: 10;
  box-shadow: -3px 0  5px rgba(0,0,0,.1);
}

/*路由前进，进入*/

.slide-left-enter-active {
  animation: pageFromRightToCenter 400ms forwards;
  z-index: 10;
  box-shadow: -3px 0  5px rgba(0,0,0,.1);
}

/*-------------------------------*/

/*路由前进，进入*/

@keyframes pageFromRightToCenter {
  from {
    /* left: 100%; */
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
  to {
    /* left: 0; */
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

/*路由前进，退出*/

@keyframes pageFromCenterToLeft {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    /* left:0; */
  }
  to {
    opacity: 0.5;
    transform: translate3d(-20%, 0, 0);
    /* left:-20%; */
  }
}

/*路由后退，进入*/

@keyframes pageFromLeftToCenter {
  from {
    opacity: .5;
    transform: translate3d(-20%, 0, 0);
    /* left: -20%; */
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    /* left: 0; */
  }
}

/*路由后退，退出*/

@keyframes pageFromCenterToRight {
  from {
    /* left: 0; */
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    /* left: 100%; */
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
}
</style>
