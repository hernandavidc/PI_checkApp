'use strict'

const Assistant = require('../models/assistant')
const EntityApi = require('../models/entityApi')
const Event = require('../models/event')
const axios = require('axios');

function getAssistants (req, res) {
    if (!req.pinEntidad){res.status(500).send({message: 'Perfil no cuenta con PIN de entidad'})}
    else{
        Event.findOne({_id: req.params.eventId, pinEntidad: req.pinEntidad}, (err, event) => {
          if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
          if (!event) return res.status(404).send({message: `El evento no existe o no hace parte de su entidad`})
          res.status(200).send({ assistans: event.assistans })
        })
    }
}

function saveAssistant (req, res) {
  if (!req.pinEntidad){res.status(500).send({message: 'Perfil no cuenta con PIN de entidad'})}
  else{
      EntityApi.findOne({pinEntidad: req.pinEntidad}, (err, entityApi) => {
        if (err) return res.status(500).send({message: `Error al realizar la encontrar EntityApi: ${err}`})
        if (!entityApi){return res.status(401).send({message: `El EntityApi no existe o no hace parte de su entidad`})
      }else{
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.get['mode'] = 'no-cros';

        axios.get(entityApi.URI+req.body.id)
        .then(responseEntity => {
            if(Array.isArray(responseEntity.data)){var entity = responseEntity.data[0]}
            else if(responseEntity.data){var entity = responseEntity.data}

            let assistant = new Assistant()
            
            if(entity.name){assistant.name = entity.name}
            else if(entity.nombre){assistant.name = entity.nombre}

            assistant.id = entity.id

            // Grade es el campo que almacena toda la informacion extra que brinde el API de la entidad
            // Ej: response = {semestre: 'Sexto semestre', facultad: 'ing de sistemas e inforamtica'}
            // extra: 'Sexto semestre ing de sistemas e informatica' 
            let extra = ""
            Object.keys(entity).forEach(function(key) {if(!['id', 'name', 'nombre'].includes('key')){extra = entity[key] + " "}});
            assistant.grade = extra
            
            Event.findOne({_id: req.params.eventId, pinEntidad:req.pinEntidad}, (err, event) => {
                if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
                if (!event) return res.status(404).send({message: `El evento no existe o no hace parte de su entidad`})
                event.assistans.push(assistant);
                event.save((err, eventStored) => {
                    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
            
                    res.status(200).send({ event: eventStored })
                })
            }) 
        })
        .catch(err => {
            res.status(500).send({message: `Error al realizar la petición axios: ${err}`})
        });
    }
    })  
  }
}

function deleteAssistant (req, res) {
    if (!req.pinEntidad){res.status(500).send({message: 'Perfil no cuenta con PIN de entidad'})}
    else{

    Event.findOne({_id: req.params.eventId, pinEntidad: req.pinEntidad}, (err, event) => {
        if (err) res.status(500).send({message: `Error al borrar el evento: ${err}`})
        if (!event) return res.status(404).send({message: `El evento no existe o no hace parte de su entidad`})
        event.assistans.pop(event.assistans.findIndex(x => x.id == req.params.assistantId))
        event.save((err, eventStored) => {
            if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
    
            res.status(200).send({ event: eventStored })
        })
    })

}
}


module.exports = {
  getAssistants,
  saveAssistant,
  deleteAssistant
}