import {StatusCodes} from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"
import {Request, Response} from 'npm:express';
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

import { WebError } from "../models/model_webError.ts";
import { userModel } from "../models/model_user.ts";
// import { sendMailFromNodeMailer } from "../servises/msgGmail/index.ts";


// export const viewRegistUser = (_req: Request, res: Response) => {
//     res.send("hola :)!");
// }

export const allUser = async (_req: Request, res: Response) => {
    
    const users = await userModel.find();
    res.send(users);
}

export const createUser = async (req: Request, res: Response) => {

    const {type, name, lastname, age, phone, email, password, address, city, country} = req.body;

    try {
        if(!type) {
            throw new WebError('Seleccione un tipo de usuario', StatusCodes.BAD_REQUEST)
        }
    
        if (!name) {
            throw new WebError('El nombre de usuario es requerido', StatusCodes.BAD_REQUEST);            
        }

        if (!lastname) {
            throw new WebError('El apellido del usuario es requerido', StatusCodes.BAD_REQUEST);
        }

        if (!age) {
            throw new WebError('La edad del usuario es requerida', StatusCodes.BAD_REQUEST);
        }
        
        if (!phone) {
            throw new WebError('El número de teléfono es requerido', StatusCodes.BAD_REQUEST); 
        }

       
        // deno-lint-ignore prefer-const
        let isPhoneRedExp = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/;

        if ( !isPhoneRedExp.test(phone)) {
            throw new WebError('El numero de teléfono no es valido', StatusCodes.BAD_REQUEST);
        }

        if ( !email) {
            throw new WebError(`El email es requerido`, StatusCodes.BAD_REQUEST);
        }

        // deno-lint-ignore prefer-const
        let isEmailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!isEmailRegExp.test(email)) {
            throw new WebError('El email debe ser un correo electrónico', StatusCodes.BAD_REQUEST);
        }

        if (!password) {
            throw new WebError('La contraseña es requerida', StatusCodes.BAD_REQUEST);
        }

        if (!address) {
            throw new WebError('La dirección es requerida', StatusCodes.BAD_REQUEST);
        }
    
        if (!city) {
            throw new WebError('La ciudad es requerida', StatusCodes.BAD_REQUEST);
        }
    
        if (!country) {
            throw new WebError('El pais requerido', StatusCodes.BAD_REQUEST);
        }

        const usuarioExistente = await userModel.findOne({ email });
        if ( usuarioExistente?.email) {
            throw new WebError('El email ya esta en uso', StatusCodes.BAD_REQUEST);
        }
        
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const { avatar } = req.body
        const newUser = new userModel({
            type,
            avatar,
            name,
            lastname,
            age,
            phone,
            email,
            password: hashedPassword,
            address,
            city,
            country,
            productos: []
        })
        
        
        await newUser.save();

        // await sendMailFromNodeMailer(newUser)

        res.json({
            message: `Usuario: ${name} ${lastname} con email: ${email}, registrado con exito`
        })

    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
            return res.status(status).json({
            error: error.message
        }) 
    }
    
};



