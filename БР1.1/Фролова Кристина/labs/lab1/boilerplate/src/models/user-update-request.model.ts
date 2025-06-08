export interface UpdateUserRequestModel {

    /**
     * @pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
     * @example "user@example.com"
     */
    mail?: string;

    /**
     * @isString
     * @minLength 2
     * @maxLength 50
     */
    firstName?: string;

    /**
     * @isString
     * @minLength 2
     * @maxLength 50
     */
    lastName?: string;
}
