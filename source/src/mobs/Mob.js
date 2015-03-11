Game.mobs = {};

/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.mobs.Mob = function () {
    Game.GameObject.call(this);
};

extend(Game.mobs.Mob, Game.GameObject, {
    /**
     * Resolve collision
     *
     * @param ox
     * @param oy
     * @private
     */
    _resolveCollision: function (ox, oy) {
        this.x += ox;
        this.y += oy;
    },
    /**
     * Collision happened
     *
     * @param offsetX
     * @param offsetY
     * @param tile
     */
    collision: function (offsetX, offsetY, tile) {
        this._resolveCollision(offsetX, offsetY);
    },
    /**
     * Update mobs state
     * @param delta
     */
    update: function (delta) {
        Game.GameObject.prototype.update.call(this, delta);
        if ((this.parent) && (this.parent instanceof Game.maps.Map)) {
            var touchingTiles = this.parent.selectTilesRect(this.x - this.bW / 2, this.y - this.bH / 2, this.bW, this.bH);

            for (var i in touchingTiles) {
                var t = touchingTiles[i];
                if ((t !== false) && (!t.passable)) {
                    var dx = this.x - t.x;
                    var dy = this.y - t.y;
                    var mindx = this.bW / 2 + Game.tiles.SIZE / 2;
                    var mindy = this.bH / 2 + Game.tiles.SIZE / 2;

                    if ((Math.abs(dx) < mindx) && (Math.abs(dy) < mindy)) {
                        var offsetx = mindx - Math.abs(dx);
                        var offsety = mindy - Math.abs(dy);

                        if (Math.abs(offsetx) > Math.abs(offsety)) {
                            if (dy < 0) {
                                this.y -= offsety;
                                this.collision(0, -offsety, t);
                            } else {
                                this.y += offsety;
                                this.collision(0, offsety, t);
                            }
                        } else {
                            if (dx < 0) {
                                this.x -= offsetx;
                                this.collision(-offsetx, 0, t);
                            } else {
                                this.x += offsetx;
                                this.collision(offsetx, 0, t);
                            }
                        }
                    }
                }
            }
        }
    }
});
