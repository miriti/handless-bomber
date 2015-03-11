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
};

extend(Game.mobs.Player, Game.mobs.Mob);

/**
 *
 * @param delta
 * @override
 */
Game.mobs.Player.prototype.update = function (delta) {
    if (Game.Input.left())
        this.x -= 200 * delta;

    if (Game.Input.right())
        this.x += 200 * delta;

    if (Game.Input.up())
        this.y -= 200 * delta;

    if (Game.Input.down())
        this.y += 200 * delta;
    
    Game.mobs.Mob.prototype.update.call(this, delta);
};
