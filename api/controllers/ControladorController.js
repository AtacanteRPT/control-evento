/**
 * ControladorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function (req, res) {
        console.log('Entra por lo menos a inex de controlador')

        Militante.find().then(datoMilitantes => {
            // console.log(datoMilitantes)
            res.view('pages/homepage', {
                militantes: datoMilitantes
            })

        }).catch(err => {
            res.serverError(err)
        });
    },
    buscarMilitante: function (req, res) {
        var nombreCedula= req.body.nombre;
        console.log('NOMBRE a BUSCAR:', nombreCedula)
        Militante.find({
            or: [
                {
                    nombre: { contains: nombreCedula }
                },
                {
                    cedula:{ contains:nombreCedula}
                }
                
            ]
        }).then(datoMilitantes => res.json(datoMilitantes))
            .catch(err => {
                res.serverError(err)
            });
    },
    actualizarMilitante: function (req, res) {

        console.log(req.body)
        var militante={
            nombre : req.body.nombre,
            cedula : req.body.cedula,
            celular:req.body.celular,
            direccion : req.body.direccion
        }
        Militante.update(req.body.id,militante)
        .then(datoMilitantes => res.redirect('/'))
            .catch(err => {
                res.serverError(err)
            });
    },
    actMilitante:function(req,res){
        sails.log('BODY:',req.body);
        res.send('oso') 
    }
};