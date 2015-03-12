Game.tiles = {};

Game.tiles.SIZE = 50;

/**
 * Base Tile
 *
 * @constructor
 */
Game.tiles.Tile = function () {
    Game.MapObject.call(this);
    this.bW = this.bH = Game.tiles.SIZE;
    this.passable = true;
};
extend(Game.tiles.Tile, Game.MapObject, {
    touch: function(mob) {
    },
    explode: function() {
    }
});
