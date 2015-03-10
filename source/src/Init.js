/**
 * Extend one Function from another
 *
 * @param a
 * @param b
 * @param prototype
 */
var extend = function (a, b, prototype) {
    a.prototype = Object.create(b.prototype);
    a.prototype.constructor = a;
    if (typeof prototype !== 'undefined') {
        for (var k in prototype) {
            a.prototype[k] = prototype[k];
        }
    }
};

var Game = {};