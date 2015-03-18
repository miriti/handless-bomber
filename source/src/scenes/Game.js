/**
 * Main game scene
 *
 * @constructor
 * @extends Game.Scene
 */
Game.Scenes.Game = function () {
    Game.Scene.call(this);

    this.currentMap = null;
    this.gameContainer = new Game.GameObject();
    this.player = new Game.mobs.Player();
    this.addChild(this.gameContainer);

    this.blinds = new Game.Scenes.Blinds();
    this.addChild(this.blinds);

    this.changeMap(new Game.maps.Map());
};

extend(Game.Scenes.Game, Game.Scene, {
    gameOver: function () {
        this.blinds.close(3, function () {
            console.log('Game over');
        });
    },
    restartMap: function () {
        if (this.currentMap !== null) {
            this.changeMap(new this.currentMap.constructor());
        }
    },
    changeMap: function (map) {

        this.player.hasControl = false;
        map.paused = true;

        var self = this;
        if (this.currentMap !== null) {
            this.currentMap.paused = true;
            this.blinds.close(1, function () {
                self.currentMap.removeChild(self.player);
                self.removeChild(self.currentMap);
                self.currentMap = null;
                self.changeMap(map);
            });
            return;
        } else {
            this.blinds.close(0, function () {
            });
        }

        this.currentMap = map;
        this.currentMap.putPlayer(this.player);
        this.gameContainer.addChild(this.currentMap);

        this.blinds.open(1, function () {
            self.player.hasControl = true;
            self.currentMap.paused = false;
        });
    },
    /**
     * Resize
     *
     * @param newWidth
     * @param newHeight
     */
    resize: function (newWidth, newHeight) {
    },
    /**
     *
     * @param delta
     * @override
     */
    update: function (delta) {
        Game.Scene.prototype.update.call(this, delta);
        this.gameContainer.x = -this.player.x;
        this.gameContainer.y = -this.player.y;
    }
});
