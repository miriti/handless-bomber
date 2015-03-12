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
    this.power = 3;
    this.tile = null;
};

extend(Game.objects.Bomb, Game.MapObject, {
    bombTile: function (atX, atY) {
        var t = this.parent.getTile(atX, atY);

        if (t instanceof Game.tiles.Fire) return true;

        if ((t !== this.tile) && (t instanceof Game.tiles.BombTile)) {
            t.bomb.time = 0.05;
            return false;
        }

        if ((t !== this.tile) && (t !== false)) {
            t.explode();
            return false;
        } else {
            this.parent.putTile(new Game.tiles.Fire(), atX, atY);
            return true;
        }
    },
    wave: function (atX, atY, dirX, dirY, power) {
        if (this.bombTile(atX, atY)) {
            power -= 1;
            if (power >= 0)
                this.wave(atX + dirX, atY + dirY, dirX, dirY, power);
        }
    },
    update: function (delta) {
        Game.MapObject.prototype.update.call(this, delta);

        if (this.time <= 0) {
            this.wave(this.cell.x, this.cell.y, -1, 0, this.power);
            this.wave(this.cell.x, this.cell.y, 1, 0, this.power);
            this.wave(this.cell.x, this.cell.y, 0, 1, this.power);
            this.wave(this.cell.x, this.cell.y, 0, -1, this.power);

            this.parent.removeChild(this);

            Game.currentScene.shake(10, 0.5);
        } else {
            this.time -= delta;
        }
    }
});
