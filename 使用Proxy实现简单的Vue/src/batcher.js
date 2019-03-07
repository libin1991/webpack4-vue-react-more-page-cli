let queue = new Set()

function flushQueue (args) {
  queue.forEach(watcher => {
    watcher.run()
  })
  // 清空队列
  queue = new Set()
}

function pushQueue (watcher) {
  queue.add(watcher)
  Promise.resolve().then(() => flushQueue())
}

export default pushQueue
