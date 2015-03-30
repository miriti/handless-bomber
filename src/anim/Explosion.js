Game.anim.Explosion = function () {
    Game.anim.Animation.call(this, PIXI.Texture.fromImage("data/spt/explosion.png"), 50, 50);
    this.movieClip.loop = false;
    this.movieClip.animationSpeed = 0.2;
};
extend(Game.anim.Explosion, Game.anim.Animation);