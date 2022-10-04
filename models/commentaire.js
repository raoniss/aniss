//Cm_utilisateur	Cm_campagne	Cm_commentaire	
class Commentaire{
    constructor(commentaire){
        return this.commentaire = commentaire
    }

    get idCommentaire(){
        return this.commentaire.idCommentaire
    }

    get Cm_utilisateur(){
        return this.commentaire.Cm_utilisateur
    }

    get Cm_campagne(){
        return this.commentaire.Cm_campagne
    }

    get Cm_commentaire(){
        return this.commentaire.Cm_commentaire
    }

    get Cm_date(){
        return this.commentaire.Cm_date
    }
}



module.exports = Commentaire 