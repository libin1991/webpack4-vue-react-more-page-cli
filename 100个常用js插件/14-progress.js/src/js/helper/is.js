exports.isNode = value => {
  return (
    value !== undefined && value instanceof HTMLElement && value.nodeType === 1
  );
};

exports.isNodeList = value => {
  var type = Object.prototype.toString.call(value);
  return (
    value !== undefined &&
    (type === '[object NodeList]' || type === '[object HTMLCollection]') &&
    'length' in value &&
    (value.length === 0 || exports.isNode(value[0]))
  );
};

exports.isString = value => {
  return typeof value === 'string' || value instanceof String;
};

exports.isFn = value => {
  var type = Object.prototype.toString.call(value);
  return type === '[object Function]';
};

exports.isObject = value => {
  return (
    Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]'
  );
};

exports.isArray = value => {
  return Object.prototype.toString.call(value) === '[object Array]';
};
