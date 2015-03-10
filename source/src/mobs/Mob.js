Game.mobs = {};

Game.mobs.Mob = function () {
    Game.GameObject.call(this);
};

extend(Game.mobs.Mob, Game.GameObject);
