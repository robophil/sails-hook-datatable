/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var DatatableService = require('../services/DatatableService');

module.exports = function datatable (req, res) {
    var model = actionUtil.parseModel(req);
    DatatableService.getColumns(model).then(data =>{
        return res.ok({columns: data})
    }).catch(error =>{
        return res.send(error)
    })
};
