let transformProp = () => {
  return (
    window.transformProp ||
    (function() {
      var testEl = document.createElement('div');
      if (testEl.style.transform == null) {
        var vendors = ['Webkit', 'Moz', 'ms'];
        for (var vendor in vendors) {
          if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
            return vendors[vendor] + 'Transform';
          }
        }
      }
      return 'transform';
    })()
  );
}

export default transformProp;
