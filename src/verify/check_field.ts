import { StatusCodes } from "https://deno.land/x/https_status_codes@v1.2.0/mod.ts"
import { WebError } from "../models/model_webError.ts"


export function verificarCampoRequerido(value: string, message: string) {
    if (!value) {
        throw new WebError(message, StatusCodes.BAD_REQUEST)
    }
}
