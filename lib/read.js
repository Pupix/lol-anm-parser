(function () {
    'use strict';

    // Vars
    var readers = require('./readers');

    /*********************************************************************/

    module.exports = function (data) {
        var readable = {
            bones: []
        };

        readers['v' + data.header.version](readable, data);
        return readable;
    };
}());
