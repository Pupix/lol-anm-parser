/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    var toBinaryString = require('./toBinaryString');

    module.exports = function prepareQuaternion(quat) {
        var binaryString = toBinaryString(quat.z) + toBinaryString(quat.y) + toBinaryString(quat.x),
            result = {};

        result.flag = parseInt(binaryString.slice(0, 3), 2);
        result.x    = parseInt(binaryString.slice(3, 18), 2);
        result.y    = parseInt(binaryString.slice(18, 33), 2);
        result.z    = parseInt(binaryString.slice(33, 48), 2);

        return result;
    };

}());
