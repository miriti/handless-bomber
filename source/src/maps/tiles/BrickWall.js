/**
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.BrickWall = function () {
    Game.tiles.Tile.call(this);
    this.passable = false;

    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage("data/spt/bricks.png"));
    sprite.anchor.set(0.5, 0.5);
    this.addChild(sprite);

    this.contains = null;
};

extend(Game.tiles.BrickWall, Game.tiles.Tile, {
    explode: function (bomb) {
        for (var i = -2; i <= 2; i++) {
            for (var j = -4; j <= 4; j++) {
                var brick = new Game.objects.Brick(new Game.Vector(this.x - bomb.x, this.y - bomb.y).axisAlign());
                brick.x = this.x + i * Game.tiles.SIZE / 6;
                brick.y = this.y + j * Game.tiles.SIZE / 10;
                this.parent.addChild(brick);
            }
        }

        this.explosion();

        if (this.contains !== null) {
            this.parent.putTile(this.contains, this.cell.x, this.cell.y);
        } else {
            this.parent.removeTile(this.cell.x, this.cell.y);
        }
    }
});
