var _datatable = require('./lib/app.js');

module.exports = function datatable(sails) {
    _datatable.adaptSails(sails);
    return {
        defaults: {//#first. Set defaults to be used by your hook
            datatable: {
            }
        },
        configure: function () {//#second. Called after defaults have been set.
        },
        initialize: function (cb) {
            // Do some stuff here to initialize hook
            _datatable.init(sails);
            // And then call `cb` to continue
            return cb();
        }
    };
}