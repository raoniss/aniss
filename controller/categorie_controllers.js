const conn = require('../config/db')
const Categorie =  require('../models/categorie')


//creation d'une categorie
const ajouter = (req,res)=>{
    conn.query('INSERT INTO Categorie (Cat_nom) values (?)',[[req.body.nom]],(err,rep)=>{
        if (err) throw err
        else{
            res.redirect('/admin/categorie/')
        }

    })
}

//modification
const modifier = (req,res)=>{
    conn.query('UPDATE Categorie SET Cat_nom = ?  WHERE idCategorie= ?',[[req.body.nom],[Number(req.params.id)]],(err,rep)=>{
        if (err)throw err
        else{
            res.redirect('/admin/categorie/')
        }
    })
}


//redirection vers le formulaire de modification
const modifier_get = (req,res)=>{
    conn.query('SELECT * FROM Categorie WHERE idCategorie = ?',[[req.params.id]],(err,rep)=>{
        if(err)throw err
        else{
            res.render('categorie/formmod',{categorie : rep.map(categorie => new Categorie(categorie))})
        }
    })
}


//suppression d'une categorie
const supprimer = (req,res)=>{
    conn.query('DELETE FROM Categorie WHERE idCategorie = ?',[[req.params.id]],(err,rep)=>{
        if(err)throw err
        else{
            res.redirect('/admin/categorie/')
        }
    })
}


//lister les differentes categorie
const lister = (req,res)=>{
    conn.query('SELECT * FROM Categorie',(err,rep)=>{
        if (err)throw err
        else{   
            res.render('admin/categorie/categorie',{categorie : rep.map(categorie => new Categorie(categorie))})
        }
    })
}

const liste = (cb)=>{
    conn.query('SELECT * FROM Categorie',(err,rep)=>{
        if (err)throw err
        else{   
            let categorie = rep.map(categorie => new Categorie(categorie))
            cb(categorie)
        }
    })
}







module.exports = {
    ajouter,
    modifier,
    modifier_get,
    supprimer,
    lister,
    liste
}