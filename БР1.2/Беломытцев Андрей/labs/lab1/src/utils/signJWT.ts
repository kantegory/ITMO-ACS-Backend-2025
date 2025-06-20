import config from '../config';
import jwt from 'jsonwebtoken'

type UserType = {
  username: string,
  password: string
}

const signJWT = (user: UserType, callback: any) => {
  try {
    jwt.sign(
      { username: user.username }, 
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