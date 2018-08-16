// 解决键盘弹出后挡表单的问题
    window.addEventListener('resize', function() {
      if(
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      ) {
        window.setTimeout(function() {
          if('scrollIntoView' in document.activeElement) {
            document.activeElement.scrollIntoView();
          } else {
            document.activeElement.scrollIntoViewIfNeeded();
          }
        }, 0);
      }
    });