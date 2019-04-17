/**
 * Evento
 *
 * @description :: Server-side logic for managing Evento
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Evento.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },
    activos:  function(req, res, next) {
        Evento.find({estado:'activo'}).exec(function(err, list) {
            if (err) return Error('Error');
            return res.json(list)
        });
    },

    show: function(req, res, next) {
        Evento.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Evento.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },
    nuevo: function(req, res, next) {
        Evento.create(req.body, function Founded(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/evento/index');
        });
    },

    update: function(req, res, next) {
        Evento.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/evento/index');
        });
    },

    delete: function(req, res, next) {
        Evento.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/evento/index');
        });
    },

};