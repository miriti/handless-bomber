/**
 * Menu item
 *
 * @constructor
 * @extends PIXI.Container
 */
Game.UI.MenuItem = function (caption, callback) {
    PIXI.Container.call(this);

    this.buttonMode = true;
    this.text = new PIXI.Text(caption, {font: 'normal 48px monospace', fill: '#7788aa'});
    this.text.anchor.set(0.5, 0.5);
    this.addChild(this.text);

    this.interactive = true;

    var self = this;
    this.click = function () {
        callback.call(self);
    };

    this.mouseover = function () {
        self.focus(true);
    };

    this.mouseout = function () {
        self.focus(false);
    };
};

extend(Game.UI.MenuItem, PIXI.Container, {
    focus: function (is) {
        if (is) {
            this.text.style = {font: 'bold 48px monospace', fill: '#ffb4aa'};
        } else {
            this.text.style = {font: 'normal 48px monospace', fill: '#7788aa'};
        }
    }
});

/**
 * Menu
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.UI.Menu = function (items) {
    Game.GameObject.call(this);
    this.items = [];

    var currenty = 0;

    for (var i in items) {
        this.items[i] = new Game.UI.MenuItem(items[i].caption, items[i].exec);
        this.items[i].y = currenty;
        this.addChild(this.items[i]);

        currenty += this.items[i].height;
    }
};

extend(Game.UI.Menu, Game.GameObject);

/**
 * Main menu
 *
 * @constructor
 * @extends Game.Scene
 */
Game.UI.MenuMain = function () {
    Game.Scene.call(this);

    var thisMenu = this;

    var menu = new Game.UI.Menu([
        {
            caption: "New Game",
            exec: function () {
                Game.setCurrentScene(new Game.Scenes.Game());
            }
        },
        {
            caption: "Button A: " + Game.Input.getKeyName(Game.Input.BUTTON_A),
            exec: function () {
                var self = this;
                if (!self.waitKey) {
                    self.waitKey = true;
                    self.text.text = 'PRESS A KEY';
                    thisMenu.getKey(function (code) {
                        Game.Input.BUTTON_A = code;
                        self.text.text = 'Button A: ' + Game.Input.getKeyName(code);
                        self.waitKey = false;
                    });
                }
            }
        },
        {
            caption: "Button B: " + Game.Input.getKeyName(Game.Input.BUTTON_B),
            exec: function () {
                var self = this;
                if (!self.waitKey) {
                    self.waitKey = true;
                    self.text.text = 'PRESS A KEY';
                    thisMenu.getKey(function (code) {
                        Game.Input.BUTTON_B = code;
                        self.text.text = 'Button B: ' + Game.Input.getKeyName(code);
                        self.waitKey = false;
                    });
                }
            }
        }
    ]);

    menu.y = -menu.height / 2;

    this.addChild(menu);

    this.keySelect = false;
};

extend(Game.UI.MenuMain, Game.Scene, {
    getKey: function (callback) {
        Game.Input.addCallback(function (e) {
            callback.call(this, e.keyCode);
        });
    }
});
