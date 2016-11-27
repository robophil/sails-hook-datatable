module.exports = {
    find: function(req, res){
        var model = req.params.model
        var options = req.allParams()
        delete options.model

        DatatableService.getData(model, options).then(data =>{
            return res.send(data)
        }).catch(error =>{
            return res.send(error)
        })
    },

    create: function(req, res){
        var model = req.params.model
        var options = req.allParams()
        delete options.model

        DatatableService.getData(model, options).then(data =>{
            return res.json(data)
        }).catch(error =>{
            return res.json(error)
        })
    },

    columns: function(req, res){
        var model = req.params.model

        DatatableService.getColumns(model).then(data =>{
            return res.json({columns: data})
        }).catch(error =>{
            return res.json(error)
        })
    }
}