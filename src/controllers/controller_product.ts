import { Request, Response } from 'npm:express';

import { userModel } from '../models/model_user.ts';
import { Token } from '../models/token.ts';

const { cwd} = Deno;
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
import { StatusCodes } from 'https://deno.land/x/https_status_codes@v1.2.0/mod.ts';
import { WebError } from '../models/model_webError.ts';

export const renderProducts = async (req: Request & {token: Token}, res: Response) => {

    const { email, name, lastname } = req.tokenVerified
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

export const updateProduct = async (req: Request, res: Response) =>  {
    
    const {name, price, image, amount} = req.body
    const { email } = req.token
    const user = await userModel.findOne({ email });
    const products = user?.products;

    if (Number.isNaN(price)) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'El precio ingresado no es valido'});
    }

    if ( !products ) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'No existen productos en el inventario'});
    }
    const product = products.find(product  => product.name === name )
    
    if (!product) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: `El producto ${name} no existe en el inventario`})
    }

    if (price < 0) {
            product.price
    }else{
        product.price = price
    }
    console.log(product.price)

    if (image == '') {
        product.image
    }else {
        product.image = image
    }
    
    if (  amount <= 0 ) {
        product.amount 
    } else {
        product.amount += amount
    }
    
    console.log (product.amount)

    await user.save()

    res.json({message: 'Producto actualizado con exito'});

}

export const deleteProduct = async ( req: Request, res: Response ) => {
    const {name} = req.body
    const { email } = req.token
    const user = await userModel.findOne({ email });
    const products = user?.products;

    if ( !products ) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'No existen productos en el inventario'});
    }
    const product = products.find(product  => product.name === name )
    
    if (!product) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: `El producto ${name} no existe en el inventario`})
    }

    const index = products.indexOf(product)

    if (index > -1) {
        products.splice(index, 1);
    }

    await user.save()

    res.json({message: 'Producto borrado con exito'});

}