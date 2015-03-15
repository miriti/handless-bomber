/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.objects.Bomb = function () {
    Game.MapObject.call(this);
    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/bomb.png'));
    sprite.anchor.set(0.5, 0.5);
    this.addChild(sprite);

    this.time = 2;
    this.power = 1;
    this.tile = null;

    this.sound = new buzz.sound('data/snd/explosion.wav');
};

extend(Game.objects.Bomb, Game.MapObject, {
    bombTile: function (atX, atY) {
        var t = this.parent.getTile(atX, atY);

        if (t instanceof Game.tiles.Fire) {
            t._time = 0.5;
            return true;
        }

        if ((t !== this.tile) && (t instanceof Game.tiles.BombTile)) {
            t.bomb.time = 0.05;
            return false;
        }

        if ((t !== this.tile) && (t !== false)) {
            t.explode(this);
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
            this.sound.play();
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
