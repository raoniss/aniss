const conn = require('../config/db')
const Campagne = require('../models/campagne')




//ajout des campagne
const ajouter = (req, res) => {
    conn.query('INSERT INTO Campagne (Cp_matricule,Cp_montant_recuperes,Cp_date_debut,Cp_date_fin,Cp_video,Cp_photo,Cp_nombre_participants,Cp_texte,Cp_nombre_suivis,Cp_projet) values (?,?,?,?,?,?,?,?,?,?)',
        [
            [req.body.matricule],
            [req.body.montant],
            [req.body.date_debut],
            [req.body.date_fin],
            [req.body.video],
            [req.body.photo],
            [req.body.nombre_participants],
            [req.body.texte],
            [req.body.nombre_suivis],
            [req.body.projet]
        ], (err, rep) => {
            if (err) throw err
            else {
                res.redirect('/campagne/')
            }
        })
}


//modification des campgne
const modifier = (req, res) => {
    conn.query('UPDATE Campagne SET Cp_matricule =?,Cp_montant_recuperes =?,Cp_date_debut =?,Cp_date_fin =?,Cp_video =?,Cp_photo =?,Cp_nombre_participants =?,Cp_texte =?,Cp_nombre_suivis =?,Cp_projet =? WHERE idCampagne =?',
        [
            [req.body.matricule],
            [req.body.montant],
            [req.body.date_debut],
            [req.body.date_fin],
            [req.body.video],
            [req.body.photo],
            [req.body.nombre_participants],
            [req.body.texte],
            [req.body.nombre_suivis],
            [req.body.projet],
            [req.params.id]
        ], (err, rep) => {
            if (err) throw err
            else {
                res.redirect('/campagne/')
            }
        })
}


//redirection vers le formulaire de modification
const modifier_get = (req, res) => {
    conn.query('SELECT * FROM Campagne', (err, rep) => {
        if (err) throw err
        else {
            res.render('campagne/frommod', {
                campagne: rep.map(campagne => new Campagne(campagne))
            })
        }
    })
}


//suppression des campagnes
const supprimer = (req, res) => {
    conn.query('DELETE  FROM Campagne WHERE idCampagne = ?', [
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/campagne/')
        }
    })
}


//alister les campagne
const lister = (req, res) => {
    conn.query('SELECT * FROM Campagne', (err, rep) => {
        if (err) throw err
        else {
            res.render('admin/campagne/campagne', {
                campagne: rep.map(campagne => new Campagne(campagne))
            })
        }
    })
}


const message_get = (req, res) => {
    res.render('admin/campagne/message', {
        idcamp: req.params.id
    })
}


const message = (req, res) => {
    conn.query('UPDATE Campagne SET Cp_message = ? WHERE idCampagne =?',
    [
        [req.body.message],
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/admin/campagne/')
        }
    })
}


module.exports = {
    ajouter,
    modifier,
    modifier_get,
    supprimer,
    lister,
    message_get,
    message
}