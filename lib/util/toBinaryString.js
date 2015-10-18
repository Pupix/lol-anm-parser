/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    module.exports = function toBinaryString(value) {
        var result = value.toString(2),
            missing,
            i;

        missing = 16 - result.length;
        for (i = 0; i < missing; i += 1) {
            result = '0' + result;
        }
        return result;
    };

}());
