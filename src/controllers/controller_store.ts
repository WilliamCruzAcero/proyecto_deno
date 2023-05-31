import { Request, Response } from 'npm:express';

import { userModel } from '../models/model_user.ts';
import { Token } from '../models/token.ts';

const { cwd} = Deno;
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";

export const renderStore = async (req: Request & {token: Token}, res: Response) => {
    
    const { email, name, lastname } = req.token
    const user = await userModel.findOne({ email });
    const products = user?.products;
    const renderProductsStore= await renderFileToString(`${cwd()}/views/store.ejs`, {
        products,
        user: {
            name,
            lastname,
            email
        }
    });
    res.send(renderProductsStore)
};

// export const allProducts = async (req: Request & {token: Token}, res: Response) => {
   
//     const {email} = req.token;
//     const user = await userModel.findOne({email});
//     const products = user?.products;
//     res.json(products);

// }