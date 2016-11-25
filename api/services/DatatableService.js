/**
 * Returns a promise of the data when found
 */
module.exports.getData = function (model, options) {
  //access the waterline instance of this model
  var MODEL = sails.models[model];

  //if model dosen't exist
  if(!MODEL){
    return new Promise((resolve, reject)=>{
      reject({error: `Model: ${model} dosen't exist.`});
    })
  }

  //possible column options as default
  var _columns = [{ data: '', name: '', searchable: false, orderable: false, search: { value: '' } }];
  //possible options data as default
  var _options = {
    draw: 0,
    columns: _columns,
    start: 0,
    length: 10,
    search: { value: '', regex: false },
    order: [{ column: 0, dir: 'asc' }]
  };

  //merge both Object, options and _options into _options;
  Object.assign(_options, options);

  //response format
  var _response = {
    draw: _options.draw,
    recordsTotal: 0,
    recordsFiltered: 0,
    data: []
  }


  //get required columns
  var select = [];
  _options.columns.forEach(column => {
    if (column.data && typeof column.data == "string")
      select.push(column.data)
  })

  //build where criteria
  var where = [];
  _options.columns.forEach(column => {
    if (column.searchable) {
      var filter = {};
      filter[column.data] = {
        'contains': _options.search.value
      };
      where.push(filter)
    }
  });

  //find the databased on the query and total items in the database; data[0] and data[1] repectively
  Promise.all([MODEL.find({
    where: { or: where },
    select: select,
    skip: +_options.start,
    limit: +_options.length,
    sort: _options.columns[+_options.order[0].column].data + ' ' + _options.order[0].dir.toUpperCase()
  }), MODEL.count()]).then(data => {
    _response.recordsTotal = data[1];
    _response.recordsFiltered = data[0].length;
    _response.data = data[0];

    return _response;
  }).catch(error => {
    return error;
  })
};