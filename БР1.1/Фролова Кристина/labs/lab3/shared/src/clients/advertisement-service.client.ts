import axios from "axios";
import {AdvertisementResponseDto} from "../models";

const BASE_URL = 'http://advertisement-service:3000'

export const advertisementServiceClient = {
    async getAdById(id: number, token?: string): Promise<AdvertisementResponseDto> {
        const res = await axios.get<AdvertisementResponseDto>(
            `${BASE_URL}/advertisements/${id}`,
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        );
        return res.data;
    }

}