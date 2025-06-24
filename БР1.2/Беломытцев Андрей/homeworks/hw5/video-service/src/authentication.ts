import { Request } from "express";
import jwt from "jsonwebtoken";
import config from './config'

export function expressAuthentication(req: Request, securityName: string, scopes?: string[]): Promise<any> {
  const token = req.headers.authorization?.split(' ')[1]
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject(new Error("No token provided"));
    }
    jwt.verify(token, config.JWT_SECRET_KEY, async function (err: any, decoded: any) {
      if (err) {
        return reject(err);
      } else {
        if (scopes){
          for (let scope of scopes) {
            if (!decoded.role || ![decoded.role].includes(scope)) {
              reject(new Error("You do not have permission"));
            }
          }
        }
        return resolve(decoded);
      }
    })
  })
}