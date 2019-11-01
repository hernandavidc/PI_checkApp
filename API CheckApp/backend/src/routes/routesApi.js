const express = require('express');
const router = express.Router(); //En este objeto definimos la rutas de nuestro servidor
const passport = require('passport');
const userCtrl = require('../controllers/auth')
const eventCtrl = require('../controllers/event')
const entityApiCtrl = require('../controllers/entityApi')
const assistantCtrl = require('../controllers/assistant')
const auth = require('../middlewares/auth')

router.post('/user/login', userCtrl.logIn)
router.post('/user/create', userCtrl.signUp)
router.get('/user/detail/', auth, userCtrl.getUser)
router.post('/user/update/:userId', auth, userCtrl.updateUser)

router.post('/entityApi/create', auth, entityApiCtrl.saveEntityApi)
router.post('/entityApi/delete/:entityApiId', auth, entityApiCtrl.deleteEntityApi)
router.post('/entityApi/update/:entityApiId', auth, entityApiCtrl.updateEntityApi)
router.get('/entityApi/list', auth, entityApiCtrl.getEntitiesApi)
router.get('/entityApi/detail/:entityApiId', auth, entityApiCtrl.getEntityApi)

router.post('/event/create', auth, eventCtrl.saveEvent)
router.post('/event/delete/:eventId', auth, eventCtrl.deleteEvent)
router.post('/event/update/:eventId', auth, eventCtrl.updateEvent)
router.get('/event/list', auth, eventCtrl.getEvents)
router.get('/event/detail/:eventId', auth, eventCtrl.getEvent)

router.get('/assistant/list/:eventId', auth, assistantCtrl.getAssistants)
router.post('/assistant/register/:eventId', auth, assistantCtrl.saveAssistant)
router.post('/assistant/:assistantId/delete/:eventId', auth, assistantCtrl.deleteAssistant)

module.exports = router;