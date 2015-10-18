/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    var toBinaryString = require('./toBinaryString');

    module.exports = function prepareVector(vtx) {
        var binaryString = toBinaryString(vtx.z) + toBinaryString(vtx.y) + toBinaryString(vtx.x),
            result = {};

        result.x = parseInt(binaryString.slice(32, 48), 2);
        result.y = parseInt(binaryString.slice(16, 32), 2);
        result.z = parseInt(binaryString.slice(0, 16), 2);

        return result;
    };

}());
