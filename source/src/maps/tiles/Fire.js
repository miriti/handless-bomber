/**
 *
 * @constructor
 */
Game.tiles.Fire = function () {
    Game.tiles.Tile.call(this);
    this._time = 0.5;
    this._exploded = false;
};

extend(Game.tiles.Fire, Game.tiles.Tile, {
    touch: function (mob) {
        mob.die();
    },
    update: function (delta) {
        if (!this._exploded) {
            this.explosion();
            this._exploded = true;
        }
        Game.tiles.Tile.prototype.update.call(this, delta);
        if (this._time <= 0) {
            this.parent.removeTile(this.cell.x, this.cell.y);
        } else {
            this._time -= delta;
        }
    }
});