/**
 *
 * @constructor
 */
Game.maps.Overbricked = function () {
    Game.maps.Map.call(this);

    this.name = 'Overbricked';

    this.next = Game.maps.WormsLair;

    this.initGrid(21, 21);
    this.rndBrickWalls(function () {
        return true;
    });

    for (var ho = 0; ho < this.gridWidth; ho++) {
        this.putTile(new Game.tiles.SolidWall(), ho, 0);
        this.putTile(new Game.tiles.SolidWall(), ho, this.gridHeight - 1);
    }

    for (var v = 0; v < this.gridHeight; v++) {
        this.putTile(new Game.tiles.SolidWall(), 0, v);
        this.putTile(new Game.tiles.SolidWall(), this.gridWidth - 1, v);
    }

    for (var n = 0; n < 5; n++) {
        this.putMobRnd(new Game.mobs.FireStar(), true);
    }

    for (var i = 0; i < 3; i++) {
        this.getRndEmptyBrick().contains = new Game.tiles.BonusIncPower();
        this.getRndEmptyBrick().contains = new Game.tiles.BonusAddBomb();
        this.getRndEmptyBrick().contains = new Game.tiles.BonusRadio();
    }

    this.getRndEmptyBrick().contains = new Game.tiles.Door();
};

extend(Game.maps.Overbricked, Game.maps.Map);