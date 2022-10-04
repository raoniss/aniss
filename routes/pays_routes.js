const express = require('express')
const route = express.Router()
const pays = require('../controller/pays_controllers')

//get
route.get('/',pays.liste)
route.get('/ajoute',pays.ajoute_get)
route.get('/modifier/:id',pays.modifier_get)
route.get('/supprimer/:id',pays.supprimer)


//post
route.post('/ajoute',pays.ajoute)
route.post('/modifier/:id',pays.modifier)



module.exports = route