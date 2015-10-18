(function () {
    'use strict';

    // Vars
    var parsers = require('./parsers');

    /*********************************************************************/

    module.exports = function (parser, cb) {
        var anm = {
                header: {}
            };

        anm.header.magic = parser.string(8);
        anm.header.version = parser.int32();

        parsers['v' + anm.header.version](anm, parser);

        cb(null, anm);

    };

}());
