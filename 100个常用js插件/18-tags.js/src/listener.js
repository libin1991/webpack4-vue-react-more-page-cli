// 是否Dom节点
function isNode(value) {
  return (
    value !== undefined && value instanceof HTMLElement && value.nodeType === 1
  );
}

// 是否Dom列表
function isNodeList(value) {
  var type = Object.prototype.toString.call(value);
  return (
    value !== undefined &&
    (type === '[object NodeList]' || type === '[object HTMLCollection]') &&
    'length' in value &&
    (value.length === 0 || exports.node(value[0]))
  );
}

// 是否字符串
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

// 是否函数
function isFn(value) {
  var type = Object.prototype.toString.call(value);
  return type === '[object Function]';
}

// 是否window
function isWindow(value) {
  var type = Object.prototype.toString.call(value);
  return type === '[object Window]';
}

// Dom节点事件
function listenNode(node, type, callback) {
  node.addEventListener(type, callback);
  return {
    destroy: function() {
      node.removeEventListener(type, callback);
    }
  };
}

// Dom列表事件
function listenNodeList(nodeList, type, callback) {
  Array.prototype.forEach.call(nodeList, function(node) {
    node.addEventListener(type, callback);
  });
  return {
    destroy: function() {
      Array.prototype.forEach.call(nodeList, function(node) {
        node.removeEventListener(type, callback);
      });
    }
  };
}

function listen(target, type, callback) {
  if (!target && !type && !callback) {
    throw new Error('Missing required arguments');
  }

  if (!isString(type)) {
    throw new TypeError('Second argument must be a String');
  }

  if (!isFn(callback)) {
    throw new TypeError('Third argument must be a Function');
  }

  if (isNode(target) || isWindow(target)) {
    return listenNode(target, type, callback);
  } else if (isNodeList(target)) {
    return listenNodeList(target, type, callback);
  } else if (isString(target)) {
    return listenNodeList(document.querySelectorAll(target), type, callback);
  } else {
    throw new TypeError(
      'First argument must be a String, HTMLElement, HTMLCollection, NodeList or Window'
    );
  }
}

module.exports = listen;
