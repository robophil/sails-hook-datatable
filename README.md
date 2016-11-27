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

```javascript
//Example where *account* is the model name

//ajax
$('#example').DataTable( {
    serverSide: true,
    ajax: {
        url: '/datatable/account',
        type: 'POST'
    }
} );

//response
{
    "draw": 1,
    "recordsTotal": 57,
    "recordsFiltered": 57,
    "data": [
        {name: 'Philip', age: 18},
        {name: 'Sam', age: 50},
        {name: 'Theo', age: 8},
        {name: 'Obinna', age: 28}
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

