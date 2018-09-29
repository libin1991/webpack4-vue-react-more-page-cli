# slide3D
slide3D是一个轮番插件，具备触摸滑动，且具有多种切换特效

最新版本：1.2.1

功能更新：  

- 新增分页器点击跳转功能
- 新增自动播放功能
- 新增用户操作后是否保留自动播放


调用CSS和JS文件：

```
	<link rel="stylesheet" href="slide3D-1.2.1.min.css" />
	<script src="slide3D-1.2.1.min.js"></script>
```

内容代码：

```
<div class="container3D">
			<div class="wrapper3D">
				<div class="slide3D">
					<img src="image-slider-1.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-2.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-3.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-4.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-5.jpg" alt="" />
				</div>
			</div>
			<div class="slide3D-pagination"></div>  <!--可选，当你需要分页器时添加，同时还需在JS中添加pagination:true-->
			<div class="slide3D-prev-button"></div>
			<div class="slide3D-next-button"></div>
		</div>
```

脚本：

```
var mySlide = Slide3D('.container3D', {
				width: 700,   //  宽度
				height:306,   // 高度
				direction: 'horizontal | vertical',  // 定义切换方向，只对slide有效				
				effect: 'fragment',  // flip | turn | slide | flat | fragment   // 切换效果
				sources: ['image-slider-1.jpg','image-slider-2.jpg','image-slider-3.jpg','image-slider-4.jpg','image-slider-5.jpg'],  // 除了effect设为slide外，在其他切换效果的情况下，都需要通过sources给每个slide指定图片。
				box:{
					cols: 3,  // 列
          rows: 6  // 行
				},
				pagination: true,  // 设置分页器
				loop:true,  // 是否循环，只有effect为slide时可以设置，其他效果默认循环
				paginationClickable: true,  //  分页器可点击跳转
    				autoplay: 2000,   // 自动播放时间，单位秒，必须为正整数
    				autoplayDisableOnInteraction : true     // 用户操作后是否不保留自动播放，默认为true，不保留
			});
```

##Bug修复##

- 修复了快速点击前进后退按钮会变成空白的问题

完整实例：

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="slide3D.css" />
		<style>
			html,body{
				width: 100%;
				height: 100%;
			}
			.slide3D img{
				width: 100%;
			}
			.container3D{
				background: #eee;
				margin-bottom: 10px;
			}
		</style>
	</head>
	<body>
		<div class="container3D">
			<div class="wrapper3D">
				<div class="slide3D">
					<img src="image-slider-1.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-2.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-3.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-4.jpg" alt="" />
				</div>
				<div class="slide3D">
					<img src="image-slider-5.jpg" alt="" />
				</div>
			</div>
			<div class="slide3D-pagination"></div>
			<div class="slide3D-prev-button"></div>
			<div class="slide3D-next-button"></div>
		</div>
		<script src="slide3D.js"></script>
		<script>
			var mySlide = Slide3D('.container3D', {
				width: 700,
				height:306,
				effect: 'fragment',  // flip | turn | slide | flat | fragment
				sources: ['image-slider-1.jpg','image-slider-2.jpg','image-slider-3.jpg','image-slider-4.jpg','image-slider-5.jpg'],
				box:{
					cols: 3
				},
				pagination: true,
				loop:true
			});
		</script>
	</body>
</html>
```
