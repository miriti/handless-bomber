/**
 *
 * @constructor
 * @extends Game.mobs.Mob
 */
Game.mobs.Player = function () {
    Game.mobs.Mob.call(this);

    this.collisionShape = new Game.CollisionCircle(20);

    var g = this.genQuad(0x7788aa, 40, 40);
    this.addChild(g);

    this._bombKey = false;
    this._explodeKey = false;
    this.lastBombTile = null;
    this.power = 1;

    this.bombSound = new buzz.sound('data/snd/bomb.wav');
    this.bombCapacity = 1;
    this.bombs = [];
    this.bombType = Game.objects.TimeBomb;

    this.lives = 2;

    this.hasControl = true;
};

extend(Game.mobs.Player, Game.mobs.Mob, {
    die: function () {
        /** @todo Death animation **/
        if (this.lives > 0) {
            this.lives--;
            this.lastBombTile = null;
            Game.currentScene.restartMap();
        } else {
            Game.currentScene.gameOver();
        }
    },
    _checkBombCapacity: function () {
        for (var i = this.bombs.length - 1; i >= 0; i--) {
            if (this.bombs[i].goneOff) {
                this.bombs.splice(i, 1);
            }
        }
        return this.bombs.length < this.bombCapacity;
    },
    layBomb: function () {
        if ((this.lastBombTile === null) && (this._checkBombCapacity())) {
            var t = this.parent.getTile(this.cell.x, this.cell.y);

            if (t === false) {
                this.lastBombTile = new Game.tiles.BombTile();
                this.parent.putTile(this.lastBombTile, this.cell.x, this.cell.y);

                var bomb = new this.bombType();
                bomb.power = this.power;
                bomb.rotation = -Math.PI + Math.random() * (Math.PI * 2);
                bomb.cell.x = this.cell.x;
                bomb.cell.y = this.cell.y;

                bomb.x = this.x;
                bomb.y = this.y;

                TweenLite.to(bomb, 1, {
                    x: this.cell.x * Game.tiles.SIZE,
                    y: this.cell.y * Game.tiles.SIZE,
                    rotation: 0,
                    ease: Expo.easeOut
                });

                this.lastBombTile.bomb = bomb;
                bomb.tile = this.lastBombTile;

                this.collisionExcept.push(this.lastBombTile);

                this.parent.addChild(bomb);
                this.bombSound.play();
                this.bombs.push(bomb);
            }
        }
    },
    /**
     * Update player's state
     *
     * @param delta
     */
    update: function (delta) {
        if (this.hasControl) {
            // Controls
            if (Game.Input.left())
                this.x -= 200 * delta;

            if (Game.Input.right())
                this.x += 200 * delta;

            if (Game.Input.up())
                this.y -= 200 * delta;

            if (Game.Input.down())
                this.y += 200 * delta;

            if (Game.Input.key(Game.Input.Keys.Z)) {
                if (!this._bombKey) {
                    this._bombKey = true;
                    this.layBomb();
                }
            } else {
                this._bombKey = false;
            }

            if (Game.Input.key(Game.Input.Keys.X)) {
                if (!this._explodeKey) {
                    this._explodeKey = true;
                    for (var i = 0; i < this.bombs.length; i++) {
                        if ((!this.bombs[i].goneOff) && (this.bombs[i] instanceof Game.objects.RadioBomb)) {
                            this.bombs[i].goOff();
                            break;
                        }
                    }
                }
            } else {
                this._explodeKey = false;
            }
        } else {
            this._bombKey = false;
            this._explodeKey = false;
        }

        Game.mobs.Mob.prototype.update.call(this, delta);

        // if lastBombtile is not equals null then the Player has never leaved the tile where he put the bomb
        if (this.lastBombTile !== null) {
            // Querying all tiles that player contacts with
            var touchingTiles = this.touchingTiles();
            var has = false;

            for (var i in touchingTiles) {
                // If one of the touched tiles is the last tile that player has laid a bomb at then player still did not leaved this tile.
                if (touchingTiles[i] == this.lastBombTile) {
                    has = true;
                    break;
                }
            }

            // Player is no longer touching the tile where he put a bomb
            if (!has) {
                var lbI = this.collisionExcept.indexOf(this.lastBombTile);
                if (lbI !== -1) {
                    this.collisionExcept.splice(lbI, 1);
                }
                this.lastBombTile = null;
            }
        }

    }
});
