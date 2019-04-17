/**
 * ControladorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: async function (req, res) {
        console.log('Entra por lo menos a inex de controlador')

        // Militante.find().then(datoMilitantes => {
        //     // console.log(datoMilitantes)
        //     res.view('pages/homepage', {
        //         militantes: datoMilitantes
        //     })

        // }).catch(err => {
        //     res.serverError(err)
        // });
        var datoEventos = await Evento.find({ estado: 'activo' });
        console.log('DATOEVENTOS:',datoEventos)
        var eventos = [];
        for (let index = 0; index < datoEventos.length; index++) {

            var auxContador = await Asistencia.count({ idEvento: datoEventos[index].id });
            datoEventos[index].nroAsistentes = auxContador;
            eventos.push(datoEventos[index]);
        }

        console.log('EVENTOS:', eventos)
        res.view('pages/homepage', {
            militantes: [],
            eventos: eventos,
            idActualEvento: 0,
        });
        // res.serverError(err);

    },
    evento: function (req, res) {
        sails.log('Cambio deEvento')
        Evento.find().then(datoEventos => {
            res.view('pages/homepage', {
                militantes: [],
                eventos: datoEventos,
                idActualEvento: req.param('id')
            })
        }).catch(err => {
            res.serverError(err);
        })

    },
    buscarMilitante: function (req, res) {
        var nombreCedula = req.body.nombre;
        console.log('NOMBRE a BUSCAR:', nombreCedula)
        Militante.find({
            or: [{
                nombre: { contains: nombreCedula }
            },
            {
                cedula: { contains: nombreCedula }
            }

            ]
        }).then(datoMilitantes => res.json(datoMilitantes))
            .catch(err => {
                res.serverError(err)
            });
    },
    actualizarMilitante: function (req, res) {

        console.log(req.body)
        var militante = {
            nombre: req.body.nombre,
            cedula: req.body.cedula,
            celular: req.body.celular,
            direccion: req.body.direccion
        }
        Militante.update(req.body.id, militante)
            .then(datoMilitantes => res.redirect('/'))
            .catch(err => {
                res.serverError(err)
            });
    },
    actMilitante: function (req, res) {
        sails.log('BODY:', req.body);
        res.send('oso')
    }
};