const conn = require('../config/db')
const Pays = require('../models/pays')






//l'ajout des nouveau pays dans la base de donne
const ajoute =  (req,res)=>{
    conn.query('INSERT INTO Pays (Py_nom) values (?)',[[req.body.nom]],(err,rep)=>{
        if (err)throw err
        else{
            res.redirect('/admin/pays/')
        }
    })
}


//redirection vers le formulaire d'ajout
const ajoute_get = (req,res)=>{
    res.render('pays/pays_formulaire')
}


//suppression des pays dans la base de donne
const supprimer =  (req,res)=>{
    conn.query('DELETE FROM Pays WHERE idPays = ?',[[req.params.id]],(err,rep)=>{
        if(err)throw err
        else{
            res.redirect('/admin/pays/')
        }
    })
}


//redirection vers le formulaire de modification
const modifier_get = (req,res)=>{
    conn.query('SELECT * FROM Pays WHERE idPays = ?',[[req.params.id]],(err,rep)=>{
        if(err)throw err
        else{
            res.render('pays/pays_formulaire_modif',{pays : rep.map(pays => new Pays(pays))})
        }
    })
}


//modification d'un pays
const modifier = (req,res)=>{
    conn.query('UPDATE Pays SET Py_nom = ?  WHERE idPays= ?',[[req.body.nom],[Number(req.params.id)]],(err,rep)=>{
        if (err)throw err
        else{
            res.redirect('/admin/pays/')
        }
    })
}


//la liste de tous les pays dans la base de donne
const liste =  (req,res)=>{
    conn.query('SELECT * FROM Pays',(err,rep)=>{
        if(err)throw err
        else{
            res.render('admin/pays/pays',{pays : rep.map(pays => new Pays(pays))})
        }
    })
}

const lister =  (cb)=>{
    conn.query('SELECT * FROM Pays',(err,rep)=>{
        if(err)throw err
        else{
            pays = rep.map(pays => new Pays(pays))
            cb(pays)
        }
    })
}


module.exports={
    liste,
    lister,
    ajoute,
    ajoute_get,
    supprimer,
    modifier,
    modifier_get
}