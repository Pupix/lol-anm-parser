(function () {
    'use strict';

    var XP = require('expandjs');

    module.exports = function (readable, data) {

        var rBone,
            rFrame,
            i,
            j;

        readable.FPS = XP.round(1 / data.FPS);
        readable.duration = data.frameCounter / readable.FPS;

        // Preparing
        for (i = 0; i < data.boneCounter; i += 1) {
            readable.bones[i] = {};
            readable.bones[i].hash = data.frames[0][i].boneHash;
            readable.bones[i].frames = [];

            for (j = 0; j < data.frameCounter; j += 1) {
                readable.bones[i].frames[j] = {};
            }
        }

        data.frames.forEach(function (frame, fIndex) {
            frame.forEach(function (bone, bIndex) {
                rBone = readable.bones[bIndex];

                rFrame = rBone.frames[fIndex];
                rFrame.position = data.vertices[bone.posId];
                rFrame.quaternion = data.quaternions[bone.quatId];
                rFrame.scale = {x: 1, y: 1, z: 1};
            });
        });

    };

}());
