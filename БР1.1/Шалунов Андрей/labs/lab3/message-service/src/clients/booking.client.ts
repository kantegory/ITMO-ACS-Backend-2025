import axios from 'axios';
import SETTINGS from '../config/settings';

export async function fetchBooking(id: number, authHeader?: string) {
    const url = `${SETTINGS.BOOKING_SERVICE_URL}/api/bookings/${id}`;
    const res = await axios.get(url, {
        headers: authHeader ? { Authorization: authHeader } : {},
    });
    return res.data;
}