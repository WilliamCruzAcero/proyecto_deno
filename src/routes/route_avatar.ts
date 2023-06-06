import { Router } from "npm:express";
import { avatar } from "../controllers/controller_avatar.ts";


const routesAvatar = Router();

routesAvatar.get('/', avatar);

export default routesAvatar; 