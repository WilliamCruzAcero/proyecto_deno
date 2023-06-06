// deno-lint-ignore-file
import { Request, Response } from 'npm:express';

import { userModel } from '../models/model_user.ts';
import { Token } from '../models/token.ts';

const { cwd} = Deno;
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
import { StatusCodes } from 'https://deno.land/x/https_status_codes@v1.2.0/mod.ts';



export const renderStore = async (req: Request & {token: Token}, res: Response) => {
    
    const { email, name, lastname } = req.tokenVerified
    const user = await userModel.findOne({ email });
    const products = user?.products;
    const shoppingcart = user?.shoppingcart
    
    const renderProductsStore= await renderFileToString(`${cwd()}/views/store.ejs`, {
        products,
        shoppingcart,
        user: {
            name,
            lastname,
            email
        }
    });
    res.send(renderProductsStore)
};

export const addProductToCart = async (req: Request & {token: Token}, res: Response) => {
    const {name} = req.body
    const {email} = req.token
    const user = await userModel.findOne({ email });
    const products = user?.products;
       
    if ( !products ) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'No existen productos en el inventario'});
    }
    const product = products.find(product  => product.name === name )
    
    if (!product) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: `El producto ${name} no existe en el inventario`})
    }

    if (product.amount <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: `El producto ${name} no tiene Stock`}) 
    }

    product.amount -= 1

    const shoppingcart = user.shoppingcart
   
    const productInCart = shoppingcart.find(product  => product.name === name )

    if (productInCart) {
        productInCart.amount += 1
    }else{
        shoppingcart.push({
            name: product.name,
            price: product.price,
            amount: 1
        })
    }

    await user.save()

    res.json(shoppingcart)
}
export const deleteProductToCart = async (req: Request & {token: Token}, res: Response) =>  {
    const {name} = req.body
    const {email} = req.token
    const user = await userModel.findOne({ email });
    const products = user?.products;
       
    if ( !products ) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'No existen productos en el inventario'});
    }
    const product = products.find(product  => product.name === name )
    
    if (!product) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: `El producto ${name} no existe en el inventario`})
    }

    if (product.amount <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: `El producto ${name} no tiene Stock`}) 
    }

    product.amount += 1

    const shoppingcart = user.shoppingcart
   
    const productInCart = shoppingcart.find(product  => product.name === name )

    if (productInCart) {
        productInCart.amount -= 1
    }

    await user.save()

    res.json(shoppingcart)
}

// export const deleAllProductCart = async (req: Request & {token: Token}, res: Response) => {
    
//     const {email} = req.token
//     const user = await userModel.findOne({ email });
//     const products = user?.products;

//     if ( !products ) {
//         return res.status(StatusCodes.BAD_REQUEST).json({error: 'No existen productos en el inventario'});
//     }

//     products.forEach(product => {
        
//         const shoppingcart = user.shoppingcart
        
             
        

//         res.json(shoppingcart)
//     });
    
// }

