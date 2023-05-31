import {Request, Response} from 'npm:express'
import jwt from 'npm:jsonwebtoken';
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { StatusCodes } from 'https://deno.land/x/https_status_codes@v1.2.0/mod.ts';
const { cwd} = Deno;
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";

import { WebError } from '../models/model_webError.ts';
import { userModel } from '../models/model_user.ts';

const secret = Deno.env.get("SECRET")

export const viewLogin = async (_req: Request, res: Response) => {
        const viewLogin = await renderFileToString(`${cwd()}/views/formulario-inicio-sesion.ejs`, {});
        res.send(viewLogin)
}

export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    let user;

    try {
        if (!email) {
            throw new WebError('El email de usuario es requerido', StatusCodes.BAD_REQUEST)
        }

        if (!password) {
            throw new WebError('La contraseña es requerida', StatusCodes.BAD_REQUEST)
        }

        user = await userModel.findOne({ email });

        if (!user?.email) {
            throw new WebError('El usuario no esta registrado', StatusCodes.UNAUTHORIZED);
        }

        const hashedPassword = user.password;
        const isCorrectPassword = await bcrypt.compare(password, hashedPassword)

        if (!isCorrectPassword) {
            throw new WebError('El nombre de usuario o contraseña es incorrecta',  StatusCodes.UNAUTHORIZED);
        }

    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        // logger.log('error', error.message)
        return res.status(status).json({
            error: error.message
        })           
    }

    const tokenBody = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
    }

    const token = jwt.sign(tokenBody, secret, { expiresIn: '1h' });
    
  
    res.json({ token });

}
