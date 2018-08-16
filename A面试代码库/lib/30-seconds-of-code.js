# 最近github上看到30-seconds-of-code关于js,css都是值得看的，今天分享10个fnc.

### 1.回到顶部，优点使用浏览器刷新频率的requestAnimationFrame，很顺滑

    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    

    Examples:
    scrollToTop()

### 2.smoothScroll（平滑滚动）

    const smoothScroll = element =>
      document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
      });

### 3.CopyToClipboard（复制到黏贴版）

    const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    };

    Examples
    copyToClipboard('我最帅'); // '我最帅' copied to clipboard.
    
    

### 4.HH:MM:SS 时间格式的快速获取

    const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
    
    getColonTimeFromDate(new Date()); // "08:38:00"

### 5.compose（中间件，redux源码里就使用该函数）right-to-left依次执行函数

    const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

    const add5 = x => x + 5;
    const multiply = (x, y) => x * y;
    const multiplyAndAdd5 = compose(add5, multiply);
    multiplyAndAdd5(5, 2); // 15

### 6.debounce（比较常见）

    const debounce = (fn, ms = 0) => {
      let timeoutId;
      returnfunction(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      };
    };
    

    window.addEventListener(
      'resize',
      debounce(() => {
        console.log(window.innerWidth);
        console.log(window.innerHeight);
      }, 250)
    ); // Will log the window dimensions at most every 250ms

### 7.equals 深度对比相等

    const equals = (a, b) => {
      if (a === b) returntrue;
      if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
      if (!a || !b || (typeof a != 'object' && typeof b !== 'object')) return a === b;
      if (a === null || a === undefined || b === null || b === undefined) returnfalse;
      if (a.prototype !== b.prototype) returnfalse;
      let keys = Object.keys(a);
      if (keys.length !== Object.keys(b).length) returnfalse;
      return keys.every(k => equals(a[k], b[k]));
    };

    equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' }); // true

### 8.escapeHTML

    const escapeHTML = str =>
      str.replace(
        /[&<>'"]/g,
        tag =>
          ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
          }[tag] || tag)
      );

    escapeHTML('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'

### 9.getURLParameters

    const getURLParameters = url =>
      (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
        {}
      );

    getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}
    getURLParameters('google.com'); // {}

### 10.promisify

    const promisify = func => (...args) =>
      new Promise((resolve, reject) =>
        func(...args, (err, result) => (err ? reject(err) : resolve(result)))
      );

    const delay = promisify((d, cb) => setTimeout(cb, d));
    delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s