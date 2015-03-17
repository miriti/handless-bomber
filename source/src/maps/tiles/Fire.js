/**
 *
 * @constructor
 */
Game.tiles.Fire = function () {
    Game.tiles.Tile.call(this);
    this._time = 0.5;

    var explosion_texure = PIXI.Texture.fromImage("data/spt/explosion.png");

    var t = [];
    for (var i = 0; i < 6; i++) {
        t.push(new PIXI.Texture(explosion_texure, new PIXI.math.Rectangle(i * 50, 0, 50, 50)));
    }

    for (var i = 0; i < 5; i++) {
        var exposion = new PIXI.MovieClip(t);
        exposion.anchor.set(0.5, 0.5);
        exposion.loop = false;
        exposion.animationSpeed = 0.2;
        exposion.rotation = Math.random() * (Math.PI * 2);
        exposion.x = -Game.tiles.SIZE / 2 + Math.random() * (Game.tiles.SIZE);
        exposion.y = -Game.tiles.SIZE / 2 + Math.random() * (Game.tiles.SIZE);
        exposion.play();
        this.addChild(exposion);
    }
};

extend(Game.tiles.Fire, Game.tiles.Tile, {
    touch: function (mob) {
        mob.die();
    },
    update: function (delta) {
        Game.tiles.Tile.prototype.update.call(this, delta);
        if (this._time <= 0) {
            this.parent.removeTile(this.cell.x, this.cell.y);
        } else {
            this._time -= delta;
        }
    }
});