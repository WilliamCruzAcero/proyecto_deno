import winston from 'npm:winston';
import { DENO_ENV } from "../../../config/index.ts";

const loggerDev = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({level: "info"}),
    ],
});

const loggerProd = winston.createLogger({
    level: "warn",
    transports: [
        new winston.transports.File({filename: "warn.log", level: "warn"}),
        new winston.transports.Console({level: "warn"}),
        new winston.transports.File({filename: "error.log", level: "error"}),
        new winston.transports.Console({level: "error"})
    ]
})

const logger = DENO_ENV === 'production'
            ? loggerProd
            : loggerDev;

export default logger 