Game.tiles.BonusAddBomb = function () {
    Game.tiles.BonusTile.call(this);
    this.initImage('data/spt/bonus_add_bomb.png');
};

extend(Game.tiles.BonusAddBomb, Game.tiles.BonusTile, {
    /**
     *
     * @param player {Game.mobs.Player}
     */
    castEffect: function (player) {
        player.bombCapacity += 1;
        Game.currentScene.infoDie('Bomb capacity: ' + player.bombCapacity);
    }
});