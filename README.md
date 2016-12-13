# sails-hook-datatable
A sails hook for working with Jquery datatables.

### Install
```bash
npm i sails-hook-datatable --save
```

### Support
This hook supports jquery DataTables 1.10+. If your working with a legacy version, see https://datatables.net/manual/server-side#Legacy for congiuration.

### Usage
Send a `GET` or `POST` to `/datatable/:model` to use

**NOTE:** Always set `column.data` as showing in example below as `sails.js` Always respond with an array of object `[{"name":"foo"}, {"name":"bar"}]]` not literals like
`[["boy","foo"], ["girl","bar"]]`. You can also set `column.data = country.state.city` where `country` is the column name. This would be handle well by both this hook and datatable.

```javascript
//Example where *account* is the model name


//ajax
$('#example').DataTable( {
    serverSide: true,
    ajax: {
        url: '/datatable/account',
        type: 'POST'
    },
    "columns": [
            { "data": "name" },
            { "data": "country.state"}
        ]
} );

//response
{
    "draw": 1,
    "recordsTotal": 57,
    "recordsFiltered": 57,
    "data": [
        {name: 'Damian', country: {state: "New york"}},
        {name: 'Sam', country: {state: "Benin"}},
        {name: 'Robophil', country: {state: "London"}},
        {name: 'Ovie', country: {state: "Paris"}}
    ]
}
```

To view attributes in a model, send a `GET` to `/datatable/column-names/:model` to fetch the attributes for that model. See response below
```javascript
{ columns: [
    'id', 'firstname', 'lastname'
]}
```

### Issues or Missing implementation
Create an issue to mention a bug or feature request. Fixed something? Send a PR

### Liscence
MIT


### Fixes
Removed sails-dictionary.
Made blueprint action datatables available on every model.
Corrected child check for dotted attribute of the data column with nexted child in request.
Added populate to the model request so that it's children are also available and can be used by dot notation in datatable.
Made request search by column with default search value.
Restricted the endpoints to respond to just get & post verbs only.
Changed response from res.json to res.ok so you can determine what format you want your response from your headers.
Ability to filter by range on any column using the value of search as object {from:##,to:##}