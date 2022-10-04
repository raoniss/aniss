class Projet_pres{
    constructor(Projet_pres){
        this.Projet_pres = Projet_pres
    }

    get idProjet(){
        return this.Projet_pres.idProjet
    }
    
    get Pj_description(){
        return this.Projet_pres.Pj_description
    }

    get Pj_titre(){
        return this.Projet_pres.Pj_titre
    }

    get Pj_cagnotte (){
        return this.Projet_pres.Pj_cagnotte
    }

    get Pj_createur(){
        return this.Projet_pres.Pj_createur
    }

    get Pj_categorie(){
        return this.Projet_pres.Pj_categorie
    }

    get Pj_active(){
        return this.Projet_pres.Pj_active
    }

    get idCampagne(){
        return this.Projet_pres.idCampagne
    }


    get Cp_montant_recuperes(){
        return this.Projet_pres.Cp_montant_recuperes
    }

    get Cp_date_debut(){
        return this.Projet_pres.Cp_date_debut
    }

    get Cp_date_fin(){
        return this.Projet_pres.Cp_date_fin
    }

    get Cp_video(){
        return this.Projet_pres.Cp_video
    }

    get Cp_photo(){
        return this.Projet_pres.Cp_photo
    }

    get Cp_nombre_participants(){
        return this.Projet_pres.Cp_nombre_participants
    }

    get Cp_texte(){
        return this.Projet_pres.Cp_texte
    }

    get Cp_nombre_suivis(){
        return this.Projet_pres.Cp_nombre_suivis
    }

    get Cp_projet(){
        return this.Projet_pres.Cp_projet
    }

    get Cp_rec(){
        return JSON.parse(this.Projet_pres.Cp_rec) 
    }
}



module.exports = Projet_pres