Game.tiles = {};

/**
 * Base Tile
 *
 * @constructor
 */
Game.tiles.Tile = function () {
    Game.GameObject.call(this);
};
extend(Game.tiles.Tile, Game.GameObject);
