/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    var XP = require('expandjs');

    module.exports = function uncompressQuaternion(time, animationLength, fps) {
        var uTime,
            frameId;

        uTime = XP.round((time / 65535) * 100) / 100;
        uTime = uTime * animationLength;
        frameId = XP.round(uTime * fps);

        return {time: uTime, id: frameId};
    };

}());
