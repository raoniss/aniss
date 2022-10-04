const express = require('express')
const app = express()
const port = 5000
const mysql = require("mysql")
const bodyParser = require('body-parser')
const session = require('express-session')
const MySQLStore = require("express-mysql-session")(session)
const cookieParser = require("cookie-parser")
const oneDay = 1000 * 60 * 60 * 24


//les differentes routes
const client_routes = require('./routes/client_routes') 
const pays_routes = require('./routes/pays_routes')
const categorie_routes = require('./routes/categorie_routes')
const user_routes =  require('./routes/utilisateur_routes')
const projet_routes = require('./routes/projet_routes')
const campagne_routes = require('./routes/campagne_routes')
const recompense_routes = require('./routes/recompense_routes')
const commentaire_routes = require ('./routes/commentaire_routes')
const admins_routes = require('./routes/admins_routes')


//parametre de session
const options ={
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'snahh'
}
const sessionConnection = mysql.createConnection(options);
const sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    schema:{
        tableName: 'sessiontbl',
        columnNames:{
            session_id: 'sesssion_id',
            expires: 'expires',
            data: 'data'
        }
    }
},sessionConnection)


 
//use
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
/*app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));*/
app.use( session({
    key: 'dkfflflfkfjgxvnldksalld',
    secret: 'my secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))
app.use(require('./middlewares/flash'))
const jwt = require('./middlewares/jwt')




//get



//post


//moteur de vues
app.set('views','./views')
app.set('view engine','ejs')


app.use('/',client_routes)
app.use('/pays',pays_routes)
app.use('/categorie',categorie_routes)
app.use('/user',user_routes)
app.use('/projet',projet_routes)
app.use('/campagne',campagne_routes)
app.use('/recompense',recompense_routes)
app.use('/commentaire',commentaire_routes)
app.use('/admin',admins_routes)



















app.listen(port,()=>{
})