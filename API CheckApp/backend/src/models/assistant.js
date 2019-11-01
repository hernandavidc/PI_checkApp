const { Schema, model } = require('mongoose');

const assistantSchema = new Schema(
    {
        id: { type: String, unique: true, required: true},
        name: { type: String, required: true},
        grade: { type: String }
        // Grade es el campo que almacena toda la informacion extra que brinde el API de la entidad
        // Ej: response = {semestre: 'Sexto semestre', facultad: 'ing de sistemas e inforamtica'}
        // extra: 'Sexto semestre ing de sistemas e informatica' 
    }, {
        timestamps: true
    });

module.exports = model('Assistant', assistantSchema);