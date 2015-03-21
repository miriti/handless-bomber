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
        return this;
    },
    axisAlign: function () {
        if (this.x > 0) this.x = 1;
        if (this.x < 0) this.x = -1;
        if (this.y > 0) this.y = 1;
        if (this.y < 0) this.y = -1;
        return this;
    },
    toString: function () {
        return '[' + this.x + ', ' + this.y + ']';
    },
    set: function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    },
    mult: function (a) {
        this.x *= a;
        this.y *= a;
        return this;
    }
};