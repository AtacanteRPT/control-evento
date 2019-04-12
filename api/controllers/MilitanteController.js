/**
 * MilitanteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment-timezone');

module.exports = {

    nuevo: function (req, res) {

        var auxMilitante = req.body;
        auxMilitante.hora = moment().tz("America/La_Paz").format();
        auxMilitante.asistencia=true;
        Militante.create(auxMilitante).exec(function (datoMilitatne) {
            
            res.redirect('/controlador/index')
        });
    },
    reporte: async function (req, res) {
        const excel = require('node-excel-export');
        var datoMilitantes = await Militante.find({asistencia:true});

        console.log('MILITANTES',datoMilitantes)
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
                { value: 'PERRO', style: styles.headerDark }],
            [{ value: 'COORDINACIÓN PLAN DE GOBIERNO "CIRCUNSCRIPCIÓN 7"', style: styles.cellTitulo }] ,// <-- It can be only values
            [{ value: 'Total asistentes : '+ datoMilitantes.length, style: styles.cellTitulo }]
        ];
        
        var count =0;
        //Here you specify the export structure
        const specification = {
            nro: { // <- the key should match the actual data key
                displayName: 'Nro', // <- Here you specify the column header
                headerStyle: styles.cellTitulo, // <- Header style
                cellStyle:styles.cellNormal,
                cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                    count++;
                    return count ;
                },
                width: 30 // <- width in pixels
            },
            nombre: { // <- the key should match the actual data key
                displayName: 'Nombre', // <- Here you specify the column header
                headerStyle: styles.cellTitulo, // <- Header style
                cellStyle:styles.cellNormal,
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
                cellStyle:styles.cellNormal,
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

};

