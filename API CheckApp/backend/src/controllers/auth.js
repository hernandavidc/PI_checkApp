'use strict'

const User = require('../models/user');
const service = require('../services');

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    pinEntidad: req.body.pinEntidad
    
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    req.user = user
    return res.status(201).send({ token: service.createToken(user) })
  })
}

function logIn (req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'Datos incorrectos' })
    if (!user.comparePassword(req.body.password)) return res.status(404).send({ message: 'Datos incorrectoss' })
    req.user = user
    req.pinEntidad = user.pinEntidad
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

function getUser (req, res) {
  User.findById(req.user, "-password", (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: `El usero no existe o no hace parte de su entidad`})
    res.status(200).send({ user })
  })
}

function updateUser (req, res) {
  let update = req.body

  User.findByIdAndUpdate({_id: req.params.userId}, update, (err, userUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el usero: ${err}`})

    res.status(200).send({ user: userUpdated })
  })
}

module.exports = {
  signUp,
  logIn,
  getUser,
  updateUser
}