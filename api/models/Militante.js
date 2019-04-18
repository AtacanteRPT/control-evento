/**
 * Militante.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        createdAt: { type: 'number', autoCreatedAt: true, },
        updatedAt: { type: 'number', autoUpdatedAt: true, },
        id: { type: 'number', autoIncrement: true, },

        paterno: { type: 'string' },
        materno: { type: 'string' },
        nombre: { type: 'string', required: true, },

        cedula: {
            columnType: 'varchar(185)',
            type: 'string',
            unique: true
        },
        celular: { type: 'string' },
        telefono: { type: 'string' },
        cargo: { type: 'string' },
        asistencia: { type: 'boolean' },
        institucion: {
            type: 'string'
        },
        // categoria:{
        // type:'string'},
        email: {
            type: 'string'
        },
        direccion: {
            type: 'string'
        },
        fechaNac: {
            type: 'ref',
            columnType: 'date',
            required: false
        },
        remplazo: {
            type: 'string'
        },
        ci_remplazo: {
            type: 'string'
        },
        hora: {
            type: 'string'
        },
        sexo: {
            type: 'string'
        },
        // militancia: {
        //     type: 'boolean'
        // },
        // usuario:{
        //   collection:'usuario',
        //   via:'idMilitante'
        // }
    },

};