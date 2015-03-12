/**
 * Door
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.Door = function () {
    Game.tiles.Tile.call(this);
    this.passable = true;
    this.addChild(this.genQuad(0x061639));
};

extend(Game.tiles.Door, Game.tiles.Tile, {
    touch: function (mob) {
        if ((mob instanceof Game.mobs.Player) && (this.parent.cleared)) {
            console.log('next stage');
        }
    }
});