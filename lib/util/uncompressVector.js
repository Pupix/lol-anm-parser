/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    module.exports = function uncompressVector(min, max, x, y, z) {
        var uv = {
            x: max.x - min.x,
            y: max.y - min.y,
            z: max.z - min.z
        };

        uv.x *= (x / 65535);
        uv.y *= (y / 65535);
        uv.z *= (z / 65535);

        uv.x = uv.x + min.x;
        uv.y = uv.y + min.y;
        uv.z = uv.z + min.z;

        return uv;
    };

}());
