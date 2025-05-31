import config from '../config';
import jwt from 'jsonwebtoken'
import { User } from '../models/User';

const signJWT = (user: User, callback: any) => {
  try {
    jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        ...(user.role && { role: user.role.name }) 
      },
      config.JWT_SECRET_KEY, 
      { algorithm: 'HS256', expiresIn: config.JWT_ACCESS_TOKEN_LIFETIME },
      (err, token) => {
        if (err) {
          callback(err, null)
        }
        else if (token) {
          callback(null, token)
        }
      }
    )
  } catch (err: any) {
    callback(err, null)
  }
}

export default signJWT