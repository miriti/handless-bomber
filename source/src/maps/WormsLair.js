Game.maps.WormsLair = function () {
    Game.maps.Map.call(this);
    this.name = "Worm's Lair";

    this.initGrid(15, 15, true);
    this.putMob(new Game.mobs.Worm(), 7, 7, false);
};

extend(Game.maps.WormsLair, Game.maps.Map);
