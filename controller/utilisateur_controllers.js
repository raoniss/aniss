const conn = require("../config/db");
const Utilisateur = require("../models/utilisateur");
const Pays = require('../controller/pays_controllers')

//ajout d'un utilisateur
const ajouter = (req, res) => {
    conn.query('INSERT INTO Utilisateur (User_nom, User_mot_de_passe, User_photo_profil,	User_photo_page, User_description, User_reseaux_socials, User_projets_suivis, Pays_idPays) values (?,?,?,?,?,?,?,?)', [
        [req.body.nom],
        [req.body.mot_de_passe],
        [req.body.photo_profil],
        [req.body.photo_page],
        [req.body.description],
        [req.body.reseaux_sociaux],
        [req.body.projet_suivis],
        [req.body.pays]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/user/')
        }
    })
}


//modification d;un utilisateur
const modifier = (req, res) => {
    conn.query('UPDATE Utilisateur SET  User_nom =? , User_mot_de_passe =? , User_photo_profil =? ,User_photo_page =?, User_description =?, User_reseaux_socials =?, User_projets_suivis =?, Pays_idPays =? WHERE idUtilisateur =?', [
        [req.body.nom],
        [req.body.mot_de_passe],
        [req.body.photo_profil],
        [req.body.photo_page],
        [req.body.description],
        [req.body.reseaux_sociaux],
        [req.body.projet_suivis],
        [req.body.pays],
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/user/')
        }
    })
}


//redirection vers le formulaire de modification
const modifier_get = (req, res) => {
    conn.query('SELECT * FROM Utilisateur WHERE idUtilisateur =?', [
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.render('user/formmod', {
                user: rep.map(user => new Utilisateur(user))
            })
        }
    })
}


//suppression d'un utilisateur
const supprimer = (req, res) => {
    conn.query('DELETE FROM Utilisateur WHERE idUtilisateur =?', [
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/user/')
        }
    })
}

//lister les utilisateursconsole.log(pays)
const lister = (req, res) => {
    conn.query('SELECT * FROM Utilisateur', (err, rep) => {
        if (err) throw err
        else {
            Pays.lister((pays) => {
                res.render('admin/user/user', {
                    user: rep.map(user => new Utilisateur(user)),
                    pays: pays
                })
            })
        }
    })
}


const bloquer = (req, res) => {
    conn.query('UPDATE Utilisateur SET  User_active =? WHERE idUtilisateur =?', [
        ["true"],
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/admin/user')
        }
    })
}

const debloquer = (req, res) => {
    conn.query('UPDATE Utilisateur SET  User_active =? WHERE idUtilisateur =?', [
        ["false"],
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/admin/user')
        }
    })
}


module.exports = {
    ajouter,
    modifier,
    modifier_get,
    supprimer,
    lister,
    bloquer,
    debloquer
}