import axios from 'axios'
import {UserResponseDto} from "../models";

const USER_SERVICE_BASE_URL = 'http://user-service:3000'

export const userServiceClient = {
    async getUserById(id: number, token?: String): Promise<UserResponseDto> {
        const res = await axios.get<UserResponseDto>(
            `${USER_SERVICE_BASE_URL}/users/${id}`,
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        )
        return res.data
    },
}