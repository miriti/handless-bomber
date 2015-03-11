/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.objects.Bomb = function () {
    Game.MapObject.call(this);
    var g = new PIXI.Graphics();
    g.beginFill(0x061639);
    g.drawCircle(0, 0, (Game.tiles.SIZE / 2) * 0.8);
    g.endFill();

    this.addChild(g);

    this.time = 2;
    this.power = 1;
};

extend(Game.objects.Bomb, Game.MapObject, {
    bombTile: function (atX, atY) {
        var t = this.parent.getTile(atX, atY);
        if (t instanceof Game.tiles.BombTile) {
            t.bomb.time = 0.07;
        }

        this.parent.removeTile(atX, atY);
    },
    update: function (delta) {
        Game.MapObject.prototype.update.call(this, delta);

        if (this.time <= 0) {
            // TODO go off animation
            for (var h = this.cell.x - this.power; h <= this.cell.x + this.power; h++) {
                this.bombTile(h, this.cell.y);

            }
            for (var v = this.cell.y - this.power; v <= this.cell.y + this.power; v++) {
                this.bombTile(this.cell.x, v);
            }

            this.parent.removeChild(this);
        } else {
            this.time -= delta;
        }
    }
});
