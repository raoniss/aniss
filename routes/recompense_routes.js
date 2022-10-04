const express = require('express')
const route = express.Router()
const recompense = require('../controller/recompense_controllers')


//get
route.get('/',recompense.lister)
route.get('/supprimer/:id',recompense.supprimer)
route.get('/modifier/:id',recompense.modifier_get)



//post
route.post('/ajoute',recompense.ajouter)
route.post('/modifier/:id',recompense.modifier)



module.exports = route