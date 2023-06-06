import { Request, Response } from 'npm:express'
import path from 'npm:path'
import * as crypto from "https://deno.land/std@0.171.0/node/crypto.ts";


export const avatar = function (req: Request, res: Response) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('La solicitud no contiene archivos.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const { avatar } = req.files;

    const id = crypto.randomUUID();

    const nameSplitted = avatar.name.split('.') || [];
    const extension = nameSplitted.pop() || '';
    const originalName = nameSplitted.join('.');
    const nameAvatar = `${originalName}_${id}.${extension}`

    if (!['png', 'jpg', 'tiff', 'jpeg'].includes(extension.toLocaleLowerCase())) {
        return res.status(400).send('Extensión no soportada');
    }
    const uploadPath = path.join('..', 'public', 'avatares', nameAvatar)
    
    // Use the mv() method to place the file somewhere on your server
    // deno-lint-ignore no-explicit-any
    avatar.mv(uploadPath, function (err: any) {
        if (err)
            return res.status(500).send(err);

        res.json({
            avatar: nameAvatar
        });
    });
} 
