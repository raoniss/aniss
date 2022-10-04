const conn =  require('../config/db')
const Commentaire  = require('../models/commentaire')




//ajout des commentaire
const ajouter = (req,res)=>{
    conn.query('INSERT INTO Commentaire (Cm_utilisateur,Cm_campagne,Cm_commentaire,Cm_date) values (?,?,?,?)',
    [[req.body.utilisateur],[req.body.campagne],[req.body.commentaire],[req.body.date]],(err,rep)=>{
        if (err) throw err
        else{
            res.redirect('/commentaire/')
        }
    })
}


//modification des commentaire
const modifier = (req,res)=>{
    conn.query('UPDATE Commentaire SET Rec_matricule =?,Rec_titre =?,Rec_description =?,Rec_montant =?,Rec_date_limite =?,Rec_nombre =?,Rec_url =?,Campagne_idCampagne =?,Pays_idPays =? WHERE idRecompense =?',
    [[req.body.matricule],[req.body.titre],[req.body.description],[req.body.montant],[req.body.date_limite],[req.body.nombre],[req.body.url],[req.body.campagne],[req.body.pays],[req.params.id]],(err,rep)=>{
        if (err) throw err
        else{
            res.redirect('/commentaire/')
        }
    })
}


//redirection vers le formulaire de modification
const modifier_get = (req,res)=>{
    conn.query('SELECT * FROM Commentaire',(err,rep)=>{
        if (err)throw err
        else{
            res.render('commentaire/frommod',{recompense : rep.map(recompense => new Recompense(recompense))})
        }
    })
}


//suppression des commentaire
const supprimer = (req,res)=>{ 
    conn.query('DELETE  FROM Commentaire WHERE idRecompense = ?',[[req.params.id]],(err,rep)=>{
    if (err)throw err
    else{
        res.redirect('/commentaire/')
    }
})
}


//alister les commentaire
const lister = (req,res)=>{
    conn.query('SELECT * FROM Commentaire',(err,rep)=>{
        if (err)throw err
        else{
            res.render('commentaire/index',{commentaire : rep.map(commentaire => new Commentaire(commentaire))})
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