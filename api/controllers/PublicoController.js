module.exports = {
    
    index:function(req,res){

        if(req.isAuthenticated()){
            return res.redirect('/controlador/index')
        }
        res.view('pages/login',{
            layout:'layouts/layout2'
        })
    }

};

