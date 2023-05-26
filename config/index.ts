// import "https://deno.land/std@0.189.0/dotenv/load.ts";

// console.log(Deno.env.PORT);

// import {load} from "https://deno.land/std@0.189.0/dotenv/mod.ts";

// import dotenv from 'npm:dotenv';
// dotenv.config();
// console.log(await load())
// export const PORT = parseInt(Deno.env.PORT || process.argv[3]);
// export const MONGO_URI = process.env.MONGO_URI || "localhost:8080";
// export const SECRET = process.env.SECRET || 'string';
// export const TWILIO_ACOUNT_SID = process.env.TWILIO_ACOUNT_SID;
// export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
// export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
// export const GMAIL_USER = process.env.GMAIL_USER;
// export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
// export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
// export const SMTP_PORT = process.env.SMTP_PORT;
// export const NODE_ENV = process.env.NODE_ENV || 'development';

import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

 
console.log(config())
// import "https://deno.land/x/dotenv/mod.ts";

// console.log(Deno.env.GREETING);