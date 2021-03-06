/**
 * Solid wall tile
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.SolidWall = function () {
    Game.tiles.Tile.call(this);
    this.passable = false;

    var q = this.genQuad(0x9974aa, Game.tiles.SIZE, Game.tiles.SIZE);
    this.addChild(q);
};

extend(Game.tiles.SolidWall, Game.tiles.Tile);
