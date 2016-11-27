module.exports.routes = {
	'GET /datatable/:model': 'DatatableController.find',
	'GET /datatable/column-names/:model': 'DatatableController.columns',
	'POST /datatable/:model': 'DatatableController.create'
};