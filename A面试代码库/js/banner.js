var banner = null; //外层div
var list = null; //ul的DIV
var lis = null; //li几个banner
var rootWidth = null;
var startX = 0; //手指按住的起始坐标

var index = 1; //当前轮播的index，默认第一个
var translateX = 0; //移动距离
var setInter = null; //自动轮播定时器
var points = null; //小圆点

var N = null; //图片的张数3
var dis = 0; //拖动距离

var sliderTime = 2000; //轮播图时间间隔

function Event() {

	//手指按下
	banner.addEventListener('touchstart', function(ev) {
		//禁止浏览器默认滑动事件
		//ev.preventDefault();  
		startX = ev.changedTouches[0].clientX;

		//关闭过渡效果
		list.style.transition = "0s";
		//关闭自动轮播
		clearInterval(setInter);
	});

	//手指滑动
	banner.addEventListener('touchmove', function(ev) {
		//滑动差值
		dis = ev.changedTouches[0].clientX - startX;
		//当前list总平移长度
		translateX = -rootWidth * index + dis;
		list.style.transform = "translateX(" + translateX + "px)";
	});

	//手指抬起
	banner.addEventListener('touchend', function() {
		if(dis < -50) { //向左滑
			++index;
			changePage(0.3);
			changePoint();
		} else if(dis > 50) { //向右滑
			--index;
			changePage(0.3);
			changePoint();
		} else {
			changePage(0.3);
		}

		autoPlay();
	});
}
//自动轮播
function autoPlay() {
	setInter = setInterval(function() {
		++index;
		changePage(0.3);
		changePoint();
	}, sliderTime);
}
//设置小圆点
function changePoint() {
	for(var i = 0; i < points.length; i++) {
		points[i].classList.remove('active');
	}
	if(index == N + 1) {
		index = 1;
	}
	if(index == 0) {
		index = N;
	}
	points[index - 1].classList.add('active');
}
//滑动页面 平移list
function changePage(time) {
	list.style.transition = time + "s";
	list.style.transform = "translateX(" + -rootWidth * index + "px)";
	if(index == N + 1) { //第四张图就是第1张
		setTimeout(function() {
			index = 1;
			changePage(0)
		}, 300);
	} else if(index == 0) { //第3张图就是第0张
		setTimeout(function() {
			index = N;
			changePage(0)
		}, 300);
	}
}

//初始化list和point
function init() {
	banner = document.querySelector(".banner-wrap"); //外层div
	list = document.querySelector(".banner-wrap>.banner-list"); //ul的DIV
	rootWidth = document.documentElement.offsetWidth;
	N = list.getElementsByTagName("li").length; //图片的张数3
	//添加前后
	list.appendChild(list.getElementsByTagName("li")[0].cloneNode(true));
	list.insertBefore(list.getElementsByTagName("li")[N - 1].cloneNode(true), list.firstChild);

	lis = document.querySelectorAll(".banner-wrap>.banner-list li");

	//设置list宽度
	list.style.width = rootWidth * (N + 2) + "px";

	//设置li宽度
	for(var i = 0; i < lis.length; i++) {
		lis[i].style.width = rootWidth + "px";
	}

	//创建point div
	var pointDiv = document.createElement("div");
	pointDiv.setAttribute("class", "point");
	for(var i = 0; i < N; i++) { //几张图片几个点
		var span = document.createElement("span");
		if(i == 0) {
			span.classList.add('active');
		}
		pointDiv.appendChild(span);
	}
	banner.appendChild(pointDiv);
	points = document.querySelectorAll(".banner-wrap>.point span");
	changePage(0, index);
	autoPlay();
	Event();
}

window.addEventListener("orientationchange", function() {
	if(window.orientation == 0) { // Portrait
		location.reload()
	} else { // Landscape
		location.reload()
	}

}, false);

export default init