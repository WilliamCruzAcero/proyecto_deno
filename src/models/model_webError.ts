export class WebError extends Error {
    constructor (
        message: string,
        status: number,
    ) {
        super(message)
        status
    }
}