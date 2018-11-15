import loadSpriteSheet from "../utils/loadSpriteSheet";

export default class MovieClip extends egret.Bitmap {
    textures: egret.Texture[];
    frames: string[];
    keys: string[];
    autoplay: boolean;
    loop: boolean;
    anchor: number;
    currentFrame: number;
    frameInterval: number;
    counter: number;

    constructor({ spritesheet, frames, position, keys = null, autoplay = true, loop = false, anchor = .5, frameInterval = 1 }) {
        super();
        this.frames = frames;
        this.frameInterval = frameInterval;
        this.keys = keys;
        this.autoplay = autoplay;
        this.loop = loop;
        this.anchor = anchor;
        this.x = position[0];
        this.y = position[1];
        this.spritesheet = spritesheet;
        if (this.autoplay) {
            this.play();
        }
    }

    play(start = 0) {
        this.goto(start);
        this.currentFrame = 0;
        this.counter = 0;
        egret.startTick(this.onTick, this);
    }

    goto(frame: number) {
        this.texture = this.textures[frame];
    }

    onTick() {
        this.counter++;
        if (this.counter == this.frameInterval) {
            this.counter = 0;
            this.currentFrame++;
            this.goto(this.currentFrame);
            if (this.currentFrame == this.frames.length - 1) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.stop();
                }
            }
        }
        return false;
    }

    stop() {
        this.currentFrame = 0;
        egret.stopTick(this.onTick, this);
    }

    set spritesheet(value: egret.SpriteSheet) {
        this.textures = this.frames.map(frame => value.getTexture(frame));
        this.anchorOffsetX = this.textures[0].textureWidth * this.anchor;
        this.anchorOffsetY = this.textures[1].textureWidth * this.anchor;
    }

    async loadResource() {
        const spritesheet = await loadSpriteSheet(this.keys);
        this.spritesheet = spritesheet;
    }
}