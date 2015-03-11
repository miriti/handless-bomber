/**
 *
 * @constructor
 * @extends Game.mobs.Mob
 */
Game.mobs.Enemy = function () {
    Game.mobs.Mob.call(this);

    this.bW = this.bH = 50;
    this.direction = new PIXI.math.Point(0, 0);

    this.chooseDirection();

    var g = this.genQuad(0x802215);
    this.addChild(g);
};

extend(Game.mobs.Enemy, Game.mobs.Mob, {
    chooseDirection: function () {
        if (Math.random() > 0.5) {
            this.direction.y = 0;
            if (Math.random() > 0.5) {
                this.direction.x = 1;
            } else {
                this.direction.x = -1;
            }
        } else {
            this.direction.x = 0;
            if (Math.random() > 0.5) {
                this.direction.y = 1;
            } else {
                this.direction.y = -1;
            }
        }
    },
    collision: function (offsetX, offsetY, tile) {
        Game.mobs.Mob.prototype.collision.call(this, offsetX, offsetY, tile);
        this.chooseDirection();
    },
    update: function (delta) {
        this.x += this.direction.x * (200 * delta);
        this.y += this.direction.y * (200 * delta);

        Game.mobs.Mob.prototype.update.call(this, delta);
    }
});
