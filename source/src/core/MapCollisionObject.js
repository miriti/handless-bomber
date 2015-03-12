Game.MapCollisionObject = function () {
    Game.MapObject.call(this);
};

extend(Game.MapCollisionObject, Game.MapObject, {

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
    touchingTiles: function () {
        return this.parent.selectTilesRect(this.x - this.bW / 2, this.y - this.bH / 2, this.bW, this.bH);
    },
    update: function (delta) {
        if ((this.parent) && (this.parent instanceof Game.maps.Map)) {
            var touchingTiles = this.touchingTiles();

            for (var i in touchingTiles) {
                var t = touchingTiles[i];
                if ((t !== false) && (!t.passable)) {
                    var dx = this.x - t.x;
                    var dy = this.y - t.y;
                    var minDx = this.bW / 2 + Game.tiles.SIZE / 2;
                    var minDy = this.bH / 2 + Game.tiles.SIZE / 2;

                    if ((Math.abs(dx) < minDx) && (Math.abs(dy) < minDy)) {
                        var offsetX = minDx - Math.abs(dx);
                        var offsetY = minDy - Math.abs(dy);

                        if (Math.abs(offsetX) > Math.abs(offsetY)) {
                            if (dy < 0) {
                                this.collision(0, -offsetY, t);
                            } else {
                                this.collision(0, offsetY, t);
                            }
                        } else {
                            if (dx < 0) {
                                this.collision(-offsetX, 0, t);
                            } else {
                                this.collision(offsetX, 0, t);
                            }
                        }
                    }
                }
            }
        }
        Game.MapObject.prototype.update.call(this, delta);
    }
});
