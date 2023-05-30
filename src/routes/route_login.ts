import { Router } from "npm:express";
import { loginUser, viewLogin } from "../controllers/controller_login.ts";


const routesLogin = Router()

routesLogin.get('/', viewLogin)
routesLogin.post('/', loginUser)


export default routesLogin;