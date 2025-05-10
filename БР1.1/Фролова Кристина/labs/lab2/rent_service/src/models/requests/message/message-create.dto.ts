export interface CreateMessageRequestDto {

    /**
     * @isInt
     * @minimum 1
     */
    senderId: number;

    /**
     * @isInt
     * @minimum 1
     */
    receiverId: number;

    /**
     * @isInt
     * @minimum 1
     */
    advertisementId: number;

    /**
     * @isString
     * @minLength 1
     * @maxLength 1000
     */
    text: string;
}