/**
 *
 * @constructor
 * @extends Game.tiles.BonusTile
 */
Game.tiles.BonusRadio = function () {
    Game.tiles.BonusTile.call(this);
    this.initImage('data/spt/bonus_radio.png');
};

extend(Game.tiles.BonusRadio, Game.tiles.BonusTile, {
    castEffect: function (player) {
        player.bombType = Game.objects.RadioBomb;
        Game.currentScene.infoDie('Bomb upgrade: remote control.\nPress [' + Game.Input.getKeyName(Game.Input.BUTTON_B) + '] to explode.');
    }
});