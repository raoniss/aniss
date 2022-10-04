const express = require('express')
const route = express.Router()
const admins = require('../controller/administrateur_controllers')
const projet = require('../controller/projet_controllers')
const campagne = require('../controller/campagne_controllers')
const categorie = require('../controller/categorie_controllers')
const user = require('../controller/utilisateur_controllers')
const pays = require('../controller/pays_controllers')


//get 
route.get('/',projet.lister)
route.get('/user',user.lister)
route.get('/user_proj',(req,res)=>{
    res.render('admin/user/user_proj')
})
route.get('/projet_at',(req,res)=>{
    res.redirect('/admin/')
})
route.get('/campagne',campagne.lister)
route.get('/categorie',categorie.lister)
route.get('/pays',pays.liste)

//post





module.exports = route