/**
 * Asiste.js
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
        idMilitante: {
            model: 'militante'
        },
        idPersona: {
            model: 'personas'
        },
        idEvento: {
            model: 'evento'
        },
        hora: {
            type: 'string',
            required: false,
            allowNull: true
        },
        credencial:{
            type:'boolean'
        }

    }

};