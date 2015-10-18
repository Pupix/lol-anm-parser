/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    module.exports = function uncompressQuaternion(flag, sx, sy, sz) {
        var fx = 1.41421 * (sx - 0x3FFF) / 0x7FFF,
            fy = 1.41421 * (sy - 0x3FFF) / 0x7FFF,
            fz = 1.41421 * (sz - 0x3FFF) / 0x7FFF,
            fw = Math.sqrt(1 - Math.pow(fx, 2) - Math.pow(fy, 2) -  Math.pow(fz, 2)),
            quat = {};

        switch (flag) {
        case 0:
            quat.x = fw;
            quat.y = fx;
            quat.z = fy;
            quat.w = fz;
            break;
        case 1:
            quat.x = fx;
            quat.y = fw;
            quat.z = fy;
            quat.w = fz;
            break;
        case 2:
            quat.x = -fx;
            quat.y = -fy;
            quat.z = -fw;
            quat.w = -fz;
            break;
        case 3:
            quat.x = fx;
            quat.y = fy;
            quat.z = fz;
            quat.w = fw;
            break;
        default:
            quat.x = fx;
            quat.y = fy;
            quat.z = fz;
            quat.w = fw;
            quat.invalid = true;
            quat.flag = flag;
        }

        return quat;
    };

}());
