/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.anim.Player = function () {
    Game.GameObject.call(this);

    this.body = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/player-body.png'));
    this.body.anchor.set(0.5, 1);
    this.addChild(this.body);

    this.leftLeg = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/player-leg.png'));
    this.leftLeg.anchor.set(0.5, 0);

    this.rightLeg = new PIXI.Sprite(PIXI.Texture.fromImage('data/spt/player-leg.png'));
    this.rightLeg.anchor.set(0.5, 0);

    this.addChild(this.leftLeg);
    this.addChild(this.rightLeg);

    this.changeState('idle');

    this.phase = 0;
};

extend(Game.anim.Player, Game.GameObject, {
    changeState: function (state) {
        if (state != this.state) {
            if (['idle', 'running'].indexOf(state) !== -1) {
                this.state = state;

                switch (state) {
                    case 'idle':
                        this.leftLeg.y = this.rightLeg.y = 0;
                        this.leftLeg.x = -2;
                        this.rightLeg.x = 4;
                        break;

                    case 'running':
                        this.body.y = 0;
                        break;
                }
            }
        }
    },
    update: function (delta) {
        Game.GameObject.prototype.update.call(this, delta);

        switch (this.state) {
            case 'idle':
                this.body.y = 2 + Math.sin(this.phase) * 2;
                break;
            case 'running':
                this.leftLeg.y = -2 + Math.sin(this.phase * 10) * 2;
                this.rightLeg.y = -2 + Math.cos(this.phase * 10) * 2;
                break;
        }

        this.phase += Math.PI * delta;
    }
});