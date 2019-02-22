( ->

  plugin = (Vue) ->
    Vue.directive 'keep-scroll-position',
      bind: (el) ->
        el.addEventListener 'scroll', (event) ->
          event.target.setAttribute 'data-vue-keep-scroll-position', event.target.scrollLeft + '-' + event.target.scrollTop
          return
        return
      inserted: (el) ->
        targets = el.querySelectorAll '[data-vue-keep-scroll-position]'
        if targets.length > 0
          for target in targets
            pos = target.getAttribute('data-vue-keep-scroll-position').split('-')
            target.scrollLeft = pos[0]
            target.scrollTop = pos[1]
        else
          if el.hasAttribute 'data-vue-keep-scroll-position'
            pos = el.getAttribute('data-vue-keep-scroll-position').split('-')
            el.scrollLeft = pos[0]
            el.scrollTop = pos[1]
        return

  if Vue? then Vue.use plugin
  if typeof exports is 'object' and typeof module is 'object'
    module.exports = plugin
  else if typeof define is 'function' and define.amd
    define -> plugin
  else if window?
    window.VueKeepScrollPosition = plugin

)()