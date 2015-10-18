(function () {
    'use strict';

    var XP = require('expandjs'),
        util = require('../util');

    module.exports = function (readable, data) {

        var rBone,
            rFrame,
            quat,
            i,
            j;

        readable.FPS = XP.round(1 / data.FPS);
        readable.duration = data.frameCounter / readable.FPS;

        for (i = 0; i < data.boneCounter; i += 1) {
            readable.bones[i] = {};
            readable.bones[i].hash = data.hashes[i];
            readable.bones[i].frames = [];

            for (j = 0; j < data.frameCounter; j += 1) {
                readable.bones[i].frames[j] = {};
            }
        }

        data.frames.forEach(function (frame, fIndex) {
            frame.forEach(function (bone, bIndex) {
                rBone = readable.bones[bIndex];

                rFrame = rBone.frames[fIndex];
                rFrame.position = data.positions[bone.posId];

                quat = data.quaternions[bone.quatId];
                quat = util.prepareQuaternion(quat);

                rFrame.quaternion = util.uncompressQuaternion(quat.flag, quat.x, quat.y, quat.z);
                rFrame.scale = {x: 1, y: 1, z: 1};
            });
        });

    };

}());
