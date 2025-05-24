export interface CreateCategoryRequestDto {

    /**
     * @isString
     * @minLength 2
     * @maxLength 50
     */
    name: string;
}
