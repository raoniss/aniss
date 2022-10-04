const con = require('../config/db')
const Categorie = require('../models/categorie')
const Projet_pres = require('../models/projet_pres')


const data_session = (req, res, next) => {
    res.locals.user = req.session.user
    next()
}


//verifie si l'utilisateur a  un campagne deja en cour pour changer son menu
const verif_projet = (req, res, next) => {
    if (req.session.user == undefined) {
        next()
    }
    if (req.session.user != undefined) {
        con.query('SELECT Utilisateur.idUtilisateur,Cp_message FROM ((Projet INNER JOIN Utilisateur ON Projet.Pj_createur = Utilisateur.idUtilisateur)INNER JOIN Campagne On Projet.idProjet = Campagne.Cp_projet) WHERE Projet.Pj_createur = ? AND Projet.Pj_active = "true"', [
            [req.session.user.id]
        ], (err, rep) => {
            if (err) throw err
            else {
                if (!rep.length) {
                    req.session.user.pj = false
                    next()
                } else {
                   /* let popo = rep.map(projet => new Projet_pres(projet))
                    req.session.user.pj = true
                    req.session.user.projet = {
                        description : popo ,
                        titre : popo[0].Pj_titre ,
                        cagnotte : popo[0].Pj_cagnotte ,
                        categorie : popo[0].Pj_categorie ,
                        campagne : {
                            date : popo ,
                            video : popo[0].Cp_video ,
                            photo : popo[0].Cp_photo ,
                            text : popo[0].Cp_texte,
                            recompense : popo[0].Cp_rec , 
                        }
                    }*/
                    next()
                }
            }
        })
    }
}
const verif_message = (req, res, next) => {
    if (req.session.user == undefined) {
        next()
    }
    if (req.session.user != undefined) {
        con.query('SELECT Cp_message FROM ((Projet INNER JOIN Utilisateur ON Projet.Pj_createur = Utilisateur.idUtilisateur)INNER JOIN Campagne On Projet.idProjet = Campagne.Cp_projet) WHERE Projet.Pj_createur = ?', [
            [req.session.user.id]
        ], (err, rep) => {
            if (err) throw err
            else {
                if (!rep.length) {
                    next()
                } else {
                    req.session.user.message = rep[0].Cp_message
                    next()
                }
            }
        })
    }
}

// verifier si l'utilisateur a une campagne pour eviter qu'il lance une autre 
const verif_projet_existe = (req, res, next) => {
    if (req.session.user.pj == true) {
        req.flash('error', " vous avez deja une campagne en cours:(")
        res.redirect('/projet/')
    } else {
        next()
    }
}


// verifier si l'utilisateur n'est pas connecter
const verif_conexion = (req, res, next) => {
    if (req.session.user == undefined) {
        req.flash('error', " Vous devez vous connecter avant de faire cette action:(")
        res.redirect('/signin')
    } else {
        next()
    }
}

module.exports = {
    data_session,
    verif_projet,
    verif_projet_existe,
    verif_conexion,
    verif_message
}