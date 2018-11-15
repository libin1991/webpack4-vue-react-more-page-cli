const loadJSON = (jsonURL) => {
    return new Promise((resolve: (value: any) => void) => {
        const respHandler_onComplete = (evt: egret.Event) => {
            const request: egret.HttpRequest = evt.currentTarget;
            resolve(JSON.parse(request.response));
        };
        const request = new egret.HttpRequest();
        request.once(egret.Event.COMPLETE, respHandler_onComplete, null);
        request.open(jsonURL, egret.HttpMethod.GET);
        request.send();
    });

}

const loadImage = (imageURL) => {
    return new Promise((resolve: (value: egret.Texture) => void) => {
        const oncomplete = (e: egret.Event) => {
            const imageLoader: egret.ImageLoader = e.currentTarget;
            const bitmapData: egret.BitmapData = imageLoader.data;
            const texture = new egret.Texture();
            texture._setBitmapData(bitmapData);
            resolve(texture);
        }
        const imageLoader = new egret.ImageLoader();
        imageLoader.load(imageURL);
        imageLoader.once(egret.Event.COMPLETE, oncomplete, this)
    });
}

const loadAll = (keys: string[]) => {
    const [jsonURL, imageURL] = keys;
    return Promise.all([loadJSON(jsonURL), loadImage(imageURL)])
}

const loadSpriteSheet = async (keys: string[]) => {
    return new Promise(async (resolve: (value: egret.SpriteSheet) => void) => {
        const [json, atlas] = await loadAll(keys);
        const frames: any = json.frames;
        const spriteSheet = new egret.SpriteSheet(atlas);
        for (const subkey in frames) {
            const config: any = frames[subkey];
            const texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
        }
        resolve(spriteSheet);
    })

}
export default loadSpriteSheet;





