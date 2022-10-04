class Pays{
    constructor(projet){
        this.projet = projet
    }


    get idPays(){
        return this.projet.idPays
    }

    get Py_nom(){
        return this.projet.Py_nom
    }
}
module.exports = Pays