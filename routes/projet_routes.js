const express = require('express')
const route = express.Router()
const projet = require('../controller/projet_controllers')
const multer = require('multer');
const path = require('path')
const jwt = require('../middlewares/jwt')

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/image/projet/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});



//get
route.get('/',jwt.verif_projet,jwt.data_session,(req,res)=>{
    res.render('client/projet/star')
})
route.get('/modifier/:id',jwt.data_session,projet.modifier_get)
route.get('/valider/:id',jwt.data_session,projet.valider)
route.get('/no_valider/:id',jwt.data_session,projet.no_valider)
route.get('/supprimer/:id',jwt.data_session,projet.supprimer)
route.get('/start',jwt.verif_conexion,jwt.verif_projet_existe,jwt.data_session,projet.start)
route.get('/create',jwt.data_session,projet.create)
route.get('/create/apercu',jwt.data_session,(req,res)=>{
    res.render('client/projet/apercu', {projet : req.session.user.projet})
})
route.get('/create/recompense',jwt.data_session,(req,res)=>{
    res.render('client/projet/recompense', {recompense : req.session.user.projet.campagne.recompense})
})
route.get('/create/votre_histoire',jwt.data_session,(req,res)=>{
    res.render('client/projet/histoire',{campagne : req.session.user.projet.campagne})
})
route.get('/create/equipe',jwt.data_session,(req,res)=>{
    res.render('client/projet/equipe', {user : req.session.user})
})
route.get('/create/fond',jwt.data_session,(req,res)=>{
    res.render('client/projet/fond')
})
route.get('/suprec/:id',jwt.data_session,projet.supprime_rec)
route.get('/modrec/:id',jwt.data_session,(req,res)=>{
    let recc = req.session.user.projet.campagne.recompense
    res.render('client/projet/recmod',{rec : recc[req.params.id],id : req.params.id})
})


//post 
route.post('/',projet.ajouter)
route.post('/ajoute/',projet.ajouter)
route.post('/modifier/:id',projet.modifier)
route.post('/create/base',upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),projet.base)
route.post('/create/recompense',projet.recompense)
route.post('/modrec/:id',projet.modifie_rec)
route.post('/create/histoire',projet.histoire)





module.exports = route