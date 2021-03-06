/**
 * Door
 *
 * @constructor
 * @extends Game.tiles.Tile
 */
Game.tiles.Door = function () {
    Game.tiles.Tile.call(this);
    this.passable = true;
    this.exited = false;
    this.addChild(this.genQuad(0x061639, Game.tiles.SIZE, Game.tiles.SIZE));
};

extend(Game.tiles.Door, Game.tiles.Tile, {
    touch: function (mob) {
        if (!this.exited) {
            if ((mob instanceof Game.mobs.Player) && (this.parent.cleared)) {
                if (Game.currentScene.currentMap.next) {
                    this.exited = true;
                    mob.lives++;
                    Game.currentScene.changeMap(new Game.currentScene.currentMap.next(true));
                } else {
                    Game.currentScene.win();
                }
            }
        }
    }
});