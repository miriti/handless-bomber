Game.maps.WormsLair = function () {
    Game.maps.Map.call(this);
    this.name = "Worm's Lair";

    this.initGrid(15, 15, true);
    this.putMob(new Game.mobs.Worm(20), 7, 7, false);
    this.putTile(new Game.tiles.Door(), 7, 7);
};

extend(Game.maps.WormsLair, Game.maps.Map);
