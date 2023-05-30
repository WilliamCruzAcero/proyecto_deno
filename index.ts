import "https://deno.land/std@0.177.1/dotenv/load.ts";
import Server from "./main.ts";
import { PORT } from "./config/index.ts";

// const argv = Deno.args;
const main = async () => {
    
    const port = PORT;
    const server = new Server(port);

    await server.start();
};

main();