import { Router } from "npm:express";
import { renderCartShopping } from "../controllers/controller_shopping_cart.ts";
import { verifyTokenWithRedirect } from "../verify/verify_token.ts";

const routesCartShopping = Router()

routesCartShopping.get('/', verifyTokenWithRedirect, renderCartShopping)
// routesShoppingCart.post('/', )

export default routesCartShopping;