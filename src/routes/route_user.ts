import { Router } from "npm:express";
import { allUser, createUser/* , viewRegistUser */ } from "../controllers/controller_user.ts";

const routesUser = Router()

routesUser.get('/', allUser)
// routesUser.get('/', viewRegistUser)
routesUser.post('/', createUser)

export default routesUser;