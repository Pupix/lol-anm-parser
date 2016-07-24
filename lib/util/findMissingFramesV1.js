/*jslint bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    var XP = require('expandjs'),
        THREE = require('three');

    module.exports = function findMissingFramesV0(data) {
        var incompleteFrames = [],
            incomplete,
            lastTimedFrame,
            lastScaledFrame,
            lastPosFrame,
            lastQuatFrame;

        XP.forEach(data.bones, function (bone) {
            XP.forEach(bone.frames, function (frame, index) {
                incomplete = false;
                // Create frame is doesn't exist
                if (!frame) {
                    frame = bone.frames[index] = {};
                }

                if (!frame.hasOwnProperty('index')) {
                    frame.index = index;
                }

                if (frame.hasOwnProperty('time')) {
                    if (lastTimedFrame) {
                        XP.forEach(incompleteFrames, function (incFrame) {
                            if (incFrame.index < frame.index && !incFrame.hasOwnProperty('time')) {
                                incFrame.time = ((frame.time - lastTimedFrame.time) / (frame.index - lastTimedFrame.index)) + lastTimedFrame.time;
                                lastTimedFrame = incFrame;
                            }
                        });
                    }
                    lastTimedFrame = frame;
                } else {
                    incomplete = true;
                }

                if (frame.hasOwnProperty('quaternion')) {
                    if (lastQuatFrame) {
                        XP.forEach(incompleteFrames, function (incFrame) {
                            if (incFrame.index < frame.index && !incFrame.hasOwnProperty('quaternion')) {
                                var v1 = new THREE.Quaternion(lastQuatFrame.quaternion.x, lastQuatFrame.quaternion.y, lastQuatFrame.quaternion.z, lastQuatFrame.quaternion.w),
                                    v2 = new THREE.Quaternion(frame.quaternion.x, frame.quaternion.y, frame.quaternion.z, frame.quaternion.w),
                                    res = v1.slerp(v2, 1 / (frame.index - lastQuatFrame.index));

                                incFrame.quaternion = {x: res.x, y: res.y, z: res.z, w: res.w};
                                lastQuatFrame = incFrame;
                            }
                        });
                    }
                    lastQuatFrame = frame;
                } else {
                    incomplete = true;
                }

                if (frame.hasOwnProperty('position')) {
                    if (lastPosFrame) {
                        XP.forEach(incompleteFrames, function (incFrame) {
                            if (incFrame.index < frame.index && !incFrame.hasOwnProperty('position')) {
                                // Last lerp current with alpha as percentage between them
                                // If start is at 0 and end at 4, then 1 is 25% (0.25) alpha
                                var v1 = new THREE.Vector3(lastPosFrame.position.x, lastPosFrame.position.y, lastPosFrame.position.z),
                                    v2 = new THREE.Vector3(frame.position.x, frame.position.y, frame.position.z),
                                    res = v1.lerp(v2, 1 / (frame.index - lastPosFrame.index));

                                incFrame.position = {x: res.x, y: res.y, z: res.z};
                                lastPosFrame = incFrame;
                            }
                        });
                    }
                    lastPosFrame = frame;
                } else {
                    incomplete = true;
                }

                if (frame.hasOwnProperty('scale')) {
                    if (lastScaledFrame) {
                        XP.forEach(incompleteFrames, function (incFrame) {
                            if (incFrame.index < frame.index && !incFrame.hasOwnProperty('scale')) {
                                incFrame.scale = {};
                                incFrame.scale.x = ((frame.scale.x - lastScaledFrame.scale.x) / (frame.index - lastScaledFrame.index)) + lastScaledFrame.scale.x;
                                incFrame.scale.y = ((frame.scale.y - lastScaledFrame.scale.y) / (frame.index - lastScaledFrame.index)) + lastScaledFrame.scale.y;
                                incFrame.scale.z = ((frame.scale.z - lastScaledFrame.scale.z) / (frame.index - lastScaledFrame.index)) + lastScaledFrame.scale.z;
                                lastScaledFrame = incFrame;
                            }
                        });
                    }
                    lastScaledFrame = frame;
                } else {
                    incomplete = true;
                }

                if (incomplete) {
                    XP.append(incompleteFrames, frame);
                }
            });
        });
    };

}());
