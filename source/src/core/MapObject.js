Game.MapObject = function () {
    Game.GameObject.call(this);
    this.cell = new PIXI.math.Point(0, 0);
};

extend(Game.MapObject, Game.GameObject, {
    update: function (delta) {
        Game.GameObject.prototype.update.call(this, delta);
        this.cell.set(Math.round(this.x / Game.tiles.SIZE), Math.round(this.y / Game.tiles.SIZE));
    }
});