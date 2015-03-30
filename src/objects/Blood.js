Game.objects.Blood = function (vector) {
    Game.MapCollisionObject.call(this);
    var scale = 1 + Math.random() * 3;

    this.speed = vector || new Game.Vector();
    this.life = 2 + Math.random() * 2;
    this.rotationSpeed = Math.PI;
    this.collisionShape = new Game.CollisionCircle(4 * scale);

    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/blood.png'));
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(scale, scale);

    this.addChild(this.sprite);
};

extend(Game.objects.Blood, Game.MapCollisionObject, {
    collision: function (offsetX, offsetY, tile) {
        Game.MapCollisionObject.prototype.collision.call(this, offsetX, offsetY, tile);
        this.speed.set(0, 0);
        this.rotationSpeed = 0;
    },
    update: function (delta) {
        if (this.life <= 0) {
            this.parent.removeChild(this);
            return;
        }

        if (this.life < 2) {
            this.alpha = this.life / 2;
        }

        this.x += this.speed.x * delta;
        this.y += this.speed.y * delta;

        this.rotation += this.rotationSpeed * delta;

        this.speed.x *= 0.98;
        this.speed.y *= 0.98;
        this.rotationSpeed *= 0.98;

        Game.MapCollisionObject.prototype.update.call(this, delta);

        this.life -= delta;
    }
});