const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
//const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

//Inicializaciones
const app = express();
require('./database');
require('./passport/local-auth');

//Configuraciones
app.set('views', path.join(__dirname, 'views')); //dirname devuelve la dirección del archivo index.js //Hay que establecer la nueva ruta de las vistas
app.engine('ejs', engine); //la aplicación va a usar ejs 
app.set('view engine', 'ejs'); //Establecer el motor de plantillas
app.set('port', process.env.PORT || 3000);

//middleware => funciones que se requieren antes de que pase a las rutas => procesar datos etc
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
})); //urlencode permite recibir los datos desde el cliente
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
})); //recibe un objeto de config de la sesión
app.use(flash()); //mensaje error
//app.use(passport.initialize());
//app.use(passport.session()); //sesiones
app.use(bodyParser.urlencoded({ extended: false})); 
app.use(bodyParser.json());

//app.use((req, res, next) => {
//    app.locals.signupMessage = req.flash('signupMessage'); // si no hay mensaje de error no devuelve null
//    app.locals.signinMessage = req.flash('signinMessage')
//    app.locals.user = req.user
//    next(); //continue con el resto
//});

// Add headers
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("contentTypeHeader", "application/x-www-form-urlencoded, application/json");
    res.header("Access-Control-Allow-Headers", "authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
 });

//Routes
app.use('/', require('./routes/routes'));
app.use('/api', require('./routes/routesApi')); //express va a usar las rutas que se definen en routes


//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});