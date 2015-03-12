/**
 *
 * @constructor
 */
Game.tiles.Fire = function () {
    Game.tiles.Tile.call(this);
    this._time = 0.5;
    this.addChild(this.genQuad(0xffb4aa));
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