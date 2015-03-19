Game.tiles = {};

Game.tiles.SIZE = 50;

Game.tiles.toPixels = function (cell) {
    return {
        x: cell.x * Game.tiles.SIZE,
        y: cell.y * Game.tiles.SIZE
    };
};

Game.tiles.toCell = function (point) {
    return {
        x: Math.round(point.x / Game.tiles.SIZE),
        y: Math.round(point.y / Game.tiles.SIZE)
    };
};

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
    touch: function (mob) {
    },
    explode: function (bomb) {
    },
    explosion: function () {
        if (this.parent !== null) {
            var explosions = [];

            for (var i = 0; i < 5; i++) {
                var explosion = new Game.anim.Explosion();
                explosion.rotation = Math.random() * (Math.PI * 2);
                explosion.x = this.x + (-Game.tiles.SIZE / 2 + Math.random() * (Game.tiles.SIZE));
                explosion.y = this.y + (-Game.tiles.SIZE / 2 + Math.random() * (Game.tiles.SIZE));
                this.parent.addChild(explosion);
                explosions.push(explosion);
            }

            explosions[0].movieClip.onComplete = function () {
                for (var i = 0; i < explosions.length; i++) {
                    explosions[i].parent.removeChild(explosions[i]);
                }
            };
        }
    }
});
