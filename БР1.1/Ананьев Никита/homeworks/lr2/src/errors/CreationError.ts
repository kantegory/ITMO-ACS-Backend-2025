export class CreationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "Creation"
        Object.setPrototypeOf(this, CreationError.prototype)
    }
}