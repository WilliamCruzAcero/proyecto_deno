import {Request, Response} from 'npm:express'
import jwt from 'npm:jsonwebtoken'
import { StatusCodes } from 'https://deno.land/x/https_status_codes@v1.2.0/mod.ts';
import { SECRET } from '../../config/index.ts';
import { Token } from "../models/token.ts";


const secret = SECRET;

export function verifyToken(req: Request & {token: Token}, res: Response, next: () => void) {
    const token = req.headers.authorization ?? req.query.token;

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).send('No se proporcionó un token de autenticación');
        return;
    }

    try {
        const decoded = jwt.verify(token, secret)
        req.token = decoded;
        next();
    
    } catch (_error) {
        res.status(StatusCodes.UNAUTHORIZED).send('Token de autenticación no válido');
    }
}

export function verifyTokenWithRedirect(req: Request & {token: Token}, res: Response, next: () => void) {
    const token = req.headers.authorization ?? req.query.token;

    if (!token) {
        res.redirect('/login')
        return;
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.token = decoded;
        next();
    } catch (_error) {
        res.redirect(StatusCodes.UNAUTHORIZED, '/login')
    }
}