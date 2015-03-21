/**
 *
 * @constructor
 */
Game.mobs.Ghost = function () {
    Game.mobs.Enemy.call(this);

    this.collisionShape = new Game.CollisionRect(25, 25);
    this.deathShape = new Game.CollisionRect(20, 20);

    this.direction = new PIXI.math.Point(0, 0);
    this.speed = 85;

    this.collisionExcept = [Game.tiles.BrickWall];

    this.chooseDirection();

    var anim = new Game.anim.Ghost();
    this.addChild(anim);
};

extend(Game.mobs.Ghost, Game.mobs.Enemy, {
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
        if (!this.dead) {
            this.x += this.direction.x * (this.speed * delta);
            this.y += this.direction.y * (this.speed * delta);
        }

        Game.mobs.Mob.prototype.update.call(this, delta);
    }
});