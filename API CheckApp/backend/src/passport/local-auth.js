const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Sesiones
passport.serializeUser((user, done) => {
    done(null, user.id);
}); //almacena el usuario para las sesiones... serializar por id

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
}); //Deserializar --> busca el usuario... si existe o no

//Autenticación del Usuario
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({
        email: email
    });

    if (user) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe.'));
    } else {
        const newUser = new User(); // crear nuevo usuario
        newUser.email = email;
        newUser.password = newUser.encriptPassword(password); //pasar contraseña cifrada
        await newUser.save(); //guarda el nuevo usuario
        done(null, newUser);
    }
}));

passport.use('local-signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req,email,password,done) => {
    const user= await User.findOne({email:email});
    if(!user){
        return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage','Password incorrecto'));
    }
    done(null,user);
}));