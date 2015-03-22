Game.maps.StageOne = function () {
    Game.maps.Map.call(this);

    this.name = 'Stage One';

    this.next = Game.maps.StageTwo;

    this.initGrid(15, 15, true);

    this.rndBrickWalls();

    for (var n = 0; n < 1; n++) {
        this.putMobRnd(new Game.mobs.FireStar(), false);
    }

    this.getRndEmptyBrick().contains = new Game.tiles.Door();
    this.getRndEmptyBrick().contains = new Game.tiles.BonusIncPower();
};

extend(Game.maps.StageOne, Game.maps.Map);