
const argv = Deno.args;

const getRequiredEnvVar = (name: string): string => {
    const value = Deno.env.get(name);

    if (!value) {
        throw new Error(`No se encontro valor para la variable de entorno: ${name}`)
    }

    return value;
}

export const PORT = parseInt(Deno.env.get("PORT") || argv[3]);
export const MONGO_URI = Deno.env.get("MONGO_URI") || "localhost:8080";
export const SECRET = getRequiredEnvVar("SECRET");
export const TWILIO_ACOUNT_SID = getRequiredEnvVar("TWILIO_ACOUNT_SID");
export const TWILIO_AUTH_TOKEN = getRequiredEnvVar("TWILIO_AUTH_TOKEN");
export const TWILIO_PHONE_NUMBER = getRequiredEnvVar("TWILIO_PHONE_NUMBER");
export const GMAIL_USER = getRequiredEnvVar("GMAIL_USER");
export const GMAIL_PASSWORD = getRequiredEnvVar("GMAIL_PASSWORD");
export const ADMIN_EMAIL = getRequiredEnvVar("ADMIN_EMAIL");
export const SMTP_PORT = parseInt(getRequiredEnvVar("SMTP_PORT"));
export const DENO_ENV = Deno.env.get("DENO_ENV" || 'development');

