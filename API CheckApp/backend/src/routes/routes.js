const express = require('express');
const router = express.Router(); //En este objeto definimos la rutas de nuestro servidor
const passport = require('passport');

router.get('/', (req, res, next) => { //lo primero que el servidor recibe es el / request respone next
    res.status(200).send({ "mensaje": "Server CheckApp running" })
});

/*
    router.get('/signup', (req, res, next) => { //con get envia una ventana
        res.render('signup');
    });

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    }));

    router.get('/signin', (req, res, next) => {
        res.render('signin');
    });

    router.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    }));

    router.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    router.use((req,res,next)=>{
        isAuthenticated(req,res,next);
        next();
    }); //Esto se hace para cuando se quieren autenticar varias rutas al tiempo... se pone antes de las rutas

    router.get('/profile',isAuthenticated, (req, res, next) => {
        res.render('profile');
    })

    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }; //middleware
*/

module.exports = router;