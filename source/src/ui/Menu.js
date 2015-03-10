/**
 * Menu item
 *
 * @constructor
 * @extends PIXI.Container
 */
Game.UI.MenuItem = function (caption, callback) {
    PIXI.Container.call(this);

    this.text = new PIXI.Text(caption, {font: 'normal 48px monospace', fill: '#7788aa'});
    this.text.x = -this.text.width / 2;
    this.addChild(this.text);

    this.interactive = true;

    var self = this;
    this.addEventListener('click', function () {
        callback.call(self);
    });
};

extend(Game.UI.MenuItem, PIXI.Container);

/**
 * Menu
 *
 * @constructor
 * @extends Game.GameObject
 */
Game.UI.Menu = function (items) {
    Game.GameObject.call(this);
    this.items = [];

    for (var i in items) {
        this.items[i] = new Game.UI.MenuItem(items[i].caption, items[i].exec);
        this.addChild(this.items[i]);
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

    var menu = new Game.UI.Menu([
        {
            caption: "New Game",
            exec: function () {
                Game.setCurrentScene(new Game.Scenes.Game());
            }
        }
    ]);

    menu.y = -menu.height / 2;

    this.addChild(menu);
};

extend(Game.UI.MenuMain, Game.Scene);
