class Categorie{
    constructor(categorie){
        this.categorie = categorie
    }
    get idCategorie(){
        return this.categorie.idCategorie
    }
    get Cat_nom(){
        return this.categorie.Cat_nom
    }
}
module.exports = Categorie