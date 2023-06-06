import { Router } from "npm:express";
import { crearProd, deleteProduct, renderProducts, updateProduct } from "../controllers/controller_product.ts";
import { verifyToken, verifyTokenWithRedirect } from "../verify/verify_token.ts";

const routesProduct = Router()

routesProduct.get('/', verifyTokenWithRedirect, renderProducts)
routesProduct.post('/', verifyToken, crearProd)
routesProduct.delete('/', verifyToken, deleteProduct)
routesProduct.put('/', verifyToken, updateProduct)


export default routesProduct;