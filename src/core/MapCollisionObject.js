Game.MapCollisionObject = function () {
    Game.MapObject.call(this);

    this.collisionShape = null;
    this.collisionExcept = [];
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
        if (this.collisionShape != null) {
            if (this.parent) {
                return this.parent.selectTilesRect(this.x - this.collisionShape.getWidth() / 2, this.y - this.collisionShape.getHeight() / 2, this.collisionShape.getWidth(), this.collisionShape.getHeight());
            }
        }

        return [];
    },
    _resolveAAB: function (dx, dy, offsetX, offsetY, t) {
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
    },
    tileExcepted: function (tile) {
        if (tile == false) return false;
        if (this.collisionExcept.length > 0) {
            if (this.collisionExcept.indexOf(tile) === -1) {
                for (var i in this.collisionExcept) {
                    if (tile.__proto__.constructor == this.collisionExcept[i]) {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    update: function (delta) {
        if ((this.parent) && (this.parent instanceof Game.maps.Map)) {
            if (this.collisionShape != null) {
                var touchingTiles = this.touchingTiles();

                for (var i in touchingTiles) {
                    var t = touchingTiles[i];

                    if ((t !== false) && (!t.passable) && (!this.tileExcepted(t))) {
                        var dx = this.x - t.x;
                        var dy = this.y - t.y;

                        var ht = Game.tiles.SIZE / 2;

                        var minDx = this.collisionShape.getWidth() / 2 + ht;
                        var minDy = this.collisionShape.getHeight() / 2 + ht;

                        if ((Math.abs(dx) < minDx) && (Math.abs(dy) < minDy)) {
                            var offsetX = minDx - Math.abs(dx);
                            var offsetY = minDy - Math.abs(dy);

                            if (this.collisionShape instanceof Game.CollisionRect) {
                                this._resolveAAB(dx, dy, offsetX, offsetY, t);
                            }

                            if (this.collisionShape instanceof Game.CollisionCircle) {
                                if (((this.x > t.x - ht) && (this.x < t.x + ht) && ((this.y < t.y - ht) || (this.y > t.y + ht)))
                                    ||
                                    ((this.y > t.y - ht) && (this.y < t.y + ht) && ((this.x < t.x - ht) || (this.x > t.x + ht)))) {
                                    this._resolveAAB(dx, dy, offsetX, offsetY, t);
                                } else {
                                    var cX, cY;

                                    if (this.x < t.x) {
                                        if (this.y < t.y) {
                                            cX = t.x - ht;
                                            cY = t.y - ht;
                                        } else {
                                            cX = t.x - ht;
                                            cY = t.y + ht;
                                        }
                                    } else {
                                        if (this.y < t.y) {
                                            cX = t.x + ht;
                                            cY = t.y - ht;
                                        } else {
                                            cX = t.x + ht;
                                            cY = t.y + ht;
                                        }
                                    }

                                    var v = new Game.Vector(this.x - cX, this.y - cY);

                                    if (v.len() < this.collisionShape.radius) {
                                        v.setLen(this.collisionShape.radius);
                                        this.x = cX;
                                        this.y = cY;
                                        this.collision(v.x, v.y, t);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        Game.MapObject.prototype.update.call(this, delta);
    }
});
