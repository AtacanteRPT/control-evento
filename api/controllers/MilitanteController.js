/**
 * MilitanteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment-timezone');
const uuidv1 = require('uuid/v1');

module.exports = {

    nuevoNoMilitante: function (req, res) {
        var hoy = new Date();

        var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
        var hora = moment().tz("America/La_Paz").format();
        var auxMilitante = req.body;
        auxMilitante.id = uuidv1();
        auxMilitante.militancia = false;
        var paramIdEvento = req.param('idEvento');
        console.log('NUEVO', auxMilitante)

        Personas.create(req.body).fetch().exec(function (err, datoPersona) {
            if (err) res.serverError(err);

            sails.log('datoPersona', req.body)

            if (datoPersona != null) {

                Asistencia.create({
                    idEvento: paramIdEvento,
                    idPersona: datoPersona.id,
                    fecha: fecha,
                    hora: hora,
                    credencial: false
                }).exec(function (err, datoAsistencia) {
                        if (err) res.serverError(err);
                        res.redirect('/controlador/index')
                    });
            } else {
                res.json({ msg: 'Error al Adicionar' })
            }

        });
    },

    cargos: function (req, res) {
        var auxMilitante = req.body;
        auxMilitante.id = uuidv1();
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