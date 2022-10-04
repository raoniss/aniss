const express = require('express')
const route = express.Router()
const client = require('../controller/client_controllers')
const projet = require('../controller/projet_controllers')
const jwt = require('../middlewares/jwt')


//get
route.get('/',(req,res)=>{
    res.redirect('/acceuil')
})
route.get('/acceuil',jwt.verif_message,jwt.verif_projet,jwt.data_session,(req,res,next)=>{
    next()
},projet.lister_acceuil)
route.get('/signin',client.signin_get)
route.get('/signup',client.signup_get)      
route.get('/logout',client.logout)
route.get('/profil',(req,res)=>{
    res.render('client/profil',{user : req.session.user})
})
route.get('/page',(req,res)=>{
    res.render('client/projet/one_page')
})
route.get('/vue/:id',jwt.verif_projet,jwt.data_session,projet.vue)
route.get('/camp',jwt.verif_projet,jwt.data_session,projet.camp)
route.get('/ajout_rec/:rec',jwt.verif_conexion,client.ajout_rec)
route.get('/retire_rec/:rec',jwt.verif_conexion,client.retir_rec)
route.get('/recu_message/:message',jwt.verif_conexion,client.recu_message)
route.get('/soutenir',jwt.data_session,(req,res)=>{
    res.render('client/confirmer_soutient')
})
route.get('/test',(req,res)=>{
    console.log('bobon')
    let popo = {
        id : 1,
        nom : 'momo'
    }
    res.json(popo)
})

//post
route.post('/signin',client.signin,jwt.data_session,(req,res)=>{
    res.redirect('/')
})
route.post('/signup',client.signup)
route.post('/soutenir',(req,res)=>{
    let sout = req.body.soutenir
    let id = req.body.pjid
    let name = req.body.pjname
    req.session.user.financement.montant = sout
    req.session.user.financement.projet = {
        id : id,
        nom : name
    }
    res.redirect('/soutenir')
})



module.exports = route