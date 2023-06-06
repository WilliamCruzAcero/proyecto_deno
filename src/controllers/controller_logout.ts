import { Request, Response } from "npm:express";


export const logout = (req: Request, res: Response) => {
    
    const { name, lastname } = req.tokenVerified
    console.log(name)
    res.renderFileToString('mensaje', { mensaje: `Hasta luego ${name} ${lastname}` })

}
