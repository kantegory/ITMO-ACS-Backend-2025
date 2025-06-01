import axios from 'axios'
import {MessageResponseDto} from "../models";

const BASE_URL = 'http://chat-service:3000'

export const messageServiceClient = {
    async getThreadById(id: number, token?: string): Promise<MessageResponseDto> {
        const res = await axios.get<MessageResponseDto>(`${BASE_URL}/threads/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        return res.data
    },
}
