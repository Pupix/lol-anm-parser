(function () {
    'use strict';

    var XP = require('expandjs'),
        util = require('../util');

    module.exports = function (readable, data) {

        var rFrame,
            quat,
            boneFrames,
            timeHelper,
            vtx,
            scl;

        readable.FPS = data.FPS;
        readable.duration = data.animationLength;

        data.boneHashes.forEach(function (hash, index) {
            readable.bones[index] = {};
            readable.bones[index].name = undefined;
            readable.bones[index].hash = hash;

            readable.bones[index].frames = [];

            boneFrames = XP.filter(data.entries, {hashId: index});

            XP.forEach(boneFrames, function (entry) {
                rFrame = {};

                timeHelper = util.uncompressTime(entry.compressedTime, readable.duration, readable.FPS);

                readable.bones[index].frames[timeHelper.id] = readable.bones[index].frames[timeHelper.id] || {};
                rFrame.time = timeHelper.time;
                rFrame.index = timeHelper.id;
                rFrame.time = timeHelper.time;

                switch (entry.dataType) {
                case 0:
                    quat = util.prepareQuaternion(entry.compressedData);
                    rFrame.quaternion = util.uncompressQuaternion(quat.flag, quat.x, quat.y, quat.z);
                    break;
                case 64:
                    vtx = util.prepareVector(entry.compressedData);
                    rFrame.position = util.uncompressVector(data.minTranslation, data.maxTranslation, vtx.x, vtx.y, vtx.z);
                    break;
                case 128:
                    scl = util.prepareVector(entry.compressedData);
                    rFrame.scale = util.uncompressVector(data.minScale, data.maxScale, scl.x, scl.y, scl.z);
                    break;
                }

                XP.merge(readable.bones[index].frames[timeHelper.id], rFrame);
            });
        });

        util.findMissingFramesV1(readable);

    };

}());
