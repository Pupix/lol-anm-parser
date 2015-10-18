/*jslint regexp: true, bitwise: true, browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    'use strict';

    module.exports = {
        v1: require('./v1'),
        v3: require('./v3'),
        v4: require('./v4'),
        v5: require('./v5')
    };

}());
