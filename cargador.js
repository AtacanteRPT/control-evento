var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')

var files = [];


files.push('./1_reunion_lista.csv');

async.eachSeries(files, function(file, callback) {

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(file)
    var nuevasPersonas = [];
    var dato = fs.readFileSync(path.join(__dirname, file), {
        encoding: 'utf8'
    });
    var options = {
        delimiter: ';', // optional
        quote: '"' // optional
    };

    nuevasPersonas = csvjson.toObject(dato, options);

    var contador = 0;
    async.eachSeries(nuevasPersonas, function(militante, cb) {
        // nuevasPersonas.forEach(function (persona) {
        var personaMilitante = {};
        if (militante.nombre.length > 0) {


            console.log("Militante:", militante);
            militante.militancia = false; 
            rest.postJson('http://militantesmasipsp.com:9090/controlador/buscarMilitanteCi', {ci:militante.ci}).on('complete', function(data, response) {
                
                if(data.length ==0){
                    rest.postJson('http://militantesmasipsp.com:9090/personas', militante).on('complete', function(data2, response2) {
                        // handle response
                        console.log('PERSONA CREADA')
                        console.log("contador", contador++)
                        cb(null);
        
                    });
                }else{

                    console.log('**********PERSONA EXISTE *******', data[0])
                }

            });
            

       



        } else {
            cb(null);
        }


        // }, this);
    }, function(error) {

        console.log("-------------------FINAL LISTA -----------------------")
        callback(null);
        // return res.send("tutores")
    });

}, function(error) {
    console.log("-------------------FINAL TODO -----------------------")

});
