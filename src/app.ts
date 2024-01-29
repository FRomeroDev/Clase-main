import express, { urlencoded } from "express";
import * as dotenv from 'dotenv';

import { rutas } from "./utils/rutas.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { shopRouter } from "./routes/shopRoutes.js";
import { dot } from "node:test/reporters";
import { error } from "node:console";
import { connectToDatabase } from "./services/databaseService.js";
import { User } from "./models/User.js";

console.log('------------------------------------------------------------_---');
console.log("Bienvenido a mi app");
dotenv.config(); // Lee el fichero .env y extrae las variables de entorno


const port = process.env.PORT || 3000; // Cogelos de las variables de entorno o usa el 3000

const app = express();

connectToDatabase()
.then (async () => 
{
    const user = new User('123456789', 'Mateo', 'mateo@un.com', {calle: 'La que sea', telf: '123456789', CP: '12345'});
    await user.save();
})    
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch(error => {
        console.log(error);

        app.use(urlencoded({ extended: false })); //Middleware para procesar los campos que me envíen por HTTP body-parser
        app.use(express.static(rutas.public)); //Mia rutas contenido estáticos .css .js
        app.disable('x-powered-by');
        app.set('view engine', 'ejs');
        app.set('views', rutas.views); //CAMBIAR

        app.use('/admin', adminRouter); //Las rutas empiezan por /admin
        app.use('/', shopRouter);
        //Controladores para responder a las peticiones por HTTP

        app.use('/', (req, res, next) => {
            console.log("Middleware del final");
            res.render('404.ejs', { pageTitle: "Págnia no encontrada", path: "" });
        })

        // FIN 
        app.listen(port);
        console.log("Servidor de la app en marcha");
        console.log(`Página disponible en: http://localhost:${port}`);
    })
    .catch(error => {
        console.log(error);
    })

console.log('------FIN DE PROGRAMA ---');