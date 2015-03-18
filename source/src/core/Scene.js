/**
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.Scene = function () {
    Game.GameObject.call(this);

    this._shaking = false;
    this._shakingAmp = 0;
    this._shakingTime = 0;
    this._shakingPhaseX = 0;
    this._shakingPhaseY = 0;
    this._shakingInitTime = 0;
    this._shakingInitAmp = 0;
};

extend(Game.Scene, Game.GameObject, {
    resize: function (newWidth, newHeight) {
    },
    shake: function (amp, time) {
        this._shaking = true;
        this._shakingInitTime = time;
        this._shakingTime = time;
        this._shakingInitAmp = amp;
        this._shakingAmp = amp;
    },
    update: function (delta) {
        Game.GameObject.prototype.update.call(this, delta);

        if (this._shaking) {
            if (this._shakingTime <= 0) {
                this._shaking = false;
            } else {
                this.x = Math.sin(this._shakingPhaseX) * this._shakingAmp;
                this.y = Math.cos(this._shakingPhaseY) * this._shakingAmp;
                this._shakingAmp = this._shakingInitAmp * (this._shakingTime / this._shakingInitTime);
                this._shakingPhaseX += (Math.PI * (50 + 100 * Math.random())) * delta;
                this._shakingPhaseY += (Math.PI * (50 + 100 * Math.random())) * delta;
                this._shakingTime -= delta;
            }
        }
    }
});
