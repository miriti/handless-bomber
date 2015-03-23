/**
 *
 * @constructor
 */
Game.mobs.Ghost = function () {
    Game.mobs.Enemy.call(this);

    this.collisionShape = new Game.CollisionRect(25, 25);
    this.deathShape = new Game.CollisionRect(15, 15);

    this.direction = null;

    this.sourceCell = new PIXI.math.Point();
    this.targetCell = new PIXI.math.Point();
    this.cellCount = 0;
    this.moveTime = this._moveTime = 1;

    this.collisionExcept = [Game.tiles.BrickWall, Game.tiles.BombTile];

    var anim = new Game.anim.Ghost();
    this.addChild(anim);
};

extend(Game.mobs.Ghost, Game.mobs.Enemy, {
    chooseNextCell: function () {
        var nc;
        var iterations = 0;

        do {
            nc = {x: 0, y: 0};

            if (iterations++ >= 10) {
                break;
            }

            if ((this.direction == null) || (this.cellCount >= 4)) {
                if (Math.random() > 0.5) {
                    nc.x = Math.random() > 0.5 ? 1 : -1;
                } else {
                    nc.y = Math.random() > 0.5 ? 1 : -1;
                }
            } else {
                nc = this.direction;
            }
        } while (this.parent.getTile(this.sourceCell.x + nc.x, this.sourceCell.y + nc.y) instanceof Game.tiles.SolidWall);

        this.cellCount++;
        this.direction = nc;

        this.targetCell.set(this.sourceCell.x + nc.x, this.sourceCell.y + nc.y);
    },
    update: function (delta) {
        if (!this.dead) {
            if (this._moveTime >= 0) {
                var tc = Game.tiles.toPixels(this.targetCell);
                var sc = Game.tiles.toPixels(this.sourceCell);

                this.x = tc.x - (tc.x - sc.x) * (this._moveTime / this.moveTime);
                this.y = tc.y - (tc.y - sc.y) * (this._moveTime / this.moveTime);

                this._moveTime -= delta;
            } else {
                this._moveTime = this.moveTime;
                this.sourceCell.copy(this.targetCell);
                this.chooseNextCell();
            }
        }

        Game.mobs.Enemy.prototype.update.call(this, delta);
    },
    put: function (map, ax, ay) {
        this.sourceCell.set(ax, ay);
        this.chooseNextCell();
    }
});