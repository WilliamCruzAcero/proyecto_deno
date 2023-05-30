const { cwd} = Deno;
import { renderFileToString } from "https://deno.land/x/dejs@0.10.2/mod.ts";
import { Request, Response } from 'npm:express';

export const viewHome = async (_req: Request, res: Response) => {
        const viewHome = await renderFileToString(`${cwd()}/views/home.ejs`, {});
        res.send(viewHome)
}
