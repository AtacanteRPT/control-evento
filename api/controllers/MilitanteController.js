/**
 * MilitanteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment-timezone');

module.exports = {

    nuevo: function(req, res) {

        var auxMilitante = req.body;
        auxMilitante.hora = moment().tz("America/La_Paz").format();
        auxMilitante.asistencia = true;
        Militante.create(auxMilitante).exec(function(datoMilitatne) {

            res.redirect('/controlador/index')
        });
    },
};