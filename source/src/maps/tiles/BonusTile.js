/**
 * Bonus tile
 *
 * @constructor
 */
Game.tiles.BonusTile = function () {
    Game.tiles.Tile.call(this);
    this.taken = false;
    this.sound = new buzz.sound('data/snd/bonus.wav');
    this.phase = 0;
};

extend(Game.tiles.BonusTile, Game.tiles.Tile, {
    castEffect: function (player) {
    },
    touch: function (mob) {
        if (!this.taken) {
            if (mob instanceof Game.mobs.Player) {
                this.sound.play();
                this.castEffect(mob);
                this.parent.removeTile(this.cell.x, this.cell.y);
                this.taken = true;
            }
        }
    },
    update: function (delta) {
        Game.tiles.Tile.prototype.update.call(this, delta);
        this.alpha = 0.5 + Math.sin(this.phase) * 0.3;
        this.phase += (Math.PI * 2) * delta;
    }
});