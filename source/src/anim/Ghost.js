Game.anim.Ghost = function () {
    Game.anim.Animation.call(this, PIXI.Texture.fromImage("data/spt/ghost.png"), 64, 64);
    this.movieClip.animationSpeed = 0.15;
    this.movieClip.alpha = 0.8;
};

extend(Game.anim.Ghost, Game.anim.Animation);