

const options2 = {
  continuous: true
};

const options3 = {
  width: 310,
  offset: 28,
  continuous: true
}

const options4 = {
  width: 310,
  offset: 28,
  continuous: true,
  callback: function (index, el) {
    const dots = document.querySelectorAll('.dot')
    for(let i = 0;i < dots.length; i++) {
      let dot = dots[i].querySelector('span')
      if (i == index) {
        dot.className = 'active'
      }else dot.className = ''
    }
  }
}

const mySwiper1 = new Swiper(document.querySelector('#siwper-1'))
const mySwiper2 = new Swiper(document.querySelector('#siwper-2'), options2)
const mySwiper3 = new Swiper(document.querySelector('#siwper-3'), options3)
const mySwiper4 = new Swiper(document.querySelector('#siwper-4'), options4)