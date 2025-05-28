import axios from 'axios'
import SETTINGS from '../config/settings'

export async function fetchProperty(id:number,authHeader?:string){
    const res=await axios.get(
        `${SETTINGS.PROPERTY_SERVICE_URL}/api/properties/${id}`,
        { headers: authHeader?{Authorization:authHeader}:{} }
    )
    return res.data
}