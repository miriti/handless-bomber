Game.MapObject = function () {
    Game.GameObject.call(this);
    this.cell = new PIXI.math.Point(0, 0);
};

extend(Game.MapObject, Game.GameObject, {
    cellChanged: function () {
    },
    update: function (delta) {
        Game.GameObject.prototype.update.call(this, delta);
        var cx = this.cell.x;
        var cy = this.cell.y;

        this.cell.set(Math.round(this.x / Game.tiles.SIZE), Math.round(this.y / Game.tiles.SIZE));

        if (!((this.cell.x == cx) && (this.cell.y == cy))) {
            this.cellChanged();
        }
    }
});