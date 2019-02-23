# gulp

* gulp实战代码、压缩、合并、打包

## [说明文档](http://www.liu12fei08fei.top/blog/36gulp.html)

```
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

// 常用方法
// gulp.task--定义任务
// gulp.src--找到需要执行任务的文件
// gulp.dest--执行任务的文件的去处
// gulp.watch--观察文件是否发生变化
// 默认执行：gulp；执行多个任务
gulp.task('default', ['html', 'img', 'js', 'css','concat'],function () {
    return console.log('this is default!，只需要执行gulp');
});

// 拷贝图片
gulp.task('html', function () {
    gulp.src("./src/*.html")
        .pipe(gulp.dest('dist'));
});

// 图片压缩
gulp.task('img', function () {
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// 压缩js
gulp.task('js', function () {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// 压缩css
gulp.task('css',function(){
    gulp.src('./src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
});

// 合并代码
gulp.task('concat',function(){
    gulp.src('./src/scripts/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

// 监听代码
gulp.task('watch',function(){
    gulp.watch('src/js/*.js', ['js'])
    gulp.watch('src/img/*', ['img'])
    gulp.watch('src/css/*.css', ['css'])
    gulp.watch('src/*.html',['html'])
})
```

