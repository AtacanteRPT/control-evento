/**
 * Asiste.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    fecha: {
      type: 'ref',
      columnType: 'date',
      required: false
    },
    estado: {
      type: 'string',
      required: false, allowNull: true
    },
 
    idMilitante: {
      model: 'militante'
    },
    idEvento: {
      model: 'evento'
    },
    hora: {
      type: 'string',
      required: false, allowNull: true
    },
  },

};

