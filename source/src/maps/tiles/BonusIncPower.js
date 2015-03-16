Game.tiles.BonusIncPower = function () {
    Game.tiles.BonusTile.call(this);

    this.initImage('data/spt/bonus_inc_power.png');
};

extend(Game.tiles.BonusIncPower, Game.tiles.BonusTile, {
    castEffect: function (player) {
        player.power += 1;
    }
});