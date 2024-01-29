import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";


const products: Product[] = [];

export class Product {
    public _id?: ObjectId // para que sepa que es un objeto de mongo - Id mongo

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: number
    ) {
    }
     async save() { // async porque usamos la bd
        if(this._id){
            const result = await collections.products?.updateOne({_id: this._id}, {$set: this});
            result 
            ? console.log(`Producto actualizado ${this._id}`)
            : console.log('Producto no actualizado');
            return;
        }
        const result = await collections.products?.insertOne(this); // Hay que hace un if para ver si está el producto o no en su momento
        result
            ? console.log(`Producto guardado ${result.insertedId}`)
            : console.log('Producto no guardado');
    
        /*
        if(!this.id){
            this.id = Math.round(Math.random()*1000000);
            products.push(this);
        }else{
            const index = products.findIndex( p => p.id === this.id );
            if(this.id>=0){
                products[index]=this; //{...this};
            }
        }
        */
    };

    static async fetchAll() { // Devuelve un array de productos - todos los productos de la base de datos mondog
        return await collections.products?.find().toArray();
    };
    static findById(productId: number) {
        return products.find(p => p.id === productId);
    }
    //static deleteById(productId: number){}
}