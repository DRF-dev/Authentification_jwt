"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = require("body-parser");
const dotenv_1 = require("dotenv");
const http = require("http");
const mongoose_1 = require("mongoose");
//On appelle les modules pour des sécurités simples
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
//On appelle nos routes
const users_1 = require("./Routes/users");
//On appelle nos variable d'environnement
dotenv_1.config();
//Connexion à notre base de donnée
mongoose_1.connect(process.env.dataBase, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("base de donnée connecté avec succès"))
    .catch(err => console.log(err));
//On initialise notre app
const app = express();
//on initialise les sécurités basique
app.use(helmet())
    .use(limiter)
    .use(morgan('common'))
    .use(cors())
    //json
    .use(body_parser_1.json())
    //Nos routes
    .use('/users', users_1.default);
//Serveur
const server = http.createServer(app);
server.listen(process.env.PORT, () => console.log(`Serveur sur le port ${process.env.PORT}`));
//# sourceMappingURL=app.js.map