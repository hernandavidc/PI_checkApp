'use strict'

const EntityApi = require('../models/entityApi')

function getEntityApi (req, res) {
    EntityApi.findOne({_id: req.params.entityApiId, author:req.user}, (err, entityApi) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!entityApi) return res.status(404).send({message: `El entityApio no existe o no hace parte de su entidad`})
    res.status(200).send({ entityApi })
  })
}

function getEntitiesApi (req, res) {
    EntityApi.find({author:req.user}, (err, EntitiesApi) => {
        if (err){
            mongoose.connect('mongodb://localhost:20001/nodejs-login', {
                useNewUrlParser: true
            })
            .then(db =>  getEntitiesApi (req, res))
            .catch(err => {
                console.log("La base de datos no esta");
                console.error(err)
            });
            return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        }
        if (!EntitiesApi) return res.status(404).send({message: 'No existen entityApios en su entidad'})

        res.status(200).send({ EntitiesApi })
    })
}

function saveEntityApi (req, res) {
    let entityApi = new EntityApi()
    entityApi.author = req.user
    entityApi.pinEntidad = req.body.pinEntidad
    entityApi.URI = req.body.URI

    entityApi.save((err, entityApiStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

        res.status(200).send({ entityApi: entityApiStored })
    })
}

function updateEntityApi (req, res) {
    let update = req.body

    EntityApi.findOneAndUpdate({_id: req.params.entityApiId, author:req.user}, update, (err, entityApiUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el entityApio: ${err}`})
        if(!entityApiUpdated) {res.status(500).send({message: `EntityApio no encontrado o no pertenece a su entidad`})
        }else{
            res.status(200).send({ entityApi: entityApiUpdated })
        }
    })

}

function deleteEntityApi (req, res) {
    EntityApi.findOne({_id: req.params.entityApiId, author:req.user}, (err, entityApi) => {
        if (err) res.status(500).send({message: `Error al borrar el entityApio: ${err}`})

        entityApi.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar el entityApio: ${err}`})
        res.status(200).send({message: 'El entityApio ha sido eliminado'})
        })
    })
}

module.exports = {
  getEntityApi,
  getEntitiesApi,
  saveEntityApi,
  updateEntityApi,
  deleteEntityApi
}