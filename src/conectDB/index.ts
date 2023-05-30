import mongoose from "npm:mongoose"
import { MONGO_URI } from "../../config/index.ts";

const conectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Base de datos conectada :)');
    } catch (error) {
        console.log('Error en la conexion a la base de datos' + error);
    }
}
        
export default conectDB;
