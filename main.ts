// import dotenv from 'npm:dotenv';
// dotenv.config();
import express from "npm:express"

import conectDB from "./src/conectDB/index.ts";
import routesUser from "./src/routes/route_user.ts";
import routesLogin from "./src/routes/route_login.ts";



class Server {

    private paths = {
        user: '/user',
        login: '/login',
    };

    private app = express();

    constructor( 
        private port: number = 8080

    ){}

    async start() {

        
        await conectDB()

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.paths.user, routesUser)
        this.app.use(this.paths.login, routesLogin)
        

        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: false
        // }));
       
        

        this.app.listen(this.port, () => {
          console.log(`Servidor escuchando en el puerto: ${this.port}`)
        })
    }
}
export default Server


