import dotenv from 'npm:dotenv';
dotenv.config({ path:'./.env'});
import Server from "./main.ts";

// const argv = Deno.args;
const main = async () => {
    
    const PORT =  8080;
    const server = new Server(PORT);

    await server.start();
};

main();