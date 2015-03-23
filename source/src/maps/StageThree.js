Game.maps.StageThree = function (bonuses) {
    Game.maps.Map.call(this);
    this.name = 'Stage Three';
    this.initGrid(21, 21, true);
    this.rndBrickWalls();
    this.next = Game.maps.Overbricked;

    for (var n = 0; n < 3; n++) {
        this.putMobRnd(new Game.mobs.FireStar(), false);
    }

    for (var n = 0; n < 5; n++) {
        this.putMobRnd(new Game.mobs.Ghost(), false);
    }

    if (bonuses) {
        for (var i = 0; i < 4; i++) {
            this.getRndEmptyBrick().contains = Math.random() > 0.5 ? new Game.tiles.BonusIncPower() : new Game.tiles.BonusAddBomb();
        }

        this.getRndEmptyBrick().contains = new Game.tiles.BonusIncPower();
    }

    this.getRndEmptyBrick().contains = new Game.tiles.Door();
};

extend(Game.maps.StageThree, Game.maps.Map);