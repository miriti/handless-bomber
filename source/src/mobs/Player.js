/**
 *
 * @constructor
 * @extends Game.mobs.Mob
 */
Game.mobs.Player = function () {
    Game.mobs.Mob.call(this);

    this.bW = this.bH = 40;

    var g = this.genQuad(0x7788aa);
    this.addChild(g);

    this.bombKey = false;
    this.lastBombTile = null;
};

extend(Game.mobs.Player, Game.mobs.Mob, {
    die: function () {

    },
    /**
     * Players collisions
     *
     * @param offsetX
     * @param offsetY
     * @param tile
     */
    collision: function (offsetX, offsetY, tile) {
        if ((this.lastBombTile !== null) && (tile == this.lastBombTile)) {
            return;
        }
        this._resolveCollision(offsetX, offsetY);
    },
    layBomb: function () {
        this.lastBombTile = new Game.tiles.BombTile();
        this.parent.putTile(this.lastBombTile, this.cell.x, this.cell.y);

        var b = new Game.objects.Bomb();
        b.cell.x = this.cell.x;
        b.cell.y = this.cell.y;
        b.x = this.cell.x * Game.tiles.SIZE;
        b.y = this.cell.y * Game.tiles.SIZE;

        this.lastBombTile.bomb = b;
        b.tile = this.lastBombTile;

        this.parent.addChild(b);
    },
    /**
     * Update player's state
     *
     * @param delta
     */
    update: function (delta) {
        // Controls
        if (Game.Input.left())
            this.x -= 200 * delta;

        if (Game.Input.right())
            this.x += 200 * delta;

        if (Game.Input.up())
            this.y -= 200 * delta;

        if (Game.Input.down())
            this.y += 200 * delta;

        if ((Game.Input.key(Game.Input.Keys.SPACE)) && (!this.bombKey)) {
            if (this.lastBombTile == null) {
                this.bombKey = true;
                this.layBomb();
            }
        } else {
            this.bombKey = false;
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
                this.lastBombTile = null;
            }
        }

    }
});
