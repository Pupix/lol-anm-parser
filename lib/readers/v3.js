(function () {
    'use strict';

    var XP = require('expandjs'),
        util = require('lol-hash-util');

    module.exports = function (readable, data) {

        var rBone,
            rFrame;

        readable.FPS = data.FPS;
        readable.duration = data.frameCounter / readable.FPS;

        data.bones.forEach(function (bone) {
            rBone = XP.push(readable.bones, {});
            rBone.name = bone.name.slice(0, bone.name.indexOf('\u0000'));
            rBone.hash = util.boneHash(rBone.name);
            rBone.frames = [];

            bone.frames.forEach(function (frame) {
                rFrame = XP.push(rBone.frames, {});
                rFrame.position = {
                    x: frame.translateX,
                    y: frame.translateY,
                    z: frame.translateZ
                };
                rFrame.quaternion = {
                    x: frame.quatX,
                    y: frame.quatY,
                    z: frame.quatZ,
                    w: frame.quatW
                };
                rFrame.scale = {x: 1, y: 1, z: 1};
            });
        });

    };

}());
