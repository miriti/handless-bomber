Game.mobs = {};

/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.mobs.Mob = function () {
    Game.MapCollisionObject.call(this);
};

extend(Game.mobs.Mob, Game.MapCollisionObject, {
    die: function () {
        if (this.parent)
            this.parent.removeMob(this);
    },
    /**
     * Update mobs state
     * @param delta
     */
    update: function (delta) {
        Game.MapCollisionObject.prototype.update.call(this, delta);
        var touchingTiles = this.touchingTiles();
        for (var i in touchingTiles) {
            var t = touchingTiles[i];
            if (t !== false) {
                t.touch(this);
            }
        }
    }
});
