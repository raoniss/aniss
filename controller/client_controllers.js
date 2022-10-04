const conn = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const Utilisateur = require('../models/utilisateur')

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//jwt function

const signin_get = (req, res) => {
    res.render('client/signin')
}


const signup_get = (req, res) => {
    res.render('client/signup')
}


//connexion a un compte existant
const signin = (req, res, next) => {
    var test = emailRegExp.test(req.body.nom);
    if (!test) {
        conn.query('SELECT * FROM Utilisateur where User_nom= ? AND User_mot_de_passe=?', [
            [req.body.nom],
            [req.body.mot_de_passe]
        ], (err, rep) => {
            if (err) throw err
            else {
                if (!rep.length) {
                    req.flash('error', "Identifiant ou mot de passe incorrect :(")
                    res.redirect('/signin')
                } else {
                    let ret = []
                    rep.map(user => new Utilisateur(user))
                    req.session.user = {
                        id: rep[0].idUtilisateur,
                        nom: rep[0].User_nom,
                        photo_profil: rep[0].User_photo_profil,
                        photo_page: rep[0].User_photo_page,
                        description: rep[0].User_description,
                        reseaux_saciaux: rep[0].User_reseaux_socials,
                        projets_suivis: rep[0].User_projets_suivis,
                        pays: rep[0].Pays_idPays,
                        financement: {
                            montant: 0,
                            recompense: ret
                        }
                    }
                    next()
                }
            }
        })
    } else {
        conn.query('SELECT * FROM Utilisateur where User_email = ? AND User_mot_de_passe=?', [
            [req.body.nom],
            [req.body.mot_de_passe]
        ], (err, rep) => {
            if (err) throw err
            else {
                if (!rep.length) {
                    req.flash('error', "email ou mot de passe incorrect :(")
                    res.redirect('/signin')
                } else {
                    let ret = []
                    rep.map(user => new Utilisateur(user))
                    req.session.user = {
                        id: rep[0].idUtilisateur,
                        nom: rep[0].User_nom,
                        //numero : rep[0].User_num,
                        photo_profil: rep[0].User_photo_profil,
                        photo_page: rep[0].User_photo_page,
                        description: rep[0].User_description,
                        reseaux_saciaux: rep[0].User_reseaux_socials,
                        projets_suivis: rep[0].User_projets_suivis,
                        pays: rep[0].Pays_idPays,
                        message : "",
                        financement: {
                            montant: 0,
                            recompense: ret
                        }
                    }
                    next()
                }
            }
        })
    }

}


//inscription d'un nouvel utilisateur
const signup = (req, res, next) => {
    if (((req.body.nom == '' || req.body.mail == '') || (req.body.mot_de_passe == '' || req.body.mot_de_passe_conf == ''))) {
        req.flash('error', "Acun champ ne peut etre vide")
        res.redirect('/signup')
    } else if (req.body.mot_de_passe.length < 6) {
        req.flash('error', "le mot de passe doit contenir au moins 6 caracteres")
        res.redirect('/signup')
    } else if (req.body.mot_de_passe != req.body.mot_de_passe_conf) {
        req.flash('error', "confirmation de mot de passe incorect")
        res.redirect('/signup')
    } else {
        var test = emailRegExp.test(req.body.mail);
        if (!test) {
            req.flash('error', "adresse mail invalide")
            res.redirect('/signup')
        } else {
            conn.query('SELECT User_nom FROM Utilisateur where User_email = ?', [
                [req.body.mail]
            ], (err, rep) => {
                if (err) throw err
                else {
                    if (rep.length) {
                        req.flash('error', "email deja utiliser par un autre utilisateur :(")
                        res.redirect('/signup')
                    } else {
                        conn.query('INSERT INTO Utilisateur (User_nom,User_email, User_mot_de_passe) values (?,?,?)', [
                            [req.body.nom],
                            [req.body.mail],
                            [req.body.mot_de_passe]
                        ], (err, rep) => {
                            if (err) throw err
                            else {
                                res.redirect('/')
                            }
                        })
                    }
                }
            })

        }

    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

//ajout d'une recompense dans le panier
const ajout_rec = (req, res) => {
    conn.query('SELECT Cp_rec,idCampagne FROM Projet INNER JOIN Campagne on Projet.idProjet = Campagne.Cp_projet WHERE Projet.idProjet = ?',
        [Number(req.params.rec[2])], (err, rep) => {
            if (err) throw err
            else {
                let i = Number(req.params.rec[0])
                let rec = JSON.parse(rep[0].Cp_rec)
                //console.log(rec[i])
                if (req.session.user.financement.recompense === undefined) {
                    let ret = new Array
                    ret.push(rec[i])
                    req.session.user.financement.recompense = ret
                    console.log(req.session.user.financement.recompense)
                    req.session.user.financement.montant += Number(rec[i].montant)
                    res.redirect('/vue/' + Number(req.params.rec[2]))
                    console.log(req.session.user.financement.montant)
                } else {
                    let ret = new Array
                    let recc = ret.concat(req.session.user.financement.recompense)
                    recc.push(rec[i])
                    req.session.user.financement.recompense = recc
                    console.log(req.session.user.financement.recompense)
                    req.session.user.financement.montant += Number(rec[i].montant)
                    res.redirect('/vue/' + Number(req.params.rec[2]))
                    console.log(req.session.user.financement.montant)
                }
                // res.render('client/projet_vue', {
                //    projet: rep.map(projet => new Projet_pres(projet))
                //})
            }
        })
}

// pour retirer une recompense de notre panoer
const retir_rec = (req, res) => {
    let recc = req.session.user.financement.recompense
    req.session.user.financement.montant -= Number(recc[req.params.rec[0]].montant)
    recc.splice(req.params.rec[0], 1)
    req.session.user.financement.recompense = recc
    res.redirect('/vue/' + Number(req.params.rec[2]))
}


const recu_message = (req, res) => {
    conn.query('SELECT idProjet FROM ((Projet INNER JOIN Utilisateur ON Projet.Pj_createur = Utilisateur.idUtilisateur)INNER JOIN Campagne On Projet.idProjet = Campagne.Cp_projet) WHERE Utilisateur.idUtilisateur = ? AND Campagne.Cp_message = ?',
        [[req.session.user.id],[req.params.message]], (err, rep) => {
            if (err) throw err
            else {
                conn.query('Update Campagne SET Cp_message = "" WHERE Cp_projet = ?',
                    [rep[0].idProjet], (err, rep) => {
                        if (err) throw err
                        else {
                            res.redirect('/')
                        }
                    })
            }
        })
}


module.exports = {
    signin,
    signin_get,
    signup_get,
    signup,
    logout,
    ajout_rec,
    retir_rec,
    recu_message
}