Game.anim = {};

/**
 *
 * @param texture
 * @param frameSize
 * @constructor
 */
Game.anim.Animation = function (texture, frameWidth, frameHeight) {
    Game.GameObject.call(this);

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

extend(Game.anim.Animation, Game.GameObject, {
    update: function (delta) {
        Game.GameObject.prototype.update.call(this, delta);
        this.movieClip.update(delta * 60);
    }
});