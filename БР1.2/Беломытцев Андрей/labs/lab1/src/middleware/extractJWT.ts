import { Request, Response, NextFunction } from 'express'
import config from '../config';
import jwt from 'jsonwebtoken'

const extractJWT = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1]
  if (token){
    jwt.verify(token, config.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(404).json({ message: err })
        return
      }
      else {
        res.locals.jwt = decoded
        next()
        return
      }
    })
  }
  else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export default extractJWT