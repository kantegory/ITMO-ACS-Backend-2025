import axios from "axios";
import { NotFoundError as HttpNotFound, InternalServerError } from 'routing-controllers';
import { UserDto } from "../dtos/UserDtos";

export enum HttpCodes {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    VALIDATION_ERROR = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export const UserServiceUrl = process.env.USER_SERVICE_URL ?? 'http://localhost:8001';

export async function GetCurrentUser(id: number): Promise<UserDto> {
    try {
        const response = await axios.get<UserDto>(`${UserServiceUrl}/users/${id}`);
        return response.data;
    } catch(e: any)  {
        if (e.response && e.response.status == 404)
            throw new HttpNotFound(`No user with id=${id} found`);
        throw new InternalServerError("User search failed")
    }
}
