Game.maps.StageThree = function (bonuses) {
    Game.maps.Map.call(this);
    this.name = 'Stage Three';
    this.initGrid(31, 31);
    this.rndBrickWalls();
    this.next = Game.maps.WormsLair;

    for (var n = 0; n < 5; n++) {
        this.putMobRnd(new Game.mobs.FireStar(), false);
    }

    for (var n = 0; n < 3; n++) {
        this.putMobRnd(new Game.mobs.Ghost(), false);
    }

    this.getRndEmptyBrick().contains = new Game.tiles.BonusAddBomb();
    if (bonuses) {
        this.getRndEmptyBrick().contains = new Game.tiles.Door();
    }
};

extend(Game.maps.StageThree, Game.maps.Map);