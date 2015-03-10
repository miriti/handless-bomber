/**
 *
 * @constructor
 * @extends Game.mobs.Mob
 */
Game.mobs.Player = function () {
    Game.mobs.Mob.call(this);

    var g = new PIXI.Graphics();
    g.beginFill(0x7788aa);
    g.drawRect(-20, -20, 40, 40);
    g.endFill();

    this.addChild(g);
};

extend(Game.mobs.Player, Game.mobs.Mob);

/**
 *
 * @param delta
 * @override
 */
Game.mobs.Player.prototype.update = function (delta) {
    Game.mobs.Mob.prototype.update.call(this, delta);

    if (Game.Input.left())
        this.x -= 200 * delta;

    if (Game.Input.right())
        this.x += 200 * delta;

    if (Game.Input.up())
        this.y -= 200 * delta;

    if (Game.Input.down())
        this.y += 200 * delta;
};
