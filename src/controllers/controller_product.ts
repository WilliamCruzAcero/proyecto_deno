import { Request, Response } from 'npm:express';

import { userModel } from '../models/model_user.ts';
import { Token } from '../models/token.ts';

const { cwd} = Deno;
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
import { StatusCodes } from 'https://deno.land/x/https_status_codes@v1.2.0/mod.ts';
import { WebError } from '../models/model_webError.ts';

export const renderProducts = async (req: Request & {token: Token}, res: Response) => {

    const { email, name, lastname } = req.token
    const user = await userModel.findOne({ email });
    const products = user?.products;
    const renderProducts= await renderFileToString(`${cwd()}/views/formulario-productos.ejs`, {
        products,
        user: {
            name,
            lastname,
            email
        }
    });
    res.send(renderProducts)
};

export const crearProd = async (req: Request & {token: Token}, res: Response) => {
   
    const { email } = req.token; 
    const { name, price, image, amount } = req.body;

    try {
        if (!name) {
            throw new WebError('No se puede crear un producto sin nombre', StatusCodes.BAD_REQUEST)
        }

        if (!price) {
            throw new WebError('No se puede crear un producto sin precio', StatusCodes.BAD_REQUEST)
        }

        if (!image) {
            throw new WebError('No se puede crear un producto sin imagen', StatusCodes.BAD_REQUEST)
        }

        if (!amount) {
            throw new WebError('No se puede crear un producto sin cantidad', StatusCodes.BAD_REQUEST)
        }

        const user = await userModel.findOne({ email });
        if(!user) {
            throw new WebError('Usuario no encontrado', StatusCodes.BAD_REQUEST)
        }
        const productoExistente = user.products.find(product => product.name === name);
    
        if (productoExistente) {
            throw new WebError('El producto ya existe', StatusCodes.BAD_REQUEST)
        } 
        else {        
            user.products.push({
                name,
                price,
                image,
                amount
            })
            await user.save()
    
            res.json({message: 'Producto creado con exito'});
        }
    } catch (error) {
        const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
            return res.status(status).json({
            error: error.message
        }) 
    }
}