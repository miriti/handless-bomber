Game.Scenes.Blinds = function () {
    Game.GameObject.call(this);

    this.leftBlind = this.genQuad(0x0, Game.screenWidth / 2, Game.screenHeight);
    this.rightBlind = this.genQuad(0x0, Game.screenWidth / 2, Game.screenHeight);

    this.addChild(this.leftBlind);
    this.addChild(this.rightBlind);

    this.openPos = Game.screenWidth - (Game.screenWidth / 4);
    this.closePos = Game.screenWidth / 4;
    this.openFunc = Power1.easeIn;
    this.closeFunc = Power1.easeOut;
};

extend(Game.Scenes.Blinds, Game.GameObject, {
    close: function (time, callback) {
        if (time == 0) {
            this.leftBlind.x = -this.closePos;
            this.rightBlind.x = this.closePos;
            callback.call();
        } else {
            this.leftBlind.x = -this.openPos;
            this.rightBlind.x = this.openPos;

            TweenLite.to(this.leftBlind, time, {
                x: -this.closePos,
                ease: this.closeFunc
            });
            TweenLite.to(this.rightBlind, time, {
                x: this.closePos,
                ease: this.closeFunc,
                onComplete: function () {
                    callback.call();
                }
            });
        }
    },
    open: function (time, callback) {
        this.leftBlind.x = -this.closePos;
        this.rightBlind.x = this.closePos;

        TweenLite.to(this.leftBlind, time, {
            x: -this.openPos,
            ease: this.openFunc
        });
        TweenLite.to(this.rightBlind, time, {
            x: this.openPos,
            ease: this.openFunc,
            onComplete: function () {
                callback.call();
            }
        });
    }
});