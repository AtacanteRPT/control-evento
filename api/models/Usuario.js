/**
 * Usuario.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


const bcrypt = require('bcrypt-nodejs');

module.exports = {

    attributes: {
        createdAt: { type: 'number', autoCreatedAt: true, },
        updatedAt: { type: 'number', autoUpdatedAt: true, },
        id: { type: 'number', autoIncrement: true, },
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        rol: {
            type: 'string',
        },
        idMilitante: {
            model: 'militante'
        }


    },
    customToJSON: function() {
        return _.omit(this, ['password'])
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return cb(err);
                user.password = hash;
                return cb();
            });
        });
    }

};