import { Router } from "npm:express";
import { crearProd, renderProducts } from "../controllers/controller_product.ts";
import { verifyToken, verifyTokenWithRedirect } from "../verify/verify_token.ts";

const routesProduct = Router()

routesProduct.get('/', verifyTokenWithRedirect, renderProducts)
routesProduct.post('/', verifyToken, crearProd)


export default routesProduct;