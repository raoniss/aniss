const conn = require('../config/db')
const Projet = require('../models/projet')
const Projet_pres = require('../models/projet_pres')
const Pays = require('../controller/pays_controllers')
const Categorie = require('../controller/categorie_controllers')

//ajout d;un projet
const ajouter = (req, res) => {
    conn.query('INSERT INTO Projet (Pj_description,Pj_titre,Pj_cagnotte,Pj_createur,Pj_categorie) values (?,?,?,?,?)',
        [
            [req.body.description],
            [req.body.titre],
            [req.body.cagnotte],
            [req.body.createur],
            [req.body.categorie]
        ], (err, rep) => {
            if (err) throw err
            else {
                res.redirect('/projet/')
            }
        })
}


//modification d'un projet
const modifier = (req, res) => {
    conn.query('UPDATE Projet Set Pj_description =?,Pj_titre =?,Pj_cagnotte =?,Pj_createur =?,Pj_categorie =? WHERE idProjet =?',
        [
            [req.body.description],
            [req.body.titre],
            [req.body.cagnotte],
            [req.body.createur],
            [req.body.categorie],
            [req.params.id]
        ], (err, rep) => {
            if (err) throw err
            else {
                res.redirect('/projet/')
            }
        })
}



//redirection vers le formulaire de modification 
const modifier_get = (req, res) => {
    conn.query('SELECT * FROM Projet', (err, rep) => {
        if (err) throw err
        else {
            res.render('projet/frommod', {
                projet: rep.map(projet => new Projet(projet))
            })
        }
    })
}


//supresion d'un projet
const supprimer = (req, res) => {
    conn.query('DELETE FROM Projet WHERE idProjet = ?', [
        [req.params.id]
    ], (err, rep) => {
        if (err) throw err
        else {
            res.redirect('/projet/')
        }
    })
}


//liste les projets
const lister = (req, res) => {
    conn.query('SELECT * FROM Projet', (err, rep) => {
        if (err) throw err
        else {
            res.render('admin/projet/projet_at', {
                projet: rep.map(projet => new Projet(projet))
            })
        }
    })
}


//lancement d'un projet
const start = (req, res) => {
    Categorie.liste((categorie) => {
        Pays.lister((pays) => {
            if (!req.session.user.projet) {
                res.render('client/projet/create', {
                    categorie: categorie,
                    projet: req.session.user.proje
                })
            } else {
                console.log(req.session.user.projet)
                res.render('client/projet/create', {
                    categorie: categorie,
                    projet: req.session.user.projet
                })
            }
        })
    })
}


//redirection vers la page de creation des projet
const create = (req, res) => {
    conn.query('INSERT INTO Projet (Pj_description,Pj_titre,Pj_cagnotte,Pj_createur,Pj_categorie) values (?,?,?,?,?)',
        [
            [req.session.user.projet.description],
            [req.session.user.projet.titre],
            [req.session.user.projet.cagnotte],
            [req.session.user.id],
            [Number(req.session.user.projet.categorie)]
        ], (err, rep) => {
            if (err) throw err
            else {
                conn.query('SELECT idProjet FROM Projet WHERE Pj_description=? AND Pj_titre=? AND Pj_cagnotte=? AND Pj_createur=? AND Pj_categorie=?',
                    [
                        [req.session.user.projet.description],
                        [req.session.user.projet.titre],
                        [req.session.user.projet.cagnotte],
                        [req.session.user.id],
                        [Number(req.session.user.projet.categorie)]
                    ], (err, rep) => {
                        if (err) throw err
                        else {
                            rep.map(projet => new Projet(projet))
                            const recc =JSON.stringify(req.session.user.projet.campagne.recompense)
                            conn.query('INSERT INTO Campagne (Cp_date_debut,Cp_video,Cp_photo,Cp_projet,Cp_texte,Cp_rec,Cp_message) values (?,?,?,?,?,?,?)',
                                [
                                    [req.session.user.projet.campagne.date],
                                    [req.session.user.projet.campagne.video],
                                    [req.session.user.projet.campagne.photo],
                                    [rep[0].idProjet],
                                    [req.session.user.projet.campagne.text],
                                    [recc],
                                    ['vous allez patiente quelque le temps aue un de nos moderateur analyse votre projet. Ca peut prendre quelque jours.']
                                ], (err, rep) => {
                                    if (err) throw err
                                    else {
                                        req.session.user.projet = undefined
                                        res.redirect('/')
                                    }
                                })
                        }
                    })
            }
        })
}



const base = (req, res) => {
    console.log
    if (!req.files) {
        console.log("No file upload");
    } else {
        var image = '/assets/image/projet/' + req.files.photo[0].filename
        var video = '/assets/image/projet/' + req.files.video[0].filename
        req.session.user.projet = {
            description: req.body.description,
            titre: req.body.titre,
            cagnotte: req.body.cagnotte,
            categorie: Number(req.body.categorie)
        }
        req.session.user.projet.campagne = {
            date: req.body.date_lancement,
            video: video,
            photo: image
        }
        req.session.user.projet.campagne.recompense == new Array()
        console.log(req.session.user.projet.campagne)
        res.redirect('/projet/create/recompense')

        /*conn.query('INSERT INTO Projet (Pj_description,Pj_titre,Pj_cagnotte,Pj_createur,Pj_categorie) values (?,?,?,?,?)',
            [
                [req.body.description],
                [req.body.titre],
                [req.body.cagnotte],
                [req.session.user.id],
                [Number(req.body.categorie)]
            ], (err, rep) => {
                if (err) throw err
                else {
                    conn.query('SELECT idProjet FROM Projet WHERE Pj_description=? AND Pj_titre=? AND Pj_cagnotte=? AND Pj_createur=? AND Pj_categorie=?',
            [
                [req.body.description],
                [req.body.titre],
                [req.body.cagnotte],
                [Number(req.session.user.id)],
                [Number(req.body.categorie)]
            ], (err, rep) => {
                if (err) throw err
                else {
                    rep.map(projet => new Projet(projet))
                    conn.query('INSERT INTO Campagne (Cp_date_debut,Cp_video,Cp_photo,Cp_projet) values (?,?,?,?)',
                        [
                            [req.body.date],
                            [video],
                            [image],
                            [rep[0].idProjet]
                        ], (err, rep) => {
                            if (err) throw err
                            else {
                                console.log('bon')
                            }
                        })
                }
            })
                    conn.query('INSERT INTO Campagne (Cp_date_debut,Cp_video,Cp_photo,Cp_projet) values (?,?,?,?,?,?,?,?,?,?)',
                        [
                            [req.body.date],
                            [video],
                            [image],
                            [id_projet]
                        ], (err, rep) => {
                            if (err) throw err
                            else {
                                res.redirect('/campagne/')
                            }
                        })
                }
            })*/
    }
}



const recompense = (req, res) => {
    if (req.session.user.projet.campagne.recompense === undefined) {
        req.session.user.projet.campagne.recompense = [{
            nom: req.body.nom,
            montant: Number(req.body.montant),
            description: req.body.description,
            type: req.body.type,
            livraison: req.body.livraison,
            date_livraison: req.body.date_livraison,
            quantite: Number(req.body.quantite),
            date_limite: req.body.date_limite
        }]
        res.redirect('/projet/create/recompense')
    } else {
        let rec = new Array
        let recc = rec.concat(req.session.user.projet.campagne.recompense)
        recc.push({
            nom: req.body.nom,
            montant: Number(req.body.montant),
            description: req.body.description,
            type: req.body.type,
            livraison: req.body.livraison,
            date_livraison: req.body.date_livraison,
            quantite: Number(req.body.quantite),
            date_limite: req.body.date_limite
        })
        req.session.user.projet.campagne.recompense = recc
        res.redirect('/projet/create/recompense')
    }
}


const supprime_rec = (req, res) => {
    let recc = req.session.user.projet.campagne.recompense
    recc.splice(req.params.id, 1)
    req.session.user.projet.campagne.recompense = recc
    res.redirect('/projet/create/recompense')
}


const modifie_rec = (req, res) => {
    let recc = req.session.user.projet.campagne.recompense
    recc.splice(req.params.id, 1, req.body)
    req.session.user.projet.campagne.recompense = recc
    res.redirect('/projet/create/recompense')
}


const histoire = (req, res) => {
    req.session.user.projet.campagne.text = req.body.texte
    res.render('client/projet/equipe', {
        user: req.session.user
    })
}

const valider = (req, res)=>{

    conn.query('UPDATE Projet Set Pj_active =? WHERE idProjet =?',
        [
            ["true"],
            [req.params.id]
        ], (err, rep) => {
            if (err) throw err
            else {
                res.redirect('/admin/')
            }
        })
}
const no_valider = (req, res)=>{

    conn.query('UPDATE Projet Set Pj_active =? WHERE idProjet =?',
        [
            ["false"],
            [req.params.id]
        ], (err, rep) => {
            if (err) throw err
            else {
                res.redirect('/admin/')
            }
        })
}

const lister_acceuil = (req,res)=>{
    /*conn.query('SELECT * FROM Projet INNER JOIN Campagne on Projet.idProjet = Campagne.Cp_projet WHERE Pj_active = "true"', (err, rep) => {
        if (err) throw err
        else {
            res.render('client/index', {
                projet: rep.map(projet => new Projet_pres(projet))
            })
        }
    })*/
    res.render('client/index')
}


//voire un projet en particulier
const vue = (req, res)=>{
    conn.query('SELECT * FROM Projet INNER JOIN Campagne on Projet.idProjet = Campagne.Cp_projet WHERE Projet.idProjet = ?',
    [req.params.id]
    , (err, rep) => {
        if (err) throw err
        else {
            res.render('client/projet_vue', {
                projet: rep.map(projet => new Projet_pres(projet))
            })
        }
    })
}

const camp = (req, res)=>{
    conn.query('SELECT * FROM ((Projet INNER JOIN Utilisateur ON Projet.Pj_createur = Utilisateur.idUtilisateur)INNER JOIN Campagne On Projet.idProjet = Campagne.Cp_projet) WHERE Utilisateur.idUtilisateur = ?',
    [req.session.user.id]
    , (err, rep) => {
        if (err) throw err
        else {
            //let popo = rep.map(projet => new Projet_pres(projet))
            //console.log(popo)
            res.render('client/camp', {
                projet: rep.map(projet => new Projet_pres(projet))
            })
        }
    })
}




module.exports = {
    ajouter,
    modifier,
    modifier_get,
    supprimer,
    lister,
    start,
    create,
    base,
    recompense,
    supprime_rec,
    modifie_rec,
    histoire,
    valider,
    no_valider,
    lister_acceuil,
    vue,
    camp
}