import { Request, Response } from 'npm:express';

import { userModel } from '../models/model_user.ts';
import { verificarCampoRequerido } from '../verify/check_field.ts';
import { Token } from '../models/token.ts';

export const allProducts = async (req: Request & {token: Token}, res: Response) => {
   
    const {email} = req.token;
    const user = await userModel.findOne({email});
    const products = user?.products;
    res.json(products);

}

export const crearProd = async (req: Request & {token: Token}, res: Response) => {
   
    const { email } = req.token; 
    const { name, price, image, amount } = req.body;

    const err = 'Los siguientes campos son requeridos:'
        
    try {
        verificarCampoRequerido(name, `${err} Nombre`);
        verificarCampoRequerido(price, `${err} Precio`);
        verificarCampoRequerido(image, `${err} Imagen`);
        verificarCampoRequerido(amount, `${err} Cantidad`);
    } catch (error) {
        return res.status(error.status).json({ error: error.message })
    }

    const user = await userModel.findOne({ email });
    if(!user) {
        return res.status().json('Usuario no encontrado')
    }
    const productoExistente = user.products.find(product => product.name === name);

    if (productoExistente) {
        return res.status().json('El producto ya existe');
    } 
    else {        
        user.products.push({
            name,
            price,
            image,
            amount
        })
        await user.save()
    }
    
    res.json({message: 'Producto creado con exito'});
}