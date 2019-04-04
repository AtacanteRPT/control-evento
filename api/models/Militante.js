/**
 * Militante.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        paterno: { type: 'string' },
        materno: { type: 'string' },
        nombre: { type: 'string', required: true, },

        cedula: { type: 'string' },
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
            required:false
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
        // usuario:{
        //   collection:'usuario',
        //   via:'idMilitante'
        // }
    },

};
