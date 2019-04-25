/**
 * Cargo
 *
 * @description :: Server-side logic for managing Cargo
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Cargo.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Cargo.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Cargo.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },
    nuevo: function(req, res, next) {
        Cargo.create(req.body, function Founded(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/cargo/index');
        });
    },

    update: function(req, res, next) {
        Cargo.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/cargo/index');
        });
    },

    delete: function(req, res, next) {
        Cargo.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/cargo/index');
        });
    },

};