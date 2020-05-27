import * as express from "express"
import { json } from "body-parser"
import { config } from "dotenv"
import * as http from "http"
import { connect } from "mongoose"

//On appelle les modules pour des sécurités simples
import * as helmet from "helmet"
import * as morgan from "morgan"
import * as cors from "cors"
import * as rateLimit from "express-rate-limit"
const limiter = rateLimit({
    windowMs: 15*60*1000, //1000 milliseconde * 60 = 1 minute; 1min*15 = 15min
    max: 100
})

//On appelle nos routes
import users from "./Routes/users"

//On appelle nos variable d'environnement
config()

//Connexion à notre base de donnée
connect(process.env.dataBase, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=> console.log("base de donnée connecté avec succès"))
.catch(err => console.log(err))

//On initialise notre app
const app = express()

//on initialise les sécurités basique
app.use(helmet())
.use(limiter)
.use(morgan('common'))
.use(cors())

//json
.use(json())

//Nos routes
.use('/users', users)

//Serveur
const server = http.createServer(app)
server.listen(process.env.PORT, ()=> console.log(`Serveur sur le port ${process.env.PORT}`))