/**
 * Main game scene
 *
 * @constructor
 * @extends Game.Scene
 */
Game.Scenes.Game = function () {
    Game.Scene.call(this);

    this.gameContainer = new Game.GameObject();

    this.player = new Game.mobs.Player();
    this.map = new Game.maps.Map();
    this.map.putMob(this.player, 1, 1, true);

    this.gameContainer.addChild(this.map);

    this.addChild(this.gameContainer);
};

extend(Game.Scenes.Game, Game.Scene, {
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
