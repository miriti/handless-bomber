/**
 * Bonus tile
 *
 * @constructor
 */
Game.tiles.BonusTile = function () {
    Game.tiles.Tile.call(this);
    this.taken = false;
    this.sound = new buzz.sound('data/snd/bonus.wav');
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
    }
});