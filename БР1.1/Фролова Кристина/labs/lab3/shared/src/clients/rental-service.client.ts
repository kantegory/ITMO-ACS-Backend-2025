import axios from "axios";
import {RentalResponseDto} from "../models";

const BASE_URL = 'http://rental-service:3000'

export const rentalServiceClient = {
    async getRentalById(id: number, token?: string): Promise<RentalResponseDto> {
        const res = await axios.get<RentalResponseDto>(`${BASE_URL}/rentals/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        return res.data
    },
}