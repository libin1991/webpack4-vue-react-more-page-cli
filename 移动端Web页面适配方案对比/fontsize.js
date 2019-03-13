/* 
 * 禁止用户通过微信内置浏览器调整网页字体大小：安卓解决方案
 * -webkit-text-size-adjust: none; // IOS解决方案，给body加上此样式
 * Tips: 如果用户之前已经设置过了字体大小，访问网页时会先看到字体被放大后的效果再恢复正常，因为在 WeixinJSBridge 对象初始化完成之后才能通过 WeixinJSBridge 对象的方法设置为默认大小。
 * from: https://juejin.im/entry/578133ad8ac2470061eb5e94
 */
(function() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
})();

