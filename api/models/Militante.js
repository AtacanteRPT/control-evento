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
      institucion: {
          type: 'string'
      },
      direccion: {
          type: 'string'
      },
      // usuario:{
      //   collection:'usuario',
      //   via:'idMilitante'
      // }

  },

};