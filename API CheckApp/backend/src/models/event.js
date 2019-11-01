const { Schema, model } = require('mongoose');

const Assistant = require('../models/assistant')

const eventSchema = new Schema(
    {
        title: { type: String, required: true},
        content: { type: String, required: true},
        author: { type: String },
        pinEntidad: String,
        dateStart: Date,
        dateEnd: Date,
        capacity: Number,
        assistans: {type:  Array, default: []}
    }, {
        timestamps: true
    });

module.exports = model('Event', eventSchema);