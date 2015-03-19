Game.mobs.WormPart = function () {
    Game.mobs.Mob.call(this);

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

    var g = new PIXI.Graphics();
    g.beginFill(0xffb4aa);
    g.drawCircle(0, 0, 25);
    g.endFill();
    this.addChild(g);
};

extend(Game.mobs.WormPart, Game.mobs.Mob, {
    update: function (delta) {
        if (this.targetCell !== null) {
            if (this._moveTime < this.moveTime) {
                var r = Game.tiles.toPixels(this.sourceCell),
                    tr = Game.tiles.toPixels(this.targetCell);

                this.x = r.x + (tr.x - r.x) * (this._moveTime / this.moveTime);
                this.y = r.y + (tr.y - r.y) * (this._moveTime / this.moveTime);
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

        Game.mobs.Mob.prototype.update.call(this, delta);
    },
    put: function (map, atX, atY) {
        Game.mobs.Mob.prototype.put.call(this, map, atX, atY);
        this.sourceCell = new PIXI.math.Point(atX, atY);
        this.lastCell = new PIXI.math.Point(0, 0);
    }
});

/**
 * Worm
 *
 * @constructor
 */
Game.mobs.Worm = function () {
    Game.mobs.Enemy.call(this);

    var tail = [];

    this.head = new Game.mobs.WormPart();
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
        } while ((this.map.getTile(this.sourceCell.x + nx, this.sourceCell.y + ny) != false) || ((this.sourceCell.x + nx == this.lastCell.x) && (this.sourceCell.y + ny == this.lastCell.y)));

        return new PIXI.math.Point(this.sourceCell.x + nx, this.sourceCell.y + ny);
    };

    for (var i = 0; i < 6; i++) {
        tail.push(new Game.mobs.WormPart());
        if (i == 0) {
            tail[i].ahead = this.head;
        } else {
            tail[i].ahead = tail[i - 1];
        }
    }

    this.tail = tail;
};

extend(Game.mobs.Worm, Game.mobs.Enemy, {
    put: function (map, cellX, cellY) {
        map.putMob(this.head, cellX, cellY);

        for (var i = 0; i < this.tail.length; i++) {
            map.putMob(this.tail[i], cellX, cellY);
        }
    }
});