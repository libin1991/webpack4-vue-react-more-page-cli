exports.removeElement = el => {
  el && el.parentNode && el.parentNode.removeChild(el);
};

exports.getStyle = (element, property) => {
  return window.getComputedStyle(element, null).getPropertyValue(property);
};

exports.blur = () => {
  document.activeElement && document.activeElement.blur();
};

exports.insertHtml = (el, position = 'beforeend', html) => {
  let positions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];
  if (!positions.includes(position)) {
    throw new TypeError(
      `'position' must be one of them: ${positions.join('、')}`
    );
  }
  el.insertAdjacentHTML(position, html);
};

exports.closest = (el, selector) => {
  let matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
};
