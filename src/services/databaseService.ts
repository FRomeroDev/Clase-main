import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';



import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export const collections: {
    products?: mongoDB.Collection<Product>,
    users?: mongoDB.Collection<User>,
} = {} // no se comprueba que los productos tengan todos los campos


// Para arrancar la base de datos:
export async function connectToDatabase () {
    dotenv.config(); // Lee el fichero .env y extrae las variables de entorno
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!); // Como conectarme al servidor (localhost pero podría ser ip remota)
    // Lo coge desde el fichero .env
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME!); // Elección de la base de datos

    collections.products = db.collection<Product>(process.env.PRODUCT_COLLECTION!); // Elección de la colección
    collections.users = db.collection<User>(process.env.USER_COLLECTION!); // Elección de la colección

    console.log( `Hemos conectado a la base de datos: ${db.databaseName} y a la colección: ${collections.products.collectionName}`);
    console.log( `Hemos conectado a la base de datos: ${db.databaseName} y a la colección: ${collections.users.collectionName}`);

}