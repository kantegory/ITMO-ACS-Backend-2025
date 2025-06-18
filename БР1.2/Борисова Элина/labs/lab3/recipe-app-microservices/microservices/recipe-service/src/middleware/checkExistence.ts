import axios from 'axios';

export async function userExists(userId: number): Promise<boolean> {
    try {
        const res = await axios.get(`http://auth-service:3000/user/${userId}`);
        return res.status === 200;
    } catch {
        return false;
    }
}

export async function recipeExists(recipeId: number): Promise<boolean> {
    try {
        const res = await axios.get(`http://recipe-service:3001/recipe/${recipeId}`);
        return res.status === 200;
    } catch {
        return false;
    }
}