import axios from 'axios'
import SETTINGS from '../config/settings'

export async function fetchUser(id: number, authHeader?: string) {
    const res = await axios.get(
        `${SETTINGS.USER_SERVICE_URL}/api/users/${id}`,
        { headers: authHeader ? { Authorization: authHeader } : {} }
    )
    return res.data
}