const express = require('express')
const user = require('../controller/utilisateur_controllers')
const route = express.Router()



//get

route.get('/',user.lister)
route.get('/modifier/:id',user.modifier_get)
route.get('/desable/:id',user.bloquer)
route.get('/enable/:id',user.debloquer)
route.get('/supprimer/:id',user.supprimer)



//post 
route.post('/',user.ajouter)
route.post('/ajoute/',user.ajouter)
route.post('/modifier/:id',user.modifier)





module.exports = route