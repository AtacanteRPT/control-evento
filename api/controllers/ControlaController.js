/**
 * Controla
 *
 * @description :: Server-side logic for managing Controla
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: async function (req, res, next) {

        var datoEventos = await Evento.find({ estado: 'activo' });
        console.log('DATOEVENTOS:', datoEventos)
        // var eventos = [];
        // for (let index = 0; index < datoEventos.length; index++) {

        //     var auxContador = await Asistencia.count({ idEvento: datoEventos[index].id });
        //     datoEventos[index].nroAsistentes = auxContador;
        //     eventos.push(datoEventos[index]);
        // }

        // console.log('EVENTOS:', eventos)
        res.view({
            militantes: [],
            eventos: datoEventos,
            idActualEvento: 0,
        });
    },

    evento: function (req, res) {
        sails.log('Cambio deEvento')
        Evento.find().then(datoEventos => {
            res.view('controla/index', {
                militantes: [],
                eventos: datoEventos,
                idActualEvento: req.param('id')
            })
        }).catch(err => {
            res.serverError(err);
        })

    },

    show: function (req, res, next) {
        Controla.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function (req, res, next) {
        Controla.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function (req, res, next) {
        Controla.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('controla/show/' + req.param('id'));
        });
    },

    delete: function (req, res, next) {
        Controla.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/controla');
        });
    },

};