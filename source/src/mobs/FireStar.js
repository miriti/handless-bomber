/**
 *
 * @constructor
 * @extends Game.mobs.Enemy
 */
Game.mobs.FireStarFire = function (direction) {
    Game.mobs.Enemy.call(this);

    this.direction = direction;

    this.deathShape = new Game.CollisionRect(4, 4);
    this.collisionShape = new Game.CollisionRect(4, 4);

    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/fire.png'));
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(1.3, 1.3);

    this.addChild(this.sprite);
};

extend(Game.mobs.FireStarFire, Game.mobs.Enemy, {
    die: function () {

    },
    collision: function (offsetX, offsetY, tile) {
        Game.mobs.Enemy.prototype.collision.call(this, offsetX, offsetY, tile);
        this.parent.removeMob(this);
        tile.explode(this);
    },
    update: function (delta) {
        this.sprite.rotation += (Math.PI * 10) * delta;

        this.x += this.direction.x * 200 * delta;
        this.y += this.direction.y * 200 * delta;

        Game.mobs.Enemy.prototype.update.call(this, delta);
    }
});

/**
 *
 * @constructor
 * @extends Game.mobs.Enemy
 */
Game.mobs.FireStar = function () {
    Game.mobs.Enemy.call(this);

    this.collisionShape = new Game.CollisionRect(25, 25);
    this.deathShape = new Game.CollisionRect(20, 20);

    this.sourceCell = null;
    this.targetCell = null;
    this.targetTime = 0;
    this.speed = 0.7;

    this._fireDelay = 0;

    this.back = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/firestar-back.png'));
    this.face = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/firestar-face.png'));

    this.back.anchor.set(0.5, 0.5);
    this.face.anchor.set(0.5, 0.5);

    this.addChild(this.back);
    this.addChild(this.face);
};

extend(Game.mobs.FireStar, Game.mobs.Enemy, {
    jump: function () {
        var self = this;

        this.sourceCell = {
            x: this.cell.x,
            y: this.cell.y
        };

        var shift = (function () {
            var result;
            var iteration = 0;

            do {
                result = {x: 0, y: 0};

                if (Math.random() > 0.5) {
                    result.x = Math.random() > 0.5 ? -1 : 1;
                } else {
                    result.y = Math.random() > 0.5 ? -1 : 1;
                }
                if (iteration++ >= 10) {
                    return null;
                }
            } while (self.parent.getTile(self.sourceCell.x + result.x, self.sourceCell.y + result.y) !== false);

            return result;
        })();

        if (shift != null) {
            this.targetCell = {
                x: this.sourceCell.x + shift.x,
                y: this.sourceCell.y + shift.y
            };

            this.targetTime = this.speed;
        } else {
            this.targetCell = null;
        }
    },
    /**
     * Is player in sight
     *
     * @returns {boolean}
     */
    playerInSight: function () {
        return ((this.parent.player.cell.x == this.cell.x) || (this.parent.player.cell.y == this.cell.y));
    },
    /**
     * Fire
     *
     * @param delta
     */
    fire: function (delta) {
        if (this._fireDelay <= 0) {
            this._fireDelay = 0.8;
            var self = this;
            var player = this.parent.player;
            var fire = new Game.mobs.FireStarFire((function () {
                var result = {x: 0, y: 0};

                if (self.cell.x < player.cell.x) {
                    result.x = 1;
                }

                if (self.cell.x > player.cell.x) {
                    result.x = -1;
                }

                if (self.cell.y < player.cell.y) {
                    result.y = 1;
                }

                if (self.cell.y > player.cell.y) {
                    result.y = -1;
                }

                return result;
            })());
            this.parent.putMob(fire, this.cell.x, this.cell.y);
        } else {
            this._fireDelay -= delta;
        }
    },
    /**
     * Update
     *
     * @param delta
     */
    update: function (delta) {
        if (!this.dead) {
            this.back.rotation += (Math.PI * 5) * delta;

            if (!this.playerInSight()) {
                if (this.targetCell != null) {
                    if (this.targetTime > 0) {
                        this.targetTime -= delta;
                        if (this.parent.getTile(this.targetCell.x, this.targetCell.y) !== false) {
                            this.jump();
                        } else {
                            var sp = Game.tiles.toPixels(this.sourceCell);
                            var tp = Game.tiles.toPixels(this.targetCell);

                            this.x = tp.x - (tp.x - sp.x) * (this.targetTime / this.speed);
                            this.y = tp.y - (tp.y - sp.y) * (this.targetTime / this.speed);
                        }
                    } else {
                        this.jump();
                    }
                } else {
                    this.jump();
                }
            } else {
                this.fire(delta);
            }
        }
        Game.mobs.Enemy.prototype.update.call(this, delta);
    },
    put: function () {
        this.jump();
    }
});