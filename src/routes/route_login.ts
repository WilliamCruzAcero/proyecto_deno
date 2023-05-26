import { Router } from "npm:express";
import { loginUser } from "../controllers/controller_login.ts";


const routesLogin = Router()


routesLogin.post('/', loginUser)
// routes.post('/', )

export default routesLogin;