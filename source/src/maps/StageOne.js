Game.maps.StageOne = function () {
    Game.maps.Map.call(this);

    this.name = 'Stage 1';

    this.next = Game.maps.WormsLair;

    this.initGrid(15, 15, true);

    this.rndBrickWalls();

    for (var n = 0; n < 5; n++) {
        var enemy = new Game.mobs.Ghost();

        do {
            var cellX = Math.round(this.gridWidth * Math.random());
            var cellY = Math.round(this.gridHeight * Math.random());
        } while (this.getTile(cellX, cellY) !== false);

        this.putMob(enemy, cellX, cellY, false);
    }

    this.getRndEmptyBrick().contains = new Game.tiles.Door();

    // possible bonuses
    var bonuses = [Game.tiles.BonusIncPower, Game.tiles.BonusAddBomb, Game.tiles.BonusRadio];

    // hide random bonus on the level
    this.getRndEmptyBrick().contains = new bonuses[Math.floor(Math.random() * bonuses.length)]();
};

extend(Game.maps.StageOne, Game.maps.Map);