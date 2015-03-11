/**
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.BombTile = function () {
    Game.tiles.Tile.call(this);
    this.passable = false;
    this.bomb = null;
};

extend(Game.tiles.BombTile, Game.tiles.Tile, {});