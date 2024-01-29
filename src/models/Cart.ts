

export class CartItem{
    constructor(
        public id: number,  //id del producto del carro
        public qty: number //cantidad de veces que compro el producto
    ){}
}

const cartItems: CartItem[] = [];

export class Cart {
    static addProduct(id: number, qty: number)  // Introducir un producto en el carro
    {
        const index =  cartItems.findIndex( ci => ci.id === id );
        if(index>=0){
            //Si el producto ya está, aumentar qty
            cartItems[index] = new CartItem(id, cartItems[index].qty + qty);
        }else{
            //Si el producto no está en el carro todavía
            cartItems.push(new CartItem(id, qty));
        }        
        console.log(cartItems);
    }
    
    static getCart(){
        return cartItems;
    }

    static deleteProduct(id: number) {
        const index = cartItems.findIndex( ci => ci.id === id );
        if(index >= 0){
            cartItems.splice(index,1);
        }
    }
    static decreaseProduct(id: number){
        const index =  cartItems.findIndex( ci => ci.id === id );
        if(index>=0){
            //Si el producto ya está, aumentar qty
            const qty = cartItems[index].qty;
            if(qty === 1){
                this.deleteProduct(id);
            }else{
                cartItems[index] = new CartItem(id, qty-1);
            }
        }
    }
}