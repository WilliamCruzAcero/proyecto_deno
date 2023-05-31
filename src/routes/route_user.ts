import { Router } from "npm:express";
import { createUser, viewRegistUser } from "../controllers/controller_user.ts";

const routesUser = Router()

routesUser.get('/', viewRegistUser)
routesUser.post('/', createUser)

export default routesUser;