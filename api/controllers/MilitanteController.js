/**
 * MilitanteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment-timezone');

module.exports = {

    nuevo: function (req, res) {

        var auxMilitante = req.body;
        auxMilitante.hora = moment().tz("America/La_Paz").format();
        auxMilitante.asistencia = true;
        Militante.create(auxMilitante).exec(function (datoMilitatne) {

            res.redirect('/controlador/index')
        });
    },
    oso: function (req, res) {



        return res.json({
            dato: "HOLOA DESDE /militante/oso"
        })
    },


    asistencia: function (req, res) {

        // Make sure this is a socket request (not traditional HTTP)
        if (!req.isSocket) {
            return res.badRequest();
        }

        // Have the socket which made the request join the "funSockets" room.
        sails.sockets.join(req, 'salaAsistencia');

        // Broadcast a notification to all the sockets who have joined
        // the "funSockets" room, excluding our newly added socket:
        sails.sockets.broadcast('salaAsistencia', 'asistencia', { howdy: 'hi there!' }, req);

        return res.json({
            anyData: 'we want to send back'
        });
    }

};