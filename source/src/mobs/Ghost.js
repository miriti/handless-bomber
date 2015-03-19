/**
 *
 * @constructor
 */
Game.mobs.Ghost = function () {
    Game.mobs.Enemy.call(this);

    this.collisionShape = new Game.CollisionRect(25, 25);

    this.direction = new PIXI.math.Point(0, 0);
    this.speed = 80;

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
        this.x += this.direction.x * (this.speed * delta);
        this.y += this.direction.y * (this.speed * delta);

        Game.mobs.Mob.prototype.update.call(this, delta);

        if (this.parent) {
            for (var i in this.parent.mobs) {
                if ((this.parent.mobs[i] !== this) && (this.parent.mobs[i] instanceof Game.mobs.Player)) {
                    if ((Math.abs(this.x - this.parent.mobs[i].x) < this.collisionShape.getWidth() / 2 + this.parent.mobs[i].collisionShape.getWidth() / 2)
                        &&
                        (Math.abs(this.y - this.parent.mobs[i].y) < this.collisionShape.getHeight() / 2 + this.parent.mobs[i].collisionShape.getHeight() / 2)) {
                        this.parent.mobs[i].die();
                    }
                }
            }
        }
    }
});