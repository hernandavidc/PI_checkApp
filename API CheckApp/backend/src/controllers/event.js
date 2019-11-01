'use strict'

const Event = require('../models/event')

function getEvent (req, res) {
  Event.findOne({_id: req.params.eventId, pinEntidad:req.pinEntidad}, (err, event) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!event) return res.status(404).send({message: `El evento no existe o no hace parte de su entidad`})
    res.status(200).send({ event })
  })
}

function getEvents (req, res) {
    if (!req.pinEntidad){res.status(500).send({message: 'Perfil no cuenta con PIN de entidad'})}
    else{
        Event.find({pinEntidad:req.pinEntidad}, "-assistans", (err, events) => {
            if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            if (!events) return res.status(404).send({message: 'No existen eventos en su entidad'})

            res.status(200).send({ events })
        })
    }
}

function saveEvent (req, res) {
  if (!req.pinEntidad){res.status(500).send({message: 'Perfil no cuenta con PIN de entidad'})}
  else{
    let event = new Event()
    event.title = req.body.title
    event.content = req.body.content
    event.author = req.body.author
    event.dateStart = req.body.dateStart
    event.dateEnd = req.body.dateEnd
    event.capacity = req.body.capacity
    event.pinEntidad = req.pinEntidad

    event.save((err, eventStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

        res.status(200).send({ event: eventStored })
    })
  }
}

function updateEvent (req, res) {
    if (!req.pinEntidad){res.status(500).send({message: 'Perfil no cuenta con PIN de entidad'})}
    else{

    let update = req.body

    Event.findOneAndUpdate({_id: req.params.eventId, pinEntidad:req.pinEntidad}, update, (err, eventUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el evento: ${err}`})
        if(!eventUpdated) {res.status(500).send({message: `Evento no encontrado o no pertenece a su entidad`})
        }else{
            res.status(200).send({ event: eventUpdated })
        }
    })

    }

}

function deleteEvent (req, res) {
    if (!req.pinEntidad){res.status(500).send({message: 'Perfil no cuenta con PIN de entidad'})}
    else{

    Event.findOne({_id: req.params.eventId, pinEntidad:req.pinEntidad}, (err, event) => {
        if (err) res.status(500).send({message: `Error al borrar el evento: ${err}`})

        event.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar el evento: ${err}`})
        res.status(200).send({message: 'El evento ha sido eliminado'})
        })
    })

}
}

module.exports = {
  getEvent,
  getEvents,
  saveEvent,
  updateEvent,
  deleteEvent
}