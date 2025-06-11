export class WrongPasswordError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "WrongPasswordError"
        Object.setPrototypeOf(this, WrongPasswordError.prototype)
    }
}
