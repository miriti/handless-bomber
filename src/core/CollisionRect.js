/**
 * Collision rect
 *
 * @param halfWidth
 * @param halfHeight
 * @constructor
 */
Game.CollisionRect = function (halfWidth, halfHeight) {
    Game.CollisionShape.call(this);

    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
};

extend(Game.CollisionRect, Game.CollisionShape, {
    getWidth: function () {
        return this.halfWidth * 2;
    },
    getHeight: function () {
        return this.halfHeight * 2;
    }
});