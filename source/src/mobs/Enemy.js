/**
 *
 * @constructor
 * @extends Game.mobs.Mob
 */
Game.mobs.Enemy = function () {
    Game.mobs.Mob.call(this);

    this.deathShape = null;
};

extend(Game.mobs.Enemy, Game.mobs.Mob, {
    update: function (delta) {
        Game.mobs.Mob.prototype.update.call(this, delta);

        if (this.deathShape) {
            if (this.parent) {
                for (var i in this.parent.mobs) {
                    if ((this.parent.mobs[i] !== this) && (this.parent.mobs[i] instanceof Game.mobs.Player)) {
                        if ((Math.abs(this.x - this.parent.mobs[i].x) < this.deathShape.getWidth() / 2 + this.parent.mobs[i].collisionShape.getWidth() / 2)
                            &&
                            (Math.abs(this.y - this.parent.mobs[i].y) < this.deathShape.getHeight() / 2 + this.parent.mobs[i].collisionShape.getHeight() / 2)) {
                            this.parent.mobs[i].die(this.position);
                        }
                    }
                }
            }
        }
    }
});
