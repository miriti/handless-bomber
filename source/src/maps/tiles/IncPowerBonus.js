Game.tiles.IncPowerBonus = function () {
    Game.tiles.BonusTile.call(this);

    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/bonus_inc_power.png'));
    sprite.anchor.set(0.5, 0.5);
    sprite.alpha = 0.8;

    this.addChild(sprite);
};

extend(Game.tiles.IncPowerBonus, Game.tiles.BonusTile, {
    castEffect: function (player) {
        player.power += 1;
    }
});