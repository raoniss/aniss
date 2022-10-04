class Projet{
    constructor(projet){
        this.projet = projet
    }

    get idProjet(){
        return this.projet.idProjet
    }
    
    get Pj_description(){
        return this.projet.Pj_description
    }

    get Pj_titre(){
        return this.projet.Pj_titre
    }

    get Pj_cagnotte (){
        return this.projet.Pj_cagnotte
    }

    get Pj_createur(){
        return this.projet.Pj_createur
    }

    get Pj_categorie(){
        return this.projet.Pj_categorie
    }

    get Pj_active(){
        return this.projet.Pj_active
    }
}



module.exports = Projet