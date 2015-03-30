/**
 * Collision radius
 *
 * @param radius
 * @constructor
 */
Game.CollisionCircle = function (radius) {
    Game.CollisionShape.call(this);

    this.radius = radius;
};

extend(Game.CollisionCircle, Game.CollisionShape, {
    getWidth: function () {
        return this.radius * 2;
    },
    getHeight: function () {
        return this.getWidth();
    }
});