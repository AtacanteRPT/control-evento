/**
 * Institucion
 *
 * @description :: Server-side logic for managing Institucion
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Institucion.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Institucion.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Institucion.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },
    nuevo: function(req, res, next) {
        Institucion.create(req.body, function Founded(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/Institucion/index');
        });
    },

    update: function(req, res, next) {
        Institucion.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/Institucion/index');
        });
    },

    delete: function(req, res, next) {
        Institucion.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/Institucion/index');
        });
    },

};