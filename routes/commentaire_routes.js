const express = require('express')
const route = express.Router()
const commentaire = require('../controller/commentaire_controllers')


//get
route.get('/',commentaire.lister)
route.get('/supprimer/:id',commentaire.supprimer)
route.get('/modifier/:id',commentaire.modifier_get)



//post
route.post('/ajoute',commentaire.ajouter)
route.post('/modifier/:id',commentaire.modifier)



module.exports = route