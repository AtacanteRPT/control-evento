var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')

var files = [];


files.push('./invitados.csv');

async.eachSeries(files, function(file, callback) {

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(file)
    var nuevasPersonas = [];
    var dato = fs.readFileSync(path.join(__dirname, file), {
        encoding: 'utf8'
    });
    var options = {
        delimiter: ',', // optional
        quote: '"' // optional
    };

    nuevasPersonas = csvjson.toObject(dato, options);

    var contador = 0;
    async.eachSeries(nuevasPersonas, function(militante, cb) {
        // nuevasPersonas.forEach(function (persona) {
        var personaMilitante = {};
        if (militante.nombre.length > 0) {


            console.log("Militante:", militante);



            rest.postJson('http://localhost:1337/militante', militante).on('complete', function(data2, response2) {
                // handle response
                console.log('PERSONA CREADA')
                console.log("contador", contador++)
                cb(null);

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