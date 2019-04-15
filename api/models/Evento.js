/**
 * Evento.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        createdAt: { type: 'number', autoCreatedAt: true, },
        updatedAt: { type: 'number', autoUpdatedAt: true, },
        id: { type: 'number', autoIncrement: true, },
        fecha: {
            type: 'ref',
            columnType: 'date',
            required: false
        },
        estado: {
            type: 'string',
            required: false,
            allowNull: true
        },
        observacion: {
            type: 'string',
            required: false,
            allowNull: true
        },
        nombre: {
            type: 'string',
            required: false,
            allowNull: true
        },
        hora: {
            type: 'string',
            required: false,
            allowNull: true
        },
        latitud: {
            type: 'string',
            required: false,
            allowNull: true
        },
        longitud: {
            type: 'string',
            required: false,
            allowNull: true
        },


    },

};