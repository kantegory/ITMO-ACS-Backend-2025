import axios from 'axios';
import SETTINGS from '../config/settings';

export async function fetchUser(id: number, authHeader?: string) {
    const url = `${SETTINGS.USER_SERVICE_URL}/api/users/${id}`;
    const res = await axios.get(url, {
        headers: authHeader ? { Authorization: authHeader } : {},
    });
    return res.data;
}