Game.mobs.WormPart = function () {
    Game.mobs.Enemy.call(this);

    this.head = false;
    this.dead = false;

    this.collisionShape = this.deathShape = new Game.CollisionRect(25, 25);

    this.phase = Math.random() * Math.PI;

    this.behind = null;
    this.ahead = null;

    this.lastCell = null;
    this.sourceCell = null;
    this.targetCell = null;

    this.moveTime = 0.2;
    this._moveTime = 0;

    this.getNextCell = function () {
        if (this.ahead !== null) {
            if (this.ahead.targetCell !== null)
                return new PIXI.math.Point(this.ahead.sourceCell.x, this.ahead.sourceCell.y);
        }
        return null;
    };

    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/worm_part.png'));
    this.sprite.anchor.set(0.5, 0.5);
    this.addChild(this.sprite);
};

extend(Game.mobs.WormPart, Game.mobs.Enemy, {
    die: function (source) {
        if (this.ahead)
            this.ahead.behind = this.behind;

        if (this.behind) {
            if (this.head) {
                this.behind.getNextCell = this.getNextCell;
                this.behind.head = true;
            }
            this.behind.ahead = this.ahead;
            this.behind.position.set(this.x, this.y);
        }

        Game.mobs.Enemy.prototype.die.call(this, source);
    },
    collision: function (offsetX, offsetY, tile) {
        if (tile instanceof Game.tiles.BombTile) {
            return false;
        }
    },
    update: function (delta) {
        if (this.targetCell !== null) {
            if (this._moveTime < this.moveTime) {
                var r = Game.tiles.toPixels(this.sourceCell),
                    tr = Game.tiles.toPixels(this.targetCell);

                this.x = r.x + (tr.x - r.x) * (this._moveTime / this.moveTime);
                this.y = r.y + (tr.y - r.y) * (this._moveTime / this.moveTime);

                this.sprite.rotation = Math.atan2(tr.y - this.y, tr.x - this.x) + (Math.PI / 8) * (Math.sin(this.phase) * 0.5);

                this.phase += (Math.PI * 15) * delta;

                this._moveTime += delta;
            } else {
                this.lastCell.set(this.sourceCell.x, this.sourceCell.y);
                this.sourceCell = this.targetCell;
                this.targetCell = this.getNextCell();
                this._moveTime = 0;
            }
        } else {
            this.targetCell = this.getNextCell();
        }

        Game.mobs.Enemy.prototype.update.call(this, delta);
    },
    put: function (map, atX, atY) {
        Game.mobs.Enemy.prototype.put.call(this, map, atX, atY);
        this.sourceCell = new PIXI.math.Point(atX, atY);
        this.lastCell = new PIXI.math.Point(0, 0);
    }
});

/**
 * Worm
 *
 * @constructor
 */
Game.mobs.Worm = function (length) {
    Game.mobs.Mob.call(this);

    var tail = [];

    this.head = new Game.mobs.WormPart();
    this.head.head = true;

    this.head.getNextCell = function () {
        var nx = 0,
            ny = 0;

        do {
            if (Math.random() > 0.5) {
                nx = Math.random() > 0.5 ? -1 : 1;
                ny = 0;
            } else {
                nx = 0;
                ny = Math.random() > 0.5 ? -1 : 1;
            }
            var tile = this.map.getTile(this.sourceCell.x + nx, this.sourceCell.y + ny);
        } while (!((tile == false) || (tile instanceof Game.tiles.BombTile) || (tile instanceof Game.tiles.Door) || (tile instanceof Game.tiles.Fire)) || ((this.sourceCell.x + nx == this.lastCell.x) && (this.sourceCell.y + ny == this.lastCell.y)));

        return new PIXI.math.Point(this.sourceCell.x + nx, this.sourceCell.y + ny);
    };

    for (var i = 0; i < length; i++) {
        tail.push(new Game.mobs.WormPart());
        if (i == 0) {
            tail[i].ahead = this.head;
            this.head.behind = tail[i];
        } else {
            tail[i].ahead = tail[i - 1];
            tail[i - 1].behind = tail[i];
        }
    }

    this.tail = tail;
};

extend(Game.mobs.Worm, Game.mobs.Mob, {
    put: function (map, cellX, cellY) {
        map.putMob(this.head, cellX, cellY);

        for (var i = 0; i < this.tail.length; i++) {
            map.putMob(this.tail[i], cellX, cellY);
        }
    },
    update: function (delta) {
        var dead = true;

        for (var i in this.tail) {
            if (!this.tail[i].dead) {
                dead = false;
                break;
            }
        }
        if (dead) {
            this.parent.removeMob(this);
        }
        Game.mobs.Mob.prototype.update.call(this, delta);
    }
});