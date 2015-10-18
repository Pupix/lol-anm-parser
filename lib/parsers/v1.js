(function () {
    'use strict';

    module.exports = function (anm, parser) {
        var indexCounter,
            i;

        anm.dataSize = parser.int32();

        anm.unks = {};
        anm.subMagic = parser.string(4);
        anm.subVersion = parser.int32();
        anm.boneCounter = parser.int32();
        anm.entriesCounter = parser.int32();
        anm.unks[parser.tell()] = parser.int32();
        anm.animationLength = parser.float();
        anm.FPS = parser.float();

        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();
        anm.unks[parser.tell()] = parser.int32();

        anm.minTranslation = {
            x: parser.float(),
            y: parser.float(),
            z: parser.float()
        };

        anm.maxTranslation = {
            x: parser.float(),
            y: parser.float(),
            z: parser.float()
        };

        anm.minScale = {
            x: parser.float(),
            y: parser.float(),
            z: parser.float()
        };

        anm.maxScale = {
            x: parser.float(),
            y: parser.float(),
            z: parser.float()
        };

        anm.entriesOffset = parser.int32();
        anm.indicesOffset = parser.int32();
        anm.hashesOffset = parser.int32();

        anm.entries = [];
        for (i = 0; i < anm.entriesCounter; i += 1) {
            anm.entries.push({
                compressedTime: parser.uint16(),
                hashId: parser.uint8(),
                dataType: parser.uint8(),
                compressedData: {
                    x: parser.uint16(),
                    y: parser.uint16(),
                    z: parser.uint16()
                }
            });
        }

        indexCounter = (anm.hashesOffset - anm.indicesOffset) / 2;
        anm.indexes = parser.uint16(indexCounter);

        anm.boneHashes = parser.uint32(anm.boneCounter);

    };

}());
