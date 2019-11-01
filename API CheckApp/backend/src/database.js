const mongoose = require('mongoose');
const {
    mongodb
} = require('./config');

mongoose.connect(mongodb.URI, {
        useNewUrlParser: true
    })
    .then(db => console.log('Database is connected'))
    .catch(err => {
        mongoose.connect('mongodb://localhost:20001/nodejs-login', {
            useNewUrlParser: true
        })
        .then(db => console.log('Database is connected'))
        .catch(err => {
            console.log("La base de datos no esta tenta");
            console.error(err)
        });
        console.error(err)
    });