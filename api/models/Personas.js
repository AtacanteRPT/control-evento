/**
 * Personas.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'string',
            required: true,
            unique: true,
            // columnName: 'the_primary_key'
        },

        nombres: {
            type: 'string',
        },
        paterno: {
            type: 'string',
        },
        materno: {
            type: 'string',
        },
        ci: {
            type: 'string',
            columnType: 'UNIQUE varchar(20)',
        },
        fecha_nacimiento: {
            type: 'ref',
            columnType: 'date'
        },
        edad: {
            type: 'number',
        },
        edad_tipo: {
            type: 'string',
            columnType: 'varchar(30)',
        },
        genero: {
            type: 'string',
            columnType: 'varchar(30)',
        },
        circunscripcion: {
            type: 'string',
            columnType: 'varchar(10)',
        },
        distrito_electoral: {
            type: 'string',
            columnType: 'varchar(20)',
        },
        zona: {
            type: 'string',
            columnType: 'varchar(50)',
        },
        recinto: {
            type: 'string',
        },
        mesa: {
            type: 'string',
            columnType: 'varchar(20)',
        },
        celular1: {
            type: 'string',
            allowNull: true,
            columnType: 'varchar(50)',
        },
        celular2: {
            type: 'string',
            allowNull: true,
            columnType: 'varchar(50)',
        },
        celular3: {
            type: 'string',
            allowNull: true,
            columnType: 'varchar(50)',
        },
        telefono: {
            type: 'string',
            allowNull: true,
            columnType: 'varchar(50)',
        },
        segip: {
            type: 'string',
            allowNull: true,
            columnType: 'varchar(50)',
        },
        direccion: {
            type: 'ref',
            columnType: 'text'
        },
        delegado: {
            type: 'boolean',
        },
        institucion_listas_enviadas: {
            type: 'string',
            allowNull: true,
        },
        institucion_min_trabajo: {
            type: 'string',
            allowNull: true,
        },
        institucion: {
            type: 'string',
            allowNull: true,
        },
        cargo:{
            type:'string',
            allowNull:true
        },
        actualizado: {
            type: 'ref',
            columnType: 'TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()'
        },
        creado: {
            type: 'ref',
            columnType: 'TIMESTAMP NOT NULL'
        },
        militancia:{
            type:'boolean',
            allowNull:true
        },

        
        ministerio_descentralizadas: {
            type: 'string',
            allowNull: true,
        },
        tipo_delegado: {
            type: 'string',
            columnType: 'varchar(40)',

        },
        distrito_politico: {
            type: 'string',
            columnType: 'varchar(20)',
        },
        circunscripcion_delegado: {
            type: 'string',
            columnType: 'varchar(10)',
        },
        distrito_delegado: {
            type: 'string',
            columnType: 'varchar(20)',
        },
        zona_recinto_delegado: {
            type: 'string',
        },
        recinto_delegado: {
            type: 'string',
        },
        mesa_delegado: {
            type: 'string',
            columnType: 'varchar(40)',
        },
        corresponde_mismo_recinto: {
            type: 'boolean',
        },
        asistencia: {
            type: 'string',
            columnType: 'varchar(40)',
            allowNull: true,
        },
        fotografia: {
            type: 'string',
            allowNull: true,
        },
        qr: {
            type: 'string',
            allowNull: true,
        },
        estado: {
            type: 'number',
            allowNull: true,
        },
        recogido: {
            type: 'boolean',
            allowNull: true,
        },
        recojo_fecha: {
            type: 'ref',
            columnType: 'datetime'
        },
        foto_ci: {
            type: 'string',
            allowNull: true,
        },
        entregado_por: {
            type: 'string',
            allowNull: true,
        },

        habilitado: {
            type: 'boolean',
            allowNull: true,
        },
        correo: {
            type: 'string',
            allowNull: true,
        },
        idInstitucion:{
            model:'institucion',
        },
        idCargo:{
            model:'cargo'
        }


    },

};