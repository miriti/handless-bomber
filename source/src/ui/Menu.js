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
    this.text.x = -this.text.width / 2;
    this.addChild(this.text);

    this.interactive = true;

    var self = this;
    this.addEventListener('click', function () {
        callback.call(self);
    });

    this.addEventListener('mouseover', function () {
        self.focus(true);
    });

    this.addEventListener('mouseout', function () {
        self.focus(false);
    });
};

extend(Game.UI.MenuItem, PIXI.Container, {
    focus: function (is) {
        if (is) {
            this.text.style = {font: 'normal 48px monospace', fill: '#ffb4aa'};
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
            caption: "Button A: Z",
            exec: function () {
                var self = this;
                self.text.text = 'PRESS A KEY';
                thisMenu.getKey(function (code) {
                    self.text.text = 'Button A: ' + Game.Input.getKeyName(code);
                });
            }
        },
        {
            caption: "Button B: X",
            exec: function () {
                var self = this;
                self.text.text = 'PRESS A KEY';
                thisMenu.getKey(function (code) {
                    self.text.text = 'Button B: ' + Game.Input.getKeyName(code);
                });
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
