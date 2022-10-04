class Campagne{
    constructor(campagne){
        this.campagne = campagne
    }


    get idCampagne(){
        return this.campagne.idCampagne
    }


    get Cp_montant_recuperes(){
        return this.campagne.Cp_montant_recuperes
    }

    get Cp_date_debut(){
        return this.campagne.Cp_date_debut
    }

    get Cp_date_fin(){
        return this.campagne.Cp_date_fin
    }

    get Cp_video(){
        return this.campagne.Cp_video
    }

    get Cp_photo(){
        return this.campagne.Cp_photo
    }

    get Cp_nombre_participants(){
        return this.campagne.Cp_nombre_participants
    }

    get Cp_texte(){
        return this.campagne.Cp_texte
    }

    get Cp_nombre_suivis(){
        return this.campagne.Cp_nombre_suivis
    }

    get Cp_projet(){
        return this.campagne.Cp_projet
    }

    get Cp_rec(){
        return this.campagne.Cp_rec
    }
}




module.exports = Campagne