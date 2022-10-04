//Rec_matricule	Rec_titre	Rec_description	Rec_montant	Rec_date_limite	Rec_nombre	Rec_url	Campagne_idCampagne	Pays_idPays
const conn =  require('../config/db')
const Recompense = require('../models/recompense')




//ajout des recompense
const ajouter = (req,res)=>{
    conn.query('INSERT INTO Recompense (Rec_matricule,Rec_titre,Rec_description,Rec_montant,Rec_date_limite,Rec_nombre,Rec_url,Campagne_idCampagne,Pays_idPays) values (?,?,?,?,?,?,?,?,?)',
    [[req.body.matricule],[req.body.titre],[req.body.description],[req.body.montant],[req.body.date_limite],[req.body.nombre],[req.body.url],[req.body.campagne],[req.body.pays]],(err,rep)=>{
        if (err) throw err
        else{
            res.redirect('/recompense/')
        }
    })
}


//modification des recompense
const modifier = (req,res)=>{
    conn.query('UPDATE Recompense SET Rec_matricule =?,Rec_titre =?,Rec_description =?,Rec_montant =?,Rec_date_limite =?,Rec_nombre =?,Rec_url =?,Campagne_idCampagne =?,Pays_idPays =? WHERE idRecompense =?',
    [[req.body.matricule],[req.body.titre],[req.body.description],[req.body.montant],[req.body.date_limite],[req.body.nombre],[req.body.url],[req.body.campagne],[req.body.pays],[req.params.id]],(err,rep)=>{
        if (err) throw err
        else{
            res.redirect('/recompense/')
        }
    })
}


//redirection vers le formulaire de modification
const modifier_get = (req,res)=>{
    conn.query('SELECT * FROM Recompense',(err,rep)=>{
        if (err)throw err
        else{
            res.render('recompense/frommod',{recompense : rep.map(recompense => new Recompense(recompense))})
        }
    })
}


//suppression des recompense
const supprimer = (req,res)=>{ 
    conn.query('DELETE  FROM Recompense WHERE idRecompense = ?',[[req.params.id]],(err,rep)=>{
    if (err)throw err
    else{
        res.redirect('/recompense/')
    }
})
}


//alister les recompense
const lister = (req,res)=>{
    conn.query('SELECT * FROM Recompense',(err,rep)=>{
        if (err)throw err
        else{
            res.render('recompense/index',{recompense : rep.map(recompense => new Recompense(recompense))})
        }
    })
}


module.exports = {
    ajouter,
    modifier,
    modifier_get,
    supprimer,
    lister
}