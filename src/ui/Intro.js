/**
 *
 * @constructor
 * @extends Game.Scene
 */
Game.UI.Intro = function () {
    Game.Scene.call(this);

    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/igdc_logo.png'));
    sprite.anchor.set(0.5, 0.5);
    sprite.scale.set(0.5, 0.5);

    this.addChild(sprite);

    var self = this;

    var callback = function () {
        self.tween.kill();
        Game.setCurrentScene(new Game.UI.MenuMain());
    };

    Game.Input.addCallback(callback);

    this.tween = TweenLite.to(sprite.scale, 5, {
        x: 1,
        y: 1,
        onComplete: function () {
            self.tween = TweenLite.to(sprite, 3, {
                alpha: 0,
                onComplete: function () {
                    Game.Input.removeCallback(callback);
                    Game.setCurrentScene(new Game.UI.MenuMain());
                }
            });
        }
    });
};

extend(Game.UI.Intro, Game.Scene);