/**
 * Main game scene
 *
 * @constructor
 * @extends Game.Scene
 */
Game.Scenes.Game = function () {
    Game.Scene.call(this);

    this.player = new Game.mobs.Player();
    this.map = new Game.maps.Map();
    this.map.putMob(this.player, 1, 0, true);
    this.addChild(this.map);
};

extend(Game.Scenes.Game, Game.Scene, {
    /**
     *
     * @param delta
     * @override
     */
    update: function (delta) {
        Game.Scene.prototype.update.call(this, delta);
        this.x = -this.player.x;
        this.y = -this.player.y;
    }
});
