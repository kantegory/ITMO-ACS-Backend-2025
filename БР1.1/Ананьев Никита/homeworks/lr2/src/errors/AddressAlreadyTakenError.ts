export class AddressAlreadyTakenError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "AddressAlreadyTakenError"
        Object.setPrototypeOf(this, AddressAlreadyTakenError.prototype)
    }
}