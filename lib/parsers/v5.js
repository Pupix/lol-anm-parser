(function () {
    'use strict';

    module.exports = function (anm, parser) {
        var counter,
            i,
            j;

        anm.dataSize = parser.uint32();

        anm.unks = {};
        anm.unks[parser.tell()] = parser.uint32();
        anm.unks[parser.tell()] = parser.uint32();
        anm.unks[parser.tell()] = parser.uint32();

        anm.boneCounter = parser.int32();
        anm.frameCounter = parser.int32();
        anm.FPS = parser.float();

        anm.hashesOffset = parser.int32();
        anm.unks[parser.tell()] = parser.uint32();
        anm.unks[parser.tell()] = parser.uint32();
        anm.positionOffset = parser.int32();
        anm.quaternionOffset = parser.int32();
        anm.frameOffset = parser.int32();
        anm.unks[parser.tell()] = parser.uint32();
        anm.unks[parser.tell()] = parser.uint32();
        anm.unks[parser.tell()] = parser.uint32();

        anm.positions = [];
        counter = (anm.quaternionOffset - anm.positionOffset) / 12;
        for (i = 0; i < counter; i += 1) {
            anm.positions.push({
                x: parser.float(),
                y: parser.float(),
                z: parser.float()
            });
        }

        anm.quaternions = [];
        counter = (anm.hashesOffset - anm.quaternionOffset) / 6;
        for (i = 0; i < counter; i += 1) {
            anm.quaternions.push({
                x: parser.uint16(),
                y: parser.uint16(),
                z: parser.uint16()
            });
        }

        counter = (anm.frameOffset - anm.hashesOffset) / 4;
        anm.hashes = parser.uint32(counter);

        anm.frames = [];
        for (i = 0; i < anm.frameCounter; i += 1) {
            anm.frames[i] = [];

            for (j = 0; j < anm.boneCounter; j += 1) {
                anm.frames[i].push({
                    posId: parser.int16(),
                    sizeId: parser.int16(),
                    quatId: parser.int16()
                });
            }

        }

    };

}());
