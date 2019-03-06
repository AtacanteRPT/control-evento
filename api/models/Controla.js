/**
 * Controla.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    idUsuario: {
      required: false,
      model: 'usuario'
    },
    idEvento: {
      required: false,
      model: 'evento'
    },

  }
}

