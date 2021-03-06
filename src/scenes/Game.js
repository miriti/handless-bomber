/**
 * Main game scene
 *
 * @constructor
 * @extends Game.Scene
 */
Game.Scenes.Game = function () {
    Game.Scene.call(this);

    this.currentMap = null;
    this.gameContainer = new Game.GameObject();
    this.player = new Game.mobs.Player();
    this.addChild(this.gameContainer);

    this.blinds = new Game.Scenes.Blinds();
    this.addChild(this.blinds);

    this.changeMap(new Game.maps.StageOne(true));
};

extend(Game.Scenes.Game, Game.Scene, {
    win: function () {
        var self = this;
        this.currentMap.paused = true;
        this.blinds.closeFunc = Bounce.easeOut;
        this.blinds.close(2, function () {
            var winDie = new PIXI.Text("YOU WON!\npress any key", {
                font: 'normal 72px monospace',
                fill: '#9974aa',
                align: 'center'
            });
            winDie.anchor.set(0.5, 0.5);
            winDie.rotation = -Math.PI * 10;
            winDie.scale.set(0, 0);

            self.addChild(winDie);

            TweenLite.to(winDie.scale, 1, {x: 0.9, y: 0.9});
            TweenLite.to(winDie, 1, {
                rotation: 0,
                onComplete: function () {
                    // TODO Win
                }
            });
        });

    },
    /**
     * Show some information to the user
     *
     * @param text
     */
    infoDie: function (text) {
        var textContainer = new PIXI.Container();

        var infoText_shadow = new PIXI.Text(text, {font: 'normal 48px monospace', fill: '#061639'});
        infoText_shadow.anchor.set(0.5, 0.5);
        infoText_shadow.position.set(2, 2);
        textContainer.addChild(infoText_shadow);

        var infoText = new PIXI.Text(text, {font: 'normal 48px monospace', fill: '#aa4639'});
        infoText.anchor.set(0.5, 0.5);
        textContainer.addChild(infoText);

        textContainer.scale.set(100, 100);
        textContainer.alpha = 0;

        textContainer.y = Game.screenHeight / 4;

        this.addChild(textContainer);

        TweenLite.to(textContainer, 1, {alpha: 1});
        TweenLite.to(textContainer.scale, 1, {
            x: 1,
            y: 1,
            onComplete: function () {
                TweenLite.to(textContainer.scale, 2, {
                    x: 0.95,
                    y: 0.95,
                    onComplete: function () {
                        TweenLite.to(textContainer, 1, {alpha: 0});
                        TweenLite.to(textContainer.scale, 1, {
                            x: 100,
                            y: 100,
                            onComplete: function () {
                                textContainer.parent.removeChild(textContainer);
                            }
                        });
                    }
                });
            }
        });
    },
    recreatePlayer: function () {
        var newPlayer = new Game.mobs.Player();

        copyProps(this.player, newPlayer, ['lives', 'power', 'bombCapacity']);

        return newPlayer;
    },
    gameOver: function () {
        var self = this;
        this.currentMap.paused = true;
        this.blinds.closeFunc = Bounce.easeOut;
        this.blinds.close(2, function () {
            var gameOverDie = new PIXI.Text('Game Over', {
                font: 'normal 72px monospace',
                fill: '#9974aa',
                align: 'center'
            });
            gameOverDie.anchor.set(0.5, 0.5);
            gameOverDie.rotation = -Math.PI * 10;
            gameOverDie.scale.set(0, 0);

            self.addChild(gameOverDie);

            TweenLite.to(gameOverDie.scale, 1, {x: 0.9, y: 0.9});
            TweenLite.to(gameOverDie, 1, {
                rotation: 0,
                onComplete: function () {
                    TweenLite.to(gameOverDie.scale, 2, {
                        x: 1,
                        y: 1,
                        onComplete: function () {
                            TweenLite.to(gameOverDie, 0.2, {
                                height: 1,
                                width: Game.screenWidth,
                                onComplete: function () {
                                    Game.setCurrentScene(new Game.UI.MenuMain());
                                }
                            });
                        }
                    });
                }
            })
        });
    },
    restartMap: function () {
        if (this.currentMap !== null) {
            this.changeMap(new this.currentMap.constructor(true));
        }
    },
    changeMap: function (map) {
        var self = this;

        map.paused = true;

        if (this.currentMap !== null) {
            this.currentMap.paused = true;
            this.blinds.close(1, function () {
                self.currentMap.removeChild(self.player);
                self.currentMap.parent.removeChild(self.currentMap);
                self.currentMap = null;
                self.changeMap(map);
            });
            return;
        } else {
            this.blinds.close(0, function () {
            });
        }

        var levelName = new PIXI.Text(map.name + "\nLives left: " + self.player.lives, {
            font: 'normal 48px monospace',
            fill: '#9974aa',
            align: 'center'
        });
        levelName.anchor.set(0.5, 0.5);
        this.addChild(levelName);

        levelName.scale.set(0, 0);
        levelName.rotation = -Math.PI * 10;

        TweenLite.to(levelName.scale, 1, {x: 0.9, y: 0.9});
        TweenLite.to(levelName, 1, {
            rotation: 0, onComplete: function () {
                TweenLite.to(levelName.scale, 2, {
                    x: 1, y: 1, onComplete: function () {
                        TweenLite.to(levelName.scale, 1, {x: 0, y: 0});
                        TweenLite.to(levelName, 1, {
                            rotation: -Math.PI * 10,
                            onComplete: function () {
                                self.currentMap = map;
                                self.player = self.recreatePlayer();
                                self.currentMap.putPlayer(self.player);
                                self.gameContainer.addChild(self.currentMap);

                                self.blinds.open(1, function () {
                                    self.player.hasControl = true;
                                    self.currentMap.paused = false;
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    /**
     * Resize
     *
     * @param newWidth
     * @param newHeight
     */
    resize: function (newWidth, newHeight) {
    },
    /**
     *
     * @param delta
     * @override
     */
    update: function (delta) {
        Game.Scene.prototype.update.call(this, delta);
        this.gameContainer.x = -this.player.x;
        this.gameContainer.y = -this.player.y;
    }
});
