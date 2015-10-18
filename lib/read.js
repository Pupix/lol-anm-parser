(function () {
    'use strict';

    // Vars
    var readers = require('./readers');

    /*********************************************************************/

    module.exports = function (data, cb) {

        var readable = {
            bones: []
        };

        readers['v' + data.header.version](readable, data);

        cb(null, readable);

    };

}());
