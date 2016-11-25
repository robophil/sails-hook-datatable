module.exports = {
    find: function(req, res){
        var model = req.params.model;
        var options = req.allParams();
        delete options.model;

        DatatableService.getData(model, options).then(data =>{
            return res.send(data);
        }).catch(error =>{
            return res.send(error);
        });
    },

    create: function(req, res){
        var model = req.params.model;
        var options = req.allParams();
        delete options.model;

        DatatableService.getData(model, options).then(data =>{
            return res.send(data);
        }).catch(error =>{
            return res.send(error);
        });
    }
};