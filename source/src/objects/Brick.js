Game.objects.Brick = function (v) {
    Game.MapCollisionObject.call(this);

    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/brick.png'));
    sprite.anchor.set(0.5, 0.5);
    this.addChild(sprite);

    this.lifeTime = 2;
    this.vector = v;
    this.collisionShape = new Game.CollisionRect(sprite.width / 2, sprite.height / 2);

    this.speed = Math.random() * 300 + 100;
    this.rotation = Math.random() * (Math.PI * 2);

    this.rnd_v = new Game.Vector(Math.random(), Math.random());
    this.collisionExcept = [Game.tiles.BombTile, Game.tiles.BrickWall];
};

extend(Game.objects.Brick, Game.MapCollisionObject, {
    collision: function (offsetX, offsetY, tile) {
        Game.MapCollisionObject.prototype.collision.call(this, offsetX, offsetY, tile);
        this.vector.x = offsetX;
        this.vector.y = offsetY;

        this.speed *= 0.5;
        this.vector.axisAlign();
    },
    update: function (delta) {
        this.x += (this.vector.x * this.rnd_v.x) * this.speed * delta;
        this.y += (this.vector.y * this.rnd_v.y) * this.speed * delta;

        this.speed *= 0.98;

        Game.MapCollisionObject.prototype.update.call(this, delta);
        if (this.lifeTime <= 0) {
            this.parent.removeChild(this);
        } else {
            if (this.lifeTime <= 2) {
                this.alpha = this.lifeTime / 2;
            }

            this.lifeTime -= delta;
        }
    }
});
