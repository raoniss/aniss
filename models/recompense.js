//Rec_matricule	Rec_titre	Rec_description	Rec_montant	Rec_date_limite	Rec_nombre	Rec_url	Campagne_idCampagne	Pays_idPays
class Recompense{
    constructor(recompense){
        this.recompense = recompense
    }


    get idRecompense(){
        return this.recompense.idRecompense
    }


    get Rec_matricule(){
        return this.recompense.Rec_matricule
    } 

     
    get Rec_titre(){
        return this.recompense.Rec_titre
    }

    
    get Rec_description(){
        return this.recompense.Rec_description
    } 


    get Rec_montant(){
        return this.recompense.Rec_montant
    } 
    

    get Rec_date_limite(){
        return this.recompense.Rec_date_limite
    } 


    get Rec_nombre(){
        return this.recompense.Rec_nombre
    } 
    
    
    get Rec_url(){
        return this.recompense.Rec_url
    } 
    
    
    get Campagne_idCampagne(){
        return this.recompense.Campagne_idCampagne
    } 
    
    
    get Pays_idPays(){
        return this.recompense.Pays_idPays
    }
}




module.exports = Recompense