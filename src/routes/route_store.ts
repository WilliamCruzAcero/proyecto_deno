import { Router } from "npm:express";
import { renderStore } from "../controllers/controller_store.ts";
import { verifyTokenWithRedirect } from "../verify/verify_token.ts";


const routesStore = Router()

routesStore.get('/', verifyTokenWithRedirect, renderStore)

export default routesStore;