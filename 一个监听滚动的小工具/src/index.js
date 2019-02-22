export default class TinyScrollListener {
  constructor({
    distanceToReachEnd = 100,
    onEndReached = () => undefined,
    element,
    distanceEvents = []
  }) {
    const self = this

    if (typeof element === 'undefined') throw Error('Need Scroll-Container!')

    const isBody = element === document.body
    let rAFLock = false
    let scrollHandler
    let distanceEventsStatus = distanceEvents.map(
      ({ distance }) => (element.scrollTop > distance ? 'outside' : 'inside')
    )

    self.destroy = () => {
      if (isBody) {
        document.removeEventListener('scroll', scrollHandler)
      } else {
        element.removeEventListener('scroll', scrollHandler)
      }
    }

    function onScroll(e) {
      const scrollTop = isBody
        ? document.documentElement.scrollTop
        : this.scrollTop

      e.stopPropagation()

      distanceEvents.forEach(
        (
          {
            distance = -1,
            onGoingIn = () => console.log('on going in'),
            onGoingOut = () => console.log('on going out')
          },
          idx
        ) => {
          switch (distanceEventsStatus[idx]) {
            case 'inside':
              if (scrollTop > distance) {
                onGoingOut.call(this, self)
                distanceEventsStatus[idx] = 'outside'
              }
              break
            case 'outside':
              if (scrollTop <= distance) {
                onGoingIn.call(this, self)
                distanceEventsStatus[idx] = 'inside'
              }
              break
          }
        }
      )

      if (
        self.endReacher.working &&
        !self.endReacher.pausing &&
        this.scrollTop + this.offsetHeight + distanceToReachEnd >
          this.scrollHeight
      ) {
        self.endReacher.pause()
        onEndReached.call(this, function done(isOver) {
          self.endReacher.continue()

          if (isOver) {
            if (distanceEvents.length === 0) {
              self.destroy()
            } else {
              self.endReacher.working = false
            }
          }
        })
      }
    }

    scrollHandler = e => {
      if (rAFLock) return
      requestAnimationFrame(() => {
        onScroll.call(element, e)
        rAFLock = false
      })
      rAFLock = true
    }

    // .addEventListener('scroll', 在 body 上无效
    if (isBody) {
      document.addEventListener('scroll', scrollHandler)
    } else {
      element.addEventListener('scroll', scrollHandler)
    }

    return self
  }

  endReacher = {
    working: true,
    pausing: false,
    pause() {
      this.pausing = true
    },
    continue() {
      this.pausing = false
    }
  }
}
