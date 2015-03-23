Game.maps.StageOne = function (bonuses) {
    Game.maps.Map.call(this);

    this.name = 'Stage One';

    this.next = Game.maps.StageTwo;

    this.initGrid(17, 17, true);

    this.rndBrickWalls();

    for (var n = 0; n < 5; n++) {
        this.putMobRnd(new Game.mobs.Ghost(), false);
    }

    this.getRndEmptyBrick().contains = new Game.tiles.Door();
    if (bonuses) {
        this.getRndEmptyBrick().contains = new Game.tiles.BonusIncPower();
    }
};

extend(Game.maps.StageOne, Game.maps.Map);