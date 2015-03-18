Game.maps = {};

/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.maps.Map = function () {
    Game.GameObject.call(this);
    this.grid = [];
    this.mobs = [];
    this.cleared = false;

    this.gridWidth = 21;
    this.gridHeight = 11;

    this.name = 'Testing Stage';

    var floor = new PIXI.Graphics();
    floor.beginFill(0x784a8e);
    floor.drawRect(-Game.tiles.SIZE / 2, -Game.tiles.SIZE / 2, this.gridWidth * Game.tiles.SIZE, this.gridHeight * Game.tiles.SIZE);
    floor.endFill();
    this.addChild(floor);

    this.initGrid(this.gridWidth, this.gridHeight);

    for (var h = 0; h < this.gridWidth; h++) {
        this.putTile(new Game.tiles.SolidWall(), h, 0);
        this.putTile(new Game.tiles.SolidWall(), h, this.gridHeight - 1);
    }

    for (var v = 0; v < 10; v++) {
        this.putTile(new Game.tiles.SolidWall(), 0, v);
        this.putTile(new Game.tiles.SolidWall(), this.gridWidth - 1, v);
    }

    for (var i = 0; i < this.gridWidth / 2; i++) {
        for (var j = 0; j < this.gridHeight / 2; j++) {
            this.putTile(new Game.tiles.SolidWall(), i * 2, j * 2);
        }
    }

    this.bricks = [];

    this.rndBrickWalls();

    for (var n = 0; n < 5; n++) {
        var enemy = new Game.mobs.Enemy();

        do {
            var cellX = Math.round(this.gridWidth * Math.random());
            var cellY = Math.round(this.gridHeight * Math.random());
        } while (this.getTile(cellX, cellY) !== false);

        this.putMob(enemy, cellX, cellY);
    }
};

extend(Game.maps.Map, Game.GameObject, {
    /**
     * Init map grid
     *
     * @param w
     * @param h
     */
    initGrid: function (w, h) {
        this.grid = [];

        for (var i = 0; i < w; i++) {
            this.grid[i] = [];
            for (var j = 0; j < h; j++) {
                this.grid[i][j] = false;
            }
        }
    },
    clearGrid: function () {
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                this.removeTile(i, j);
            }
        }
    },
    getRndEmptyBrick: function () {
        var rndBrick;

        do {
            rndBrick = Math.floor(this.bricks.length * Math.random());
        } while (this.bricks[rndBrick].contains !== null);

        return this.bricks[rndBrick];
    },
    rndBrickWalls: function () {
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === false) {
                    if (Math.random() > 0.7) {
                        var b = new Game.tiles.BrickWall();
                        this.putTile(b, i, j);
                        this.bricks.push(b);
                    }
                }
            }
        }

        this.getRndEmptyBrick().contains = new Game.tiles.Door();
        this.getRndEmptyBrick().contains = new Game.tiles.BonusIncPower();
        this.getRndEmptyBrick().contains = new Game.tiles.BonusAddBomb();
        this.getRndEmptyBrick().contains = new Game.tiles.BonusRadio();
    },
    /**
     * Put the tile on the map
     *
     * @param tile
     * @param atX
     * @param atY
     */
    putTile: function (tile, atX, atY) {
        if (this.grid[atX][atY] !== false) {
            this.removeChild(this.grid[atX][atY]);
        }
        this.grid[atX][atY] = tile;
        tile.x = atX * Game.tiles.SIZE;
        tile.y = atY * Game.tiles.SIZE;
        tile.cell.set(atX, atY);
        this.addChild(tile);
    },
    /**
     * Remove one tile
     *
     * @param atX
     * @param atY
     */
    removeTile: function (atX, atY) {
        if ((atX >= 0) && (atX < this.grid.length) && (atY >= 0) && (atY < this.grid[0].length)) {
            if (this.grid[atX][atY] !== false) {
                if (!(this.grid[atX][atY] instanceof Game.tiles.SolidWall)) {
                    this.removeChild(this.grid[atX][atY]);
                    this.grid[atX][atY] = false;
                }
            }
        }
    },
    /**
     *
     * @param mob
     * @param atX
     * @param atY
     * @param cleanup Clear the way
     */
    putMob: function (mob, atX, atY, cleanup) {
        cleanup = cleanup || true;

        if (cleanup !== false) {
            for (var i = atX - 1; i <= atX + 1; i++) {
                for (var j = atY - 1; j <= atY + 1; j++) {
                    var t = this.getTile(i, j);
                    this.removeTile(i, j);

                    if ((t != false) && (t instanceof Game.tiles.BrickWall) && (t.contains !== null)) {
                        this.getRndEmptyBrick().contains = t.contains;
                    }
                }
            }
        }

        mob.x = atX * Game.tiles.SIZE;
        mob.y = atY * Game.tiles.SIZE;
        this.addChild(mob);
        this.mobs.push(mob);

        if (this.enemyCount() > 0) {
            this.cleared = false;
        }
    },
    putPlayer: function (player) {
        this.putMob(player, 1, 1, true);
    },
    /**
     * Remove mob
     * @param mob
     */
    removeMob: function (mob) {
        var index = this.mobs.indexOf(mob);
        if (index !== -1) {
            this.mobs.splice(index, 1);
            this.removeChild(mob);
        }

        if (this.enemyCount() == 0) {
            this.cleared = true;
        }
    },
    /**
     * Count of the enemies
     *
     * @returns {number}
     */
    enemyCount: function () {
        var enemyCount = 0;

        for (var i in this.mobs) {
            if (this.mobs[i] instanceof Game.mobs.Enemy) {
                enemyCount++;
            }
        }

        return enemyCount;
    },
    /**
     * Select tiles from map inside the rectangle
     *
     * @param x
     * @param y
     * @param w
     * @param h
     * @returns {Array}
     */
    selectTilesRect: function (x, y, w, h) {
        var result = [];
        var fromX = Math.round(x / Game.tiles.SIZE);
        var fromY = Math.round(y / Game.tiles.SIZE);
        var toX = Math.round((x + w) / Game.tiles.SIZE);
        var toY = Math.round((y + h) / Game.tiles.SIZE);

        if (fromX < 0)
            fromX = 0;
        if (fromY < 0)
            fromY = 0;

        if (toX >= this.grid.length)
            toX = this.grid.length - 1;
        if (toY >= this.grid[0].length)
            toY = this.grid[0].length - 1;

        for (var i = fromX; i <= toX; i++) {
            for (var j = fromY; j <= toY; j++) {
                result.push(this.grid[i][j]);
            }
        }

        return result;
    },
    getTile: function (atX, atY) {
        if ((atX >= 0) && (atX < this.grid.length) && (atY >= 0) && (atY < this.grid[0].length)) {
            return this.grid[atX][atY];
        }
        return null;
    }
});
