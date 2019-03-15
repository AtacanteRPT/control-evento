/**
 * MilitanteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    nuevo: function (req, res) {
        Militante.create(req.body).exec(function(datoMilitatne){
            res.redirect('/controlador/index')
        });
    }
};

