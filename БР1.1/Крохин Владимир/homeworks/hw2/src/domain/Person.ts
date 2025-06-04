export abstract class Person {
    // Полное имя
    abstract get fullName(): string 

    abstract get firstName(): string 

    abstract set firstName(firstName: string)

    abstract get lastName(): string 

    abstract set lastName(lastName: string)

}