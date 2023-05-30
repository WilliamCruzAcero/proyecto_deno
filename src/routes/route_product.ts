import { Router } from "npm:express";
import { allProducts, crearProd } from "../controllers/controller_product.ts";
import { verifyToken } from "../verify/verify_token.ts";

const routesProduct = Router()

routesProduct.get('/', verifyToken, allProducts)
routesProduct.post('/', verifyToken, crearProd)


export default routesProduct;