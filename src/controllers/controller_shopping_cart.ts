import { Request, Response } from 'npm:express';

import { userModel } from '../models/model_user.ts';
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";

const { cwd} = Deno;
import { Token } from '../models/token.ts';

export const renderCartShopping = async (req: Request & {token: Token}, res: Response) => {
    
    const { email, name, lastname } = req.token
    const user = await userModel.findOne({ email });
    const products = user?.products;
    
    const CartShopping= await renderFileToString(`${cwd()}/views/carrito.ejs`, {
        products,
        user: {
            name,
            lastname,
            email
        }
    });
    res.send(CartShopping)
};