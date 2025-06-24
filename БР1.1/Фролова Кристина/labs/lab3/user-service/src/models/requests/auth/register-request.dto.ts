export interface RegisterRequestDto {

    /**
     * @pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
     * @example "user@example.com"
     */
    mail: string;

    /**
     * @minLength 6
     */
    password: string;

    /**
     * @isString
     * @minLength 2
     * @maxLength 50
     */
    firstName: string;

    /**
     * @isString
     * @minLength 2
     * @maxLength 50
     */
    lastName: string;
}