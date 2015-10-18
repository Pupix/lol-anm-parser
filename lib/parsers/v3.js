(function () {
    'use strict';

    module.exports = function (anm, parser) {
        var i, j;

        anm.designerId = parser.int32();
        anm.boneCounter = parser.int32();
        anm.frameCounter = parser.int32();
        anm.FPS = parser.int32();

        anm.bones = [];
        for (i = 0; i < anm.boneCounter; i += 1) {
            anm.bones.push({
                name: parser.string(32),
                flag: parser.int32(),
                frames: []
            });

            for (j = 0; j < anm.frameCounter; j += 1) {
                anm.bones[i].frames.push({
                    quatX: parser.float(),
                    quatY: parser.float(),
                    quatZ: parser.float(),
                    quatW: parser.float(),
                    translateX: parser.float(),
                    translateY: parser.float(),
                    translateZ: parser.float()
                });
            }
        }

    };

}());
