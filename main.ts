import express from "npm:express";

import * as path from "https://deno.land/std@0.177.1/path/mod.ts";

import conectDB from "./src/conectDB/index.ts";

import routesUser from "./src/routes/route_user.ts";
import routesLogin from "./src/routes/route_login.ts";
import routesProduct from "./src/routes/route_product.ts";
import routesHome from "./src/routes/route_home.ts";



class Server {

    private paths = {
        home: '/',
        user: '/user',
        login: '/login',
        product: '/product'
    };

    private app = express();

    constructor( 
        private port: number = 8080

    ){}

    async start() {

        
        await conectDB()

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        
        this.app.use('/javascript', express.static(path.join('public', 'javascript')))
        this.app.use('/avatares', express.static(path.join('public', 'avatares')))

        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
            // createParentPath: false
        // }));

        // this.app.set('views', './views');
        // this.app.set('view engine', 'ejs');

        this.app.use(this.paths.home, routesHome)
        this.app.use(this.paths.user, routesUser)
        this.app.use(this.paths.login, routesLogin)
        this.app.use(this.paths.product, routesProduct)
        


       

        

        this.app.listen(this.port, () => {
          console.log(`Servidor escuchando en el puerto: ${this.port}`)
        })
    }
}
export default Server


