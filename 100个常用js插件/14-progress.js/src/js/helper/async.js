let async = (fn, cb) => {
  setTimeout(() => {
    let x = fn();
    cb && cb(x);
  }, 0);
};

export default async;
