Game.tiles = {};

Game.tiles.SIZE = 50;

/**
 * Base Tile
 *
 * @constructor
 */
Game.tiles.Tile = function () {
    Game.MapObject.call(this);
    this.passable = true;
};
extend(Game.tiles.Tile, Game.MapObject, {
    initImage: function (path) {
        var sprite = new PIXI.Sprite(PIXI.Texture.fromImage(path));
        sprite.anchor.set(0.5, 0.5);
        this.addChild(sprite);
    },
    touch: function(mob) {
    },
    explode: function(bomb) {
    }
});
