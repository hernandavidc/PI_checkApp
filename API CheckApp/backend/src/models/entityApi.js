const { Schema, model } = require('mongoose');

const entityApiSchema = new Schema(
    {
        author: { type: String, required: true },
        pinEntidad: { type: String, required: true, unique: true},
        URI: { type: String, required: true }
    }, {
        timestamps: true
    });

module.exports = model('EntityApi', entityApiSchema);