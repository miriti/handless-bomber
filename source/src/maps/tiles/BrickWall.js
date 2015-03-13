/**
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.BrickWall = function () {
    Game.tiles.Tile.call(this);
    this.passable = false;

    this.addChild(this.genQuad(0xd4776a, Game.tiles.SIZE, Game.tiles.SIZE));
    this.door = false;
};

extend(Game.tiles.BrickWall, Game.tiles.Tile, {
    explode: function () {
        if (this.door !== false) {
            this.parent.putTile(new Game.tiles.Door(), this.cell.x, this.cell.y);
        } else {
            this.parent.removeTile(this.cell.x, this.cell.y);
        }
    }
});
