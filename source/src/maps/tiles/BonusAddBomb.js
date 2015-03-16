Game.tiles.BonusAddBomb = function () {
    Game.tiles.BonusTile.call(this);
    this.initImage('data/spt/bonus_add_bomb.png');
};

extend(Game.tiles.BonusAddBomb, Game.tiles.BonusTile, {
    castEffect: function (player) {

    }
});