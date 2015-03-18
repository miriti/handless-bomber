Game.timestamp = null;
Game.lastTimestamp = null;
Game.currentScene = null;
Game._sceneStack = [];
Game.timeScale = 1;
Game.screenWidth = window.innerWidth;
Game.screenHeight = window.innerHeight;

/**
 * Set the current scene of the game
 *
 * @param scene
 */
Game.setCurrentScene = function (scene) {
    if (this.currentScene !== null) {
        this.stage.removeChild(this.currentScene);
        this._sceneStack.push(this.currentScene);
    }
    this.currentScene = scene;
    this.stage.addChild(this.currentScene);
};

/**
 * Frame
 */
Game.animationFrame = function () {
    var requestedDelta = 1000 / 60 / 1000;

    this.timestamp = new Date().getTime();
    var delta = this.lastTimestamp === null ? 0 : (this.timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = this.timestamp;

    if (this.currentScene !== null) {
        if (delta > requestedDelta) {
            while (delta > requestedDelta) {
                this.currentScene.update(requestedDelta * Game.timeScale);
                delta -= requestedDelta;
            }
        } else {
            this.currentScene.update(delta * Game.timeScale);
        }
    }

    this.renderer.render(this.stage);
    requestAnimationFrame(Game.animationFrame.bind(Game));
};

/**
 * Resize the game
 *
 * @param width
 * @param height
 */
Game.resize = function (width, height) {
    this.screenWidth = width;
    this.screenHeight = height;
    this.renderer.resize(width, height);
    this.stage.x = width / 2;
    this.stage.y = height / 2;
    if (this.currentScene !== null) {
        this.currentScene.resize(width, height);
    }
};

/**
 * Run the game
 */
Game.run = function () {
    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    this.renderer.backgroundColor = 0x061639;
    this.renderer.antialias = false;
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.stage.x = window.innerWidth / 2;
    this.stage.y = window.innerHeight / 2;

    PIXI.CONST.SCALE_MODES.DEFAULT = PIXI.CONST.SCALE_MODES.NEAREST;

    this.setCurrentScene(new Game.UI.MenuMain());

    var loader = new PIXI.Loader();
    loader.add('bomb', 'data/spt/bomb.png');
    loader.add('bricks', 'data/spt/bricks.png');
    loader.add('brick', 'data/spt/brick.png');
    loader.add('bonus_inc_power', 'data/spt/bonus_inc_power.png');
    loader.add('bonus_add_bomb', 'data/spt/bonus_add_bomb.png');
    loader.add('bonus_radio', 'data/spt/bonus_radio.png');
    loader.add('explosion_anim', 'data/spt/explosion.png');
    loader.add('explosion', 'data/snd/explosion.wav');
    loader.add('bonus', 'data/snd/bonus.wav');
    loader.add('bomb_snd', 'data/snd/bomb.wav');

    var self = this;

    loader.once('complete', function () {
        self.animationFrame();
    });

    loader.load();

    window.onresize = function () {
        Game.resize(window.innerWidth, window.innerHeight);
    };
};

Game.run();
