// 懒人版插入dom
var container = document.querySelector('.masonry-container');
var addBlock = function(num) {
  var i = 0;
  var list = [];
  while (++i <= num) {
    list.push(
      '<div class="masonry-item">' +
        '<img src="./img/' + Math.floor(Math.random() * 30 + 1) + '.jpg" alt="" class="masonry-image">' +
      '</div>'
    );
  }
  container.insertAdjacentHTML('beforeend', list.join(''));
};

var time = 0;
var timer = setInterval(function() {
  addBlock(1);
  time++;
  app.update();
  if (time >= 30) {
    clearInterval(timer);
  }
}, 500);

let addBlockEl = document.querySelector('.addBlock');
addBlockEl.addEventListener('click', function(e) {
  addBlock(20);
  app.update();
});
