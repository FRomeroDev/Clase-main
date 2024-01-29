import { Router } from "express";

import { getAddProduct, getEditProduct, getProducts, postAddProduct, postEditProduct } from "../controllers/adminCtrl.js";

export const adminRouter = Router();



//todas las rutas que llegan aquí empiezan por /admin

adminRouter.get('/products',getProducts);
adminRouter.get('/add-product',getAddProduct); //GET para presentar el formulario
adminRouter.post('/add-product',postAddProduct); //POST para recibir los datos del formulario
adminRouter.get('/add-product/:productId', getEditProduct);
adminRouter.post('/edit-product',postEditProduct);
//adminRouter.post('/delete-product') - Delete item - Ruta para eliminar un producto
