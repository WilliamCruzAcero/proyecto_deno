import { Router } from "npm:express";
import viewHome from "../controllers/controller_home.ts";



const routesHome = Router()


routesHome.post('/', viewHome)
// routes.post('/', )

export default routesHome;