let debounce = (fn, delay) => {
  let to;
  return () => {
    to && clearTimeout(to);
    to = setTimeout(fn, delay);
  }
}

export default debounce;
