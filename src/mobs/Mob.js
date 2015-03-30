Game.mobs = {};

/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.mobs.Mob = function () {
    this.dead = false;
    this.deathMoveVector = null;
    Game.MapCollisionObject.call(this);
    this.deathTime = 1;
};

extend(Game.mobs.Mob, Game.MapCollisionObject, {
    collision: function (offsetX, offsetY, tile) {
        Game.MapCollisionObject.prototype.collision.call(this, offsetX, offsetY, tile);
        if (this.dead) {
            var v = new Game.Vector(offsetX, offsetY).setLen(1);
            this.deathMoveVector.x *= v.x;
            this.deathMoveVector.y *= v.y;
        }
    },
    death: function () {
        if (this.parent)
            this.parent.removeMob(this);
    },
    die: function (source) {
        this.deathMoveVector = new Game.Vector(this.x - source.x, this.y - source.y).setLen(800);
        this.dead = true;
    },
    /**
     * Update mobs state
     * @param delta
     */
    update: function (delta) {
        if (this.dead) {
            if (this.deathTime <= 0) {
                this.death();
            } else {
                var blood = new Game.objects.Blood(new Game.Vector(-400 + Math.random() * 800, -400 + Math.random() * 800));
                blood.x = this.x;
                blood.y = this.y;
                this.parent.addChild(blood);
                this.deathTime -= delta;

                this.x += this.deathMoveVector.x * delta;
                this.y += this.deathMoveVector.y * delta;

                this.deathMoveVector.mult(0.9);

                this.alpha = this.deathTime;

                this.rotation += this.deathMoveVector.len() * delta;
            }
        }
        Game.MapCollisionObject.prototype.update.call(this, delta);

        if (!this.dead) {
            var touchingTiles = this.touchingTiles();
            for (var i in touchingTiles) {
                var t = touchingTiles[i];
                if (t !== false) {
                    t.touch(this);
                }
            }
        }
    },
    put: function (mp, cellX, cellY) {
    }
});
