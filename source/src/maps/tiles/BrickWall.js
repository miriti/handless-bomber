/**
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.BrickWall = function () {
    Game.tiles.Tile.call(this);
    this.passable = false;

    this.addChild(this.genQuad(0xd4776a, 50, 50));
};

extend(Game.tiles.BrickWall, Game.tiles.Tile);
