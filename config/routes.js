/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    // '/': { view: 'pages/homepage' },
    // 'get /': 'ControladorController.index',

    'get /': 'PublicoController.index',
    // 'get /': 'AuthController.login',
    'get /controlador/evento/:id': 'ControladorController.evento',
    'get /asistencia/reporte_excel/:id': 'AsistenciaController.reporte_excel',


    'get /evento/edit/:id': 'EventoController.edit',
    'get /evento/update/:id': 'EventoController.update',
    'get /evento/delete/:id': 'EventoController.delete',
    'get /evento/crear': { view: 'evento/create' },

    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/


};