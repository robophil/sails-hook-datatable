/**
 * Returns a promise of the data when found
 */
module.exports.getData = function (model, options) {
  //access the waterline instance of this model
  var MODEL = sails.models[model]

  //if model dosen't exist
  if (!MODEL) {
    return new Promise((resolve, reject) => {
      reject({ error: `Model: ${model} dosen't exist.` })
    })
  }

  var ATTR = Object.keys(MODEL._attributes)
  delete ATTR.id
  
  //possible column options as default
  var _columns = [{ data: '', name: '', searchable: false, orderable: false, search: { value: '' } }]

  //possible options data as default
  var _options = {
    draw: 0,
    columns: _columns,
    start: 0,
    length: 10,
    search: { value: '', regex: false },
    order: [{ column: 0, dir: 'asc' }]
  }

  //merge both Object, options and _options into _options
  Object.assign(_options, options)

  //response format
  var _response = {
    draw: _options.draw,
    recordsTotal: 0,
    recordsFiltered: 0,
    iTotalRecords: 0,//legacy
    iTotalDisplayRecords: 0,//legacy
    data: []
  }

  //build where criteria
  var where = []
  _options.columns.forEach((column, index) => {
    if (column.searchable) {
      var filter = {}
      filter[ATTR[index]] = {
        'contains': _options.search.value
      }
      where.push(filter)
    }
  })

  //find the databased on the query and total items in the database data[0] and data[1] repectively
  return Promise.all([MODEL.find({
    where: { or: where },
    skip: +_options.start,
    limit: +_options.length,
    sort: _options.columns[+_options.order[0].column].data + ' ' + _options.order[0].dir.toUpperCase()
  }), MODEL.count()]).then(data => {
    _response.recordsTotal = data[1]//no of data stored
    _response.recordsFiltered = data[0].length//no of data after applying filter
    _response.iTotalRecords = data[1]//no of data stored (legacy)
    _response.iTotalDisplayRecords = data[0].length//no of data after applying filter (legacy)
    _response.data = data[0]//data

    return _response
  }).catch(error => {
    return error
  })
}

module.exports.getColumns = function (model) {
  //access the waterline instance of this model
  var MODEL = sails.models[model]

  //if model dosen't exist
  if (!MODEL) {
    return new Promise((resolve, reject) => {
      reject({ error: `Model: ${model} dosen't exist.` })
    })
  }

  var ATTR = Object.keys(MODEL._attributes)

  return new Promise((resolve, reject) => {
    if (ATTR) resolve(ATTR)
    else reject({ error: `Error fetching attribute for this model` })
  })
}