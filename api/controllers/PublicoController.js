module.exports = {
    
    index:function(req,res){

        if(req.isAuthenticated()){
            return res.redirect('/controlador/index')
        }
        res.view('pages/login',{
            layout:'layouts/layout2'
        })
    },

    buscarMilitanteCi2: async function (req, res) {
        var nombreCedula = req.param('ci');
        var paramIdEvento = req.param('idEvento')
        console.log('NOMBRE a BUSCAR CI:', nombreCedula)
       
        var datoMilitantes = await Personas.find({ ci: nombreCedula });
        res.send(datoMilitantes)

    },

};

