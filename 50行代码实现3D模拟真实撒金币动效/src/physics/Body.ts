export default class Body {
    vx: number;
    vy: number;
    y: number;
    x: number;
    gy: number;
    gx: number;
    host: egret.DisplayObject;

    constructor({ x = 0, y = 0, vx = 0, vy = 0, gx = 0, gy = 0, host }) {
        this.host = host;
        this.vx = vx;
        this.vy = vy;
        this.gy = gy;
        this.gx = gx;
        this.x = x;
        this.y = y;
        this.play();
        this.update();
    }

    update() {
        this.host.x = this.x;
        this.host.y = this.y;
    }

    play() {
        egret.startTick(this.onTick, this);
    }

    onTick() {
        this.vx += this.gx;
        this.vy += this.gy;
        this.x += this.vx;
        this.y += this.vy;
        this.update();
        return false;
    }

    stop() {
        egret.stopTick(this.onTick, this);
    }
}