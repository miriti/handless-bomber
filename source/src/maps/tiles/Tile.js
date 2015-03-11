Game.tiles = {};

Game.tiles.SIZE = 50;

/**
 * Base Tile
 *
 * @constructor
 */
Game.tiles.Tile = function () {
    Game.GameObject.call(this);
    this.bW = this.bH = Game.tiles.SIZE;
    this.cell = new PIXI.math.Point(0, 0);
    this.passable = true;
};
extend(Game.tiles.Tile, Game.GameObject);
