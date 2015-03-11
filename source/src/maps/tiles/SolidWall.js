/**
 * Solid wall tile
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.SolidWall = function () {
    Game.tiles.Tile.call(this);
    this.passable = false;

    var q = this.genQuad(0x9974aa, 50, 50);
    this.addChild(q);
};

extend(Game.tiles.SolidWall, Game.tiles.Tile);
