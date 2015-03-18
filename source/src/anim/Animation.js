Game.anim = {};

/**
 *
 * @param texture
 * @param frameSize
 * @constructor
 */
Game.anim.Animation = function (texture, frameWidth, frameHeight) {
    PIXI.Container.call(this);

    var textures = [];

    for (var i = 0; i < texture.width / frameWidth; i++) {
        for (var j = 0; j < texture.height / frameHeight; j++) {
            textures.push(new PIXI.Texture(texture, {
                x: i * frameWidth,
                y: j * frameHeight,
                width: frameWidth,
                height: frameHeight
            }));
        }
    }

    this.movieClip = new PIXI.MovieClip(textures);
    this.movieClip.anchor.set(0.5, 0.5);

    this.addChild(this.movieClip);
};
extend(Game.anim.Animation, PIXI.Container);