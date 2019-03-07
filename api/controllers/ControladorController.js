/**
 * ControladorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function(req, res) {
        console.log('Entra por lo menos a inex de controlador')

        Militante.find().then(datoMilitantes => {
            console.log(datoMilitantes)
            res.view('pages/homepage', {
                militantes: datoMilitantes
            })

        }).catch(err => {
            res.serverError(err)
        });
    }
};