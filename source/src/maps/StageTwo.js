Game.maps.StageTwo = function () {
    Game.maps.Map.call(this);
    this.name = 'Stage Two';
    this.initGrid(31, 11, true);
    this.rndBrickWalls();

    this.next = Game.maps.WormsLair;

    for (var n = 0; n < 5; n++) {
        this.putMobRnd(new Game.mobs.FireStar(), false);
    }

    for (var n = 0; n < 3; n++) {
        this.putMobRnd(new Game.mobs.Ghost(), false);
    }

    this.getRndEmptyBrick().contains = new Game.tiles.Door();
    this.getRndEmptyBrick().contains = Math.random() > 0.5 ? new Game.tiles.BonusAddBomb() : new Game.tiles.BonusIncPower();
};

extend(Game.maps.StageTwo, Game.maps.Map);