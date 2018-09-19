const BMP24 = require('gd-bmp').BMP24;
const {create_token} = require('../utils/token');
const Checkcode = require('../db').Checkcode;

module.exports = {
  // 验证码获取
  async checkcode(ctx, next){
    try {
      let {code,img} = makeCapcha();
      let token = create_token(code);
      await new Checkcode({token,code}).save();

      ctx.body = {
        code: 200,
        msg: '获取验证码成功！',
        data: {
          token,
          img: "data:image/bmp;base64," + img.getFileData().toString('base64')
        }
      }
    } catch(e){
      console.log(e);
      ctx.body = {
        code: 500,
        msg: '获取验证码失败！'
      }
    }
  }
}

function rand(min, max) {
  return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

function makeCapcha() {
  var img = new BMP24(100, 40);
  img.drawCircle(rand(0, 100), rand(0, 40), rand(10 , 40), rand(0, 0xffffff));
  //边框
  img.drawRect(0, 0, img.w-1, img.h-1, rand(0, 0xffffff));
  img.fillRect(0, 0, 100, 40, 0x252632);
  // img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
  img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
  //return img;
  //画曲线
  var w=img.w/2;
  var h=img.h;
  var color = rand(0, 0xffffff);
  var y1=rand(-5,5); //Y轴位置调整
  var w2=rand(10,15); //数值越小频率越高
  var h3=rand(4,6); //数值越小幅度越大
  var bl = rand(1,5);
  for(var i=-w; i<w; i+=0.1) {
      var y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
      var x = Math.floor(i+w);
      for(var j=0; j<bl; j++){
          img.drawPoint(x, y+j, color);
      }
  }

  var p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
  var str = '';
  for(var i=0; i<4; i++){
      str += p.charAt(Math.random() * p.length |0);
  }

  var fonts = [BMP24.font12x24, BMP24.font16x32];
  // var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
  var x = 15, y=8;
  for(var i=0; i<str.length; i++){
      var f = fonts[Math.random() * fonts.length |0];
      y = 8 + rand(-5, 5);
      img.drawChar(str[i], x, y, f, rand(0xaaaaaa, 0xffffff));
      x += f.w + rand(2, 8);
  }
  return {code:str,img}
}