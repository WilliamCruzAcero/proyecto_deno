import mongoose from "npm:mongoose"

const conectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://williamcruzacero:ingridyw86@proyectocoderhouse.ebk7wzo.mongodb.net/?retryWrites=true&w=majority")
        console.log('Base de datos conectada');
    } catch (error) {
        console.log('Error en la conexion a la base de datos' + error);
    }
}
        
export default conectDB;
