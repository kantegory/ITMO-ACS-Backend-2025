import { Person } from "./Person";

export class User implements Person{

    
    constructor(
        public id: number,
        protected _email: string,
        protected _firstName: string,
        protected _lastName: string
    ) {
        this.validateEmail(_email);
    }

    // Валидация email
    private validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Неверный формат адреса электронной почты");
        }
    }

    // Изменение email
    changeEmail(newEmail: string): void {
        this.validateEmail(newEmail);
        this._email = newEmail;
    }


    // Получение email
    get email(): string {
        return this._email;
    }

        // Полное имя
    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }


    get firstName(): string {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName
    }

}