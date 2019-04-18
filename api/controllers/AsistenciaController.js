/**
 * AsisteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const excel = require('node-excel-export');
var moment = require('moment-timezone');

module.exports = {
    mostrar: function (req, res) {
        var hoy = new Date();
        var baseidentificacion = req.param('baseidentificacion')
        var idEvento = req.param('idEvento')
        //console.log("CLIENTE : ", req.param("baseidentificacion"))

        var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()
        console.log('QR:', req.body)
        Personas.find({ id: baseidentificacion }).exec(function (err, datoMilitante) {
            // if(err) return res.server.error;
            if (datoMilitante.length > 0) {

                var auxAsistencia = {
                    fecha: fecha,
                    estado: 1,
                    credencial: true,
                    idPersona: datoMilitante[0].id,
                    idEvento: idEvento,
                    hora: moment().tz("America/La_Paz").format()
                }
                Asistencia.findOrCreate({ idPersona: datoMilitante[0].id, idEvento: idEvento }, auxAsistencia).exec(function (err, datoAsistencia, wasCreated) {

                    var auxPersona = {
                        nombre: datoMilitante[0].nombres,
                        paterno: datoMilitante[0].paterno,
                        materno: datoMilitante[0].materno,
                        img: datoMilitante[0].fotografia,
                        identificacion: datoMilitante[0].ci,
                        circunscripcion: datoMilitante[0].circunscripcion,
                        zona: datoMilitante[0].zona,
                        recinto: datoMilitante[0].recinto
                    }
                    res.json(auxPersona)

                    console.log(wasCreated)
                    if (wasCreated) {

                        sails.sockets.broadcast('salaAsistencia', 'asistencia', { militante: auxPersona, idEvento: idEvento }, req);
                    }

                });
            } else {
                res.json({
                    nombre: 'NO ESTA REGISTRADO',
                    img: ''
                })
            }
        })
    },
    marcar: function (req, res) {

        var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()

        var paramIdEvento = req.param('idEvento');
        var paramIdPersona = req.param('idPersona');
        var paramNombre = req.param('nombre');
        var paramPaterno = req.param('paterno');
        var paramMaterno = req.param('materno');

        var auxAsistencia = {
            fecha: fecha,
            estado: 1,
            credencial: false,
            idPersona: paramIdPersona,
            idEvento: paramIdEvento,
            hora: moment().tz("America/La_Paz").format()
        }
        Asistencia.findOrCreate({ idPersona: paramIdPersona, idEvento: paramIdEvento }, auxAsistencia).exec(function (err, datoAsistencia, esCreado) {

            var auxPersona = { 
            }
            
            console.log(esCreado)
            if (esCreado) {
                auxPersona.msg='Asistencia para'+ paramNombre+" "+paramPaterno+" "+paramMaterno
                sails.sockets.broadcast('salaAsistencia', 'asistencia', { militante: auxPersona, idEvento: idEvento }, req);
            }else{
                auxPersona.msg='Actualizo a'+ paramNombre+" "+paramPaterno+" "+paramMaterno

            }
            res.json(auxPersona)

        });
    },

    reporte: async function (req, res) {
        const excel = require('node-excel-export');
        var datoMilitantes = await Militante.find({ asistencia: true });

        console.log('MILITANTES', datoMilitantes)
        var dataset = [];
        dataset = datoMilitantes
        // You can define styles as json object
        const styles = {
            headerDark: {
                fill: {
                    fgColor: {
                        rgb: 'FF000000'
                    }
                },
                font: {
                    color: {
                        rgb: 'FFFFFFFF'
                    },
                    sz: 14,
                    bold: true,
                    underline: true
                }
            },
            cellPink: {
                fill: {
                    fgColor: {
                        rgb: 'FFFFCCFF'
                    }
                }
            },
            cellGreen: {
                fill: {
                    fgColor: {
                        rgb: 'FF00FF00'
                    }
                }
            },
            cellTitulo: {

                font: {

                    sz: 16,
                    bold: true,

                },
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                }
            },
            cellNormal: {

                font: {
                    sz: 14,
                },
                border: {
                    top: {
                        style: 'thin',
                        color: { rgb: 'FF000000' }

                    },
                    bottom: {

                        style: 'thin',
                        color: { rgb: 'FF000000' }

                    },
                    right: {
                        style: 'thin',
                        color: { rgb: 'FF000000' }

                    },
                    left: {

                        style: 'thin',
                        color: { rgb: 'FF000000' }

                    }
                }

            }
        };

        //Array of objects representing heading rows (very top)
        const heading = [
            [
                { value: 'Reporte Asistentes', style: styles.cellTitulo },
                { value: 'GATO', style: styles.headerDark },
                { value: 'PERRO', style: styles.headerDark }
            ],
            [{ value: 'COORDINACIÓN PLAN DE GOBIERNO "CIRCUNSCRIPCIÓN 7"', style: styles.cellTitulo }], // <-- It can be only values
            [{ value: 'Total asistentes : ' + datoMilitantes.length, style: styles.cellTitulo }]
        ];

        var count = 0;
        //Here you specify the export structure
        const specification = {
            nro: { // <- the key should match the actual data key
                displayName: 'Nro', // <- Here you specify the column header
                headerStyle: styles.cellTitulo, // <- Header style
                cellStyle: styles.cellNormal,
                cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                    count++;
                    return count;
                },
                width: 30 // <- width in pixels
            },
            nombre: { // <- the key should match the actual data key
                displayName: 'Nombre', // <- Here you specify the column header
                headerStyle: styles.cellTitulo, // <- Header style
                cellStyle: styles.cellNormal,
                // cellStyle: function (value, row) { // <- style renderer function
                //     // if the status is 1 then color in green else color in red
                //     // Notice how we use another cell value to style the current one
                //     return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible 
                // },
                width: 220 // <- width in pixels
            },
            cedula: {
                displayName: 'Cedula',
                headerStyle: styles.cellTitulo,
                cellStyle: styles.cellNormal,
                // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                //     return (value == 1) ? 'Active' : 'Inactive';
                // },
                width: 100 // <- width in chars (when the number is passed as string)
            },
            celular: {
                displayName: 'Celular',
                headerStyle: styles.cellTitulo,
                cellStyle: styles.cellNormal, // <- Cell style
                width: 100 // <- width in pixels
            },
            institucion: {
                displayName: 'Institución',
                headerStyle: styles.cellTitulo,
                cellStyle: styles.cellNormal, // <- Cell style
                width: 150 // <- width in pixels
            }
        }

        // The data set should have the following shape (Array of Objects)
        // The order of the keys is irrelevant, it is also irrelevant if the
        // dataset contains more fields as the report is build based on the
        // specification provided above. But you should have all the fields
        // that are listed in the report specification

        // const dataset = [
        //     { customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown' },
        //     { customer_name: 'HP', status_id: 0, note: 'some note' },
        //     { customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown' }
        // ]

        // Define an array of merges. 1-1 = A:1
        // The merges are independent of the data.
        // A merge will overwrite all data _not_ in the top-left cell.
        const merges = [
            { start: { row: 1, column: 1 }, end: { row: 1, column: 5 } },
            { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
            { start: { row: 3, column: 1 }, end: { row: 3, column: 5 } },
            // { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
        ]

        // Create the excel report.
        // This function will return Buffer
        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                {
                    name: 'Report', // <- Specify sheet name (optional)
                    heading: heading, // <- Raw heading array (optional)
                    merges: merges, // <- Merge cell ranges
                    specification: specification, // <- Report specification
                    data: dataset // <-- Report data
                }
            ]
        );

        // You can then return this straight
        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
        return res.send(report);

    },

    reporte_excel: async function (req, res) {
        console.log('Reporte EXCEL')
        try {
            // var nombreEvento = req.body.nombreEvento;
            var idEvento = req.param('id');

            var datoEvento = await Evento.findOne(idEvento);

            var datoAsistencias = await Asistencia.find({
                idEvento: idEvento
            }).populate('idPersona').populate('idEvento');
            // var datoMilitantes = await Militante.find({ asistencia: true });

            var dataset = [];
            dataset = datoAsistencias.map(dato => dato.idPersona)


            console.log('DATASET', dataset)
            // You can define styles as json object
            const styles = {
                headerDark: {
                    fill: {
                        fgColor: {
                            rgb: 'FF000000'
                        }
                    },
                    font: {
                        color: {
                            rgb: 'FFFFFFFF'
                        },
                        sz: 14,
                        bold: true,
                        underline: true
                    }
                },
                cellPink: {
                    fill: {
                        fgColor: {
                            rgb: 'FFFFCCFF'
                        }
                    }
                },
                cellGreen: {
                    fill: {
                        fgColor: {
                            rgb: 'FF00FF00'
                        }
                    }
                },
                cellTitulo: {

                    font: {

                        sz: 16,
                        bold: true,

                    },
                    alignment: {
                        horizontal: 'center',
                        vertical: 'center'
                    }
                },
                cellNormal: {

                    font: {
                        sz: 14,
                    },
                    border: {
                        top: {
                            style: 'thin',
                            color: { rgb: 'FF000000' }

                        },
                        bottom: {

                            style: 'thin',
                            color: { rgb: 'FF000000' }

                        },
                        right: {
                            style: 'thin',
                            color: { rgb: 'FF000000' }

                        },
                        left: {

                            style: 'thin',
                            color: { rgb: 'FF000000' }

                        }
                    }

                }
            };

            //Array of objects representing heading rows (very top)
            const heading = [
                [
                    { value: 'Reporte Asistentes', style: styles.cellTitulo },
                    { value: 'GATO', style: styles.headerDark },
                    { value: 'PERRO', style: styles.headerDark }
                ],
                [{ value: 'COORDINACIÓN PLAN DE GOBIERNO ' + datoEvento.nombre, style: styles.cellTitulo }], // <-- It can be only values
                [{ value: 'Total asistentes : ' + datoAsistencias.length, style: styles.cellTitulo }]
            ];

            var count = 0;
            //Here you specify the export structure
            const specification = {
                nro: { // <- the key should match the actual data key
                    displayName: 'Nro', // <- Here you specify the column header
                    headerStyle: styles.cellTitulo, // <- Header style
                    cellStyle: styles.cellNormal,
                    cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                        count++;
                        return count;
                    },
                    width: 30 // <- width in pixels
                },
                paterno: { // <- the key should match the actual data key
                    displayName: 'Paterno', // <- Here you specify the column header
                    headerStyle: styles.cellTitulo, // <- Header style
                    cellStyle: styles.cellNormal,
                    // cellStyle: function (value, row) { // <- style renderer function
                    //     // if the status is 1 then color in green else color in red
                    //     // Notice how we use another cell value to style the current one
                    //     return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible 
                    // },
                    width: 100 // <- width in pixels
                },
                materno: { // <- the key should match the actual data key
                    displayName: 'Materno', // <- Here you specify the column header
                    headerStyle: styles.cellTitulo, // <- Header style
                    cellStyle: styles.cellNormal,
                    // cellStyle: function (value, row) { // <- style renderer function
                    //     // if the status is 1 then color in green else color in red
                    //     // Notice how we use another cell value to style the current one
                    //     return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible 
                    // },
                    width: 100 // <- width in pixels
                },
                nombres: { // <- the key should match the actual data key
                    displayName: 'Nombre', // <- Here you specify the column header
                    headerStyle: styles.cellTitulo, // <- Header style
                    cellStyle: styles.cellNormal,
                    // cellStyle: function (value, row) { // <- style renderer function
                    //     // if the status is 1 then color in green else color in red
                    //     // Notice how we use another cell value to style the current one
                    //     return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible 
                    // },
                    width: 220 // <- width in pixels
                },
                ci: {
                    displayName: 'ci',
                    headerStyle: styles.cellTitulo,
                    cellStyle: styles.cellNormal,
                    // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                    //     return (value == 1) ? 'Active' : 'Inactive';
                    // },
                    width: 100 // <- width in chars (when the number is passed as string)
                },
                celular1: {
                    displayName: 'Celular',
                    headerStyle: styles.cellTitulo,
                    cellStyle: styles.cellNormal, // <- Cell style
                    width: 100 // <- width in pixels
                },
                institucion_listas_enviadas: {
                    displayName: 'Institución',
                    headerStyle: styles.cellTitulo,
                    cellStyle: styles.cellNormal, // <- Cell style
                    width: 150 // <- width in pixels
                }
            }

            const merges = [
                { start: { row: 1, column: 1 }, end: { row: 1, column: 7 } },
                { start: { row: 2, column: 1 }, end: { row: 2, column: 7 } },
                { start: { row: 3, column: 1 }, end: { row: 3, column: 7 } },
                // { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
            ]

            const report = excel.buildExport(
                [{
                    name: 'Report', // <- Specify sheet name (optional)
                    heading: heading, // <- Raw heading array (optional)
                    merges: merges, // <- Merge cell ranges
                    specification: specification, // <- Report specification
                    data: dataset // <-- Report data
                }]
            );
            console.log('LLEGA BOT')
            res.attachment(datoEvento.nombre + '_reporte.xlsx'); // This is sails.js specific (in general you need to set headers)
            return res.send(report);
        } catch (error) {
            res.serverError(error)
        }


    },

    informe: async function (req, res) {
        try {

            var datoEventos = await Evento.find();
            res.view('pages/informe', {
                eventos: datoEventos
            })
        } catch (error) {
            res.serverError(error);
        }
    }

};