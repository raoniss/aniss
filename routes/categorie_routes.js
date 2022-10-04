const express = require('express')
const route = express.Router()
const categorie = require('../controller/categorie_controllers')

//get
route.get('/',categorie.lister)
route.get('/supprimer/:id',categorie.supprimer)
route.get('/modifier/:id',categorie.modifier_get)



//post
route.post('/creer',categorie.ajouter)
route.post('/modifier/:id',categorie.modifier)



module.exports = route