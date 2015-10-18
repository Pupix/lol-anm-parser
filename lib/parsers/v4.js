(function () {
    'use strict';

    module.exports = function (anm, parser) {
        var counter,
            i,
            j;

        anm.dataSize = parser.int32();
        anm.designerId = parser.uint32();

        anm.unks = {};
        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();

        anm.boneCounter = parser.int32();
        anm.frameCounter = parser.int32();
        anm.FPS = parser.float();

        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();

        anm.positionOffset = parser.int32();
        anm.quaternionOffset = parser.int32();
        anm.frameOffset = parser.int32();

        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();

        anm.vertices = [];
        counter = (anm.quaternionOffset - anm.positionOffset) / 12;
        for (i = 0; i < counter; i += 1) {
            anm.vertices.push({
                x: parser.float(),
                y: parser.float(),
                z: parser.float()
            });
        }

        anm.quaternions = [];
        counter = (anm.frameOffset - anm.quaternionOffset) / 16;
        for (i = 0; i < counter; i += 1) {
            anm.quaternions.push({
                x: parser.float(),
                y: parser.float(),
                z: parser.float(),
                w: parser.float()
            });
        }

        anm.frames = [];
        for (i = 0; i < anm.frameCounter; i += 1) {
            anm.frames[i] = [];

            for (j = 0; j < anm.boneCounter; j += 1) {
                anm.frames[i].push({
                    boneHash: parser.uint32(),
                    posId: parser.int16(),
                    sclId: parser.int16(),
                    quatId: parser.int16(),
                    unkId: parser.int16()
                });
            }

        }

    };

}());
