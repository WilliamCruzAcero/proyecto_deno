import { Router } from "npm:express";
import { viewHome } from "../controllers/controller_home.ts";


const routesHome = Router();

routesHome.get('/', viewHome);

export default routesHome; 