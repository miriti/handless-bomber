Game.maps.StageTwo = function (bonuses) {
    Game.maps.Map.call(this);
    this.name = 'Stage Two';
    this.initGrid(21, 11, true);
    this.rndBrickWalls();

    this.next = Game.maps.StageThree;

    for (var n = 0; n < 3; n++) {
        this.putMobRnd(new Game.mobs.FireStar(), false);
    }

    if (bonuses) {
        this.getRndEmptyBrick().contains = Math.random() > 0.5 ? new Game.tiles.BonusAddBomb() : new Game.tiles.BonusIncPower();
    }

    this.getRndEmptyBrick().contains = new Game.tiles.Door();
};

extend(Game.maps.StageTwo, Game.maps.Map);