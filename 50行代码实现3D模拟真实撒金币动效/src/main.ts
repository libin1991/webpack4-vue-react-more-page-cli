import Body from "./physics/Body";
import loadSpriteSheet from "./utils/loadSpriteSheet";
import MovieClip from "./movieclip/MovieClip";

class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    async onAddToStage() {
        const keys = ['assets/coin.json', 'assets/coin.png'];
        const spritesheet = await loadSpriteSheet(keys);
        let count = 0;
        let coinsFall = setInterval(() => {
            if (count < 100) {
                const x = 750 / 2 + Math.random() * 50 - 25;
                const y = 750 / 2 + Math.random() * 50 - 25;
                const vx = Math.random() * 20 - 10;
                const vy = -10 + Math.random() * 10 - 5;
                const animation = this.createCoinMovieClip(spritesheet);
                const falling = new Body({
                    x: x, y: y, vx: vx, vy: vy, gy: 1, host: animation
                });
                this.addChild(animation);
                count++;
            } else {
                //结束
            }
        }, 10)

    }

    createCoinMovieClip(spritesheet) {
        const animation = new MovieClip({
            frameInterval: 3,
            frames: ['1', '2', '3', '4', '5', '6', '7', '8'],
            loop: true,
            position: [100, 100],
            spritesheet: spritesheet
        });
        return animation;
    }
}

window['Main'] = Main;

egret.runEgret();