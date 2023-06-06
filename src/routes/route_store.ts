import { Router } from "npm:express";
import { addProductToCart, deleteProductToCart, renderStore } from "../controllers/controller_store.ts";
import { verifyToken, verifyTokenWithRedirect } from "../verify/verify_token.ts";


const routesStore = Router()

routesStore.get('/', verifyTokenWithRedirect, renderStore)
routesStore.post('/add', verifyToken, addProductToCart)
routesStore.post('/delete', verifyToken, deleteProductToCart )

export default routesStore;