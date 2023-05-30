import { Request, Response } from 'npm:express';

const viewHome = (_req: Request, res: Response) => {

    res.render('home');
}
export default viewHome;