// No usaremos autenticación pero sí usar ingenio para que se compruebe que el usuario es admin, contraseña cifrada o algo

import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";


interface address {
    calle: string,
    telf: string,
    CP: string
}

export class User {
    public _id?: ObjectId // para que sepa que es un objeto de mongo - Id mongo

    constructor(
        public DNI: string,
        public name: string,
        public email: string,
        public contacto: address, // objeto de interface address
        id?: string,

    ) { 
        if (id) {
            this._id = new ObjectId(id);
        }
    }
    async save() { // Expera a la bd para guardar y como se conecta a la bd que puede tardar por estar en la nube o servicio externo

        const result1 = await collections.users?.findOne({ DNI: this.DNI }); // Hay que hace un if para ver si está el producto o no en su momento
        if (result1) {
            this._id = result1._id;
            return this;
        }

        const result = await collections.users?.insertOne(this); // Hay que hace un if para ver si está el producto o no en su momento
        console.log(result);
        result 
            ? console.log(`Usuario guardado ${result.insertedId}`)
            : console.log('Usuario no guardado');
        return result;
    }
    static async fetchById(id: string) {
        return await collections.users?.findOne({ _id: new ObjectId(id) }); // Las conversiones de tipos de dato las haremos dentro del modelo
    }
}