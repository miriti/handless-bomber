Game.Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

Game.Vector.prototype = {
    len: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    setLen: function (len) {
        var l = this.len();
        if (l > 0) {
            this.x = (this.x / l) * len;
            this.y = (this.y / l) * len;
        } else {
            this.x = this.y = 0;
        }
    },
    toString: function () {
        return '[' + this.x + ', ' + this.y + ']';
    }
};