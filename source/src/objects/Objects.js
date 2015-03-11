Game.objects = {};

Game.MapObject = function () {
    Game.GameObject.call(this);
    this.cell = new PIXI.math.Point(0, 0);
};

extend(Game.MapObject, Game.GameObject);