class Utilisateur{
    constructor(user){
        this.user = user
    }


    get idUtilisateur(){
        return this.user.idUtilisateur
    }

    get User_nom(){
        return this.user.User_nom
    }

    get User_active(){
        return this.user.User_active
    }

    get User_email(){
        return this.user.User_email
    }

    get User_mot_de_passe(){
        return this.user.User_mot_de_passe
    }
    
    get User_photo_profil(){
        return this.user.User_photo_profil
    }

    get User_photo_page(){
        return this.user.User_photo_page
    }

    get User_description(){
        return this.user.User_description
    }

    get User_reseaux_socials(){
        return this.user.User_reseaux_socials
    }

    get User_projets_suivis(){
        return this.user.User_projets_suivis
    }


    get Pays_idPays(){
        return this.user.Pays_idPays
    }
}



module.exports = Utilisateur