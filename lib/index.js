/**
 * Adds support for count blueprint and binds :model/count route for each RESTful model.
 */

var _ = require('lodash');
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var pluralize = require('pluralize');

module.exports = function (sails) {
    return {
        initialize: function (cb) {
            var config = sails.config.blueprints;
            var datatableCallback = _.get(sails.middleware, 'blueprints.datatable') || require('../api/blueprints/datatable');
            var columnsCallback = _.get(sails.middleware, 'blueprints.columns') || require('../api/blueprints/columns');
            sails.on('router:before', function () {
                _.forEach(sails.models, function (model) {
                    var controller = sails.middleware.controllers[model.identity];
                    if (!controller) return;
                    var baseRoute = [config.prefix, model.identity].join('/');
                    if (config.pluralize && _.get(controller, '_config.pluralize', true)) {
                        baseRoute = pluralize(baseRoute);
                    }
                    var datatableGetRoute = 'GET ' + baseRoute + '/datatable';
                    var datatablePostRoute = 'POST ' + baseRoute + '/datatable';
                    sails.router.bind(datatableGetRoute, datatableCallback, null, {controller: model.identity});
                    sails.router.bind(datatablePostRoute, datatableCallback, null, {controller: model.identity});
                    var columnsRoute = 'GET ' + baseRoute + '/columns';
                    sails.log.debug(sails.config.paths.policies);
                    sails.router.bind(columnsRoute, columnsCallback, null, {controller: model.identity,policy:sails.config.paths.policies});
                });
            });
            cb();
        }
    }
};
