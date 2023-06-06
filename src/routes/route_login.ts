import { Router } from "npm:express";
import { loginUser, viewLogin } from "../controllers/controller_login.ts";
import { logout } from "../controllers/controller_logout.ts";


const routesLogin = Router()

routesLogin.get('/', viewLogin)
routesLogin.post('/', loginUser)
routesLogin.post('/logout', logout)


export default routesLogin;